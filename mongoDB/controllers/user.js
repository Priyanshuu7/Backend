const User = require("../models/user");

async function handleGetAllUsers(req, res) {
  const allDbUsers = await User.find();
  return res.json(allDbUsers);
}

async function handleGetUserById(req, res) {
  const user = await User.findById(req.params.id);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  return res.json(user);
}

async function handleUpdateUserById(req, res) {
  await User.findByIdAndUpdate(req.params.id, {
    lastname: "changed",
  });
  return res.json({ msg: "successs" });
}

async function handleDeleteUserById(req, res) {
  await User.findByIdAndDelete(req.params.id);
  return res.json({
    Status: "Successss",
  });
}
async function handleCreateNewUser(req, res) {
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
  return res.status(201).json({ msg: "Success", id: result._id });
}

module.exports = {
  handleGetAllUsers,
  handleGetUserById,
  handleUpdateUserById,
  handleDeleteUserById,
  handleCreateNewUser,
};
