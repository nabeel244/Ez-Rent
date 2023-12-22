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
        // const newUser = await userService.createUser(req.body)
        // res.status(HttpStatus.CREATED).json({ message: "User created successfully", user: newUser });
    } catch (err) {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(err);
    }
};

module.exports = {
    getUsers,
    createUser
};