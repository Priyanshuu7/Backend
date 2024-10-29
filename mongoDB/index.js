const express = require("express");
const { connectMongoDb } = require("./connection");
const { logReqRes } = require("./middlewares");
const userRouter = require("./routes/user");

const app = express();
const PORT = 5000;

//connection//
connectMongoDb("mongodb://localhost:27017/backend").then(() => {
  console.log("MongoDb connected !!!");
});

// Middleware //
app.use(express.urlencoded({ extended: false }));
app.use(logReqRes("log.txt"));

// Routes//
app.use("/api/users", userRouter);

// Server //
app.listen(PORT, () => {
  console.log("server is running on port 5000");
});
