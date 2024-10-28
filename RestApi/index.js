const express = require("express");
const users = require("./MOCK_DATA.json");

const app = express();
const PORT = 5000;

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
app
  .route("api/users/:id")
  .get((req, res) => {
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id);
    return res.json(user);
  })
  .patch((req, res) => {
    //todo//
    return res.json({ Status: "pending" });
  })
  .delete((req, res) => {
    //todo//
    return res.json({ Status: "pending" });
  });

app.listen(PORT, () => {
  console.log("server is running on port 5000");
});
