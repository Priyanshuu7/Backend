const express = require("express");
const users = require("./MOCK_DATA.json");

const app = express();
const PORT = 5000;

// Route all see all the users //
app.get("/api/users", (req, res) => {
  return res.json(users);
});

// Route to get the user with id 1 //
app.get("/api/users/:id", (req, res) => {
  const id = Number(req.params.id);
  const user = users.find((user) => user.id === id);
  return res.json(user);
});

app.listen(PORT, () => {
  console.log("server is running on port 5000");
});
