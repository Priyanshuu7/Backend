const express = require("express");
const app = express();
const PORT = 5000;
const fs = require("fs");
const mongoose = require("mongoose");

//connection//
mongoose
  .connect("mongodb://localhost:27017/backend", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

//schema//
const userSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: false,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    gender: {
      type: String,
      required: true,
    },
    jobTitle: {
      type: String,
    },
    gender: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

// Middleware //
app.use(express.urlencoded({ extended: false }));
// Routes
app.get("/users", async (req, res) => {
  const allDbUsers = await User.find();

  const html = `
    <ul>
      ${allDbUsers
        .map((user) => `<li>${user.firstname} - ${user.email}</li>`)
        .join("")}
    </ul>
  `;
  res.send(html);
});

// Route all see all the users //
app.get("/api/users", async (req, res) => {
  const allDbUsers = await User.find();
  return res.json(allDbUsers);
});

//Grouping the routes //
app.route("/api/users/:id").get(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  return res.json(user);
});

app.patch("/api/users/:id", async (req, res) => {
  const user = await User.findByIdAndUpdate(req.params.id, {
    lastname: "changed",
  });
  return res.json({ msg: "update user with id", id: req.params.id });
});

app.delete("/api/users/:id", async (req, res) => {
  const user = await User.findByIdAndDelete(req.params.id);
  return res.json({
    Status: "Successss",
  });
});

app.post("/api/users", async (req, res) => {
  const body = req.body;
  if (
    !body ||
    !body.first_name ||
    !body.last_name ||
    !body.email ||
    !body.gender ||
    !body.job_Title
  ) {
    return res.status(400).json({ Status: "All fields are required" });
  }
  const result = await User.create({
    firstname: body.first_name,
    lastname: body.last_name,
    email: body.email,
    gender: body.gender,
    jobTitle: body.job_Title,
  });

  return res.status(201).json({ msg: "Success" });
});

app.listen(PORT, () => {
  console.log("server is running on port 5000");
});
