// controllers/UserController.js
const userService = require('../services/UserService');
const HttpStatus = require('../utils/ResponseStatus')


const getUsers = async(req, res) => {
    try {
        const users = await userService.getAllUsers();
        res.json(users);
    } catch (err) {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(err.message);
    }
};

const createUser = async(req, res) => {
    try {
        const newUser = await userService.createUser(req.body)
        res.status(HttpStatus.CREATED).json({ message: "User created successfully", user: newUser });
    } catch (err) {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(err);
    }
};

const updateUser = async(req, res) => {
    try {
        const updatedUser = await userService.updateUser(req.params.id, req.body);
        res.json({ message: "User updated successfully", user: updatedUser });
    } catch (err) {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(err.message);
    }
};

const deleteUser = async(req, res) => {
    try {
        await userService.deleteUser(req.params.id);
        res.json({ message: "User deleted successfully" });
    } catch (err) {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(err.message);
    }
};

const getUser = async(req, res) => {
    try {
        const user = await userService.getUserById(req.params.id);
        if (user) {
            res.json(user);
        } else {
            res.status(HttpStatus.NOT_FOUND).send("User not found");
        }
    } catch (err) {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(err.message);
    }
};
module.exports = {
    getUsers,
    createUser,
    updateUser,
    deleteUser,
    getUser
};