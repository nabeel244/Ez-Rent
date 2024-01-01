// controllers/UserController.js
const userService = require('../services/UserService');
const HttpStatus = require('../utils/ResponseStatus')


const getUsers = async(req, res,next) => {
    try {
        const users = await userService.getAllUsers();
        res.status(HttpStatus.OK).json({ message: "Users fetch successfully", users });
    } catch (err) {
        next(err)
    }
};

const createUser = async(req, res,next) => {
    try {
        const newUser = await userService.createUser(req.body)
        res.status(HttpStatus.CREATED).json({ message: "User created successfully", user: newUser });
    } catch (err) {
       next(err)
    }
};

const updateUser = async(req, res,next) => {
    try {
        const updatedUser = await userService.updateUser(req.params.id, req.body);
        res.json({ message: "User updated successfully", user: updatedUser });
    } catch (err) {
        next(err)
    }
};

const deleteUser = async(req, res,next) => {
    try {
        await userService.deleteUser(req.params.id);
        res.json({ message: "User deleted successfully" });
    } catch (err) {
       next(err)
    }
};

const getUser = async(req, res,next) => {
    try {
        const user = await userService.getUserById(req.params.id);
        if (user) {
            res.json(user);
        } else {
            res.status(HttpStatus.NOT_FOUND).send("User not found");
        }
    } catch (err) {
       next(err)
    }
};
module.exports = {
    getUsers,
    createUser,
    updateUser,
    deleteUser,
    getUser
};