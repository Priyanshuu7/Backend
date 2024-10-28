const express = require("express");
const users = require("./MOCK_DATA.json");
const app = express();
const PORT = 5000;
const fs = require("fs");

// Middleware //
app.use(express.urlencoded({ extended: false }));

// Route all see all the users //
app.get("/api/users", (req, res) => {
  return res.json(users);
});

// Route to get the user with id 1 //
// app.get("/api/users/:id", (req, res) => {
//   const id = Number(req.params.id);
//   const user = users.find((user) => user.id === id);
//   return res.json(user);
// });

// Route to create a new user //
// app.post("/api/users", (req, res) => {
//   // todo //
//   return res.json({ Status: "pending" });
// });

// Route to edit the user with id  //
// app.patch("/api/users/:id", (req, res) => {
//   // todo //
//   return res.json({ Status: "pending" });
// });

// Route to delete the user with id  //
// app.delete("/api/users/:id", (req, res) => {
//   // todo //
//   return res.json({ Status: "pending" });
// });

//Grouping the routes //
app.route("/api/users/:id").get((req, res) => {
  const id = Number(req.params.id);
  const user = users.find((user) => user.id === id);
  return res.json(user);
});

app.patch("/api/users/:id", (req, res) => {
  const id = Number(req.params.id);
  const body = req.body;
  const user = users.find((user) => user.id === id);
  const index = users.indexOf(user);
  users[index] = { ...user, ...body };

  fs.writeFile("MOCK_DATA.json", JSON.stringify(users), (err, data) => {
    return res.json({ Status: "Success", id: id });
  });
});

app.delete("/api/users/:id", (req, res) => {
  const id = Number(req.params.id);
  const user = users.find((user) => user.id === id);
  const index = users.indexOf(user);
  users.splice(index, 1);
  fs.writeFile("MOCK_DATA.json", JSON.stringify(users), (err, data) => {
    return res.json({
      Status: "Successss",
      message: `User with ID ${id} deleted`,
      id: id,
    });
  });
});

app.post("/api/users", (req, res) => {
  const body = req.body;
  users.push({ ...body, id: users.length + 1 });

  fs.writeFile("MOCK_DATA.json", JSON.stringify(users), (err, data) => {
    return res.json({ Status: "Success", id: users.length });
  });
});

app.listen(PORT, () => {
  console.log("server is running on port 5000");
});
