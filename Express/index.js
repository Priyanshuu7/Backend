const express = require("express");
const app = express();
const port = 5000;

app.get("/", (req, res) => {
  res.send("Hello World from home page!");
});
app.get("/about", (req, res) => {
  res.send("Here is our short history");
});
app.get("/contact", (req, res) => {
  res.send("Here is our contact details");
});
app.get("/help", (req, res) => {
  res.send("Here is our help details");
});
app.listen(port, () => {
  console.log("server is running on port 5000");
});
