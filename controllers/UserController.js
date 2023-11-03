// controllers/UserController.js
const userService = require('../services/UserService');

const getUsers = async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    res.json(users);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const createUser = async (req, res) => {
  try {
    const newUser = await userService.createUser(req.body)
    res.status(201).json({ message: "User created successfully", user: newUser });
  } catch (error) {
    res.status(500).send(err.message);
  }

};

module.exports = {
  getUsers,
  createUser
};
