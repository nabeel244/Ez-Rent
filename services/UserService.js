// services/UserService.js
const User = require('../models/User');

const getAllUsers = async() => {
    return await User.findAll();
};

const createUser = async(userData) => {
    return await User.create(userData);
};

const updateUser = async(id, userData) => {
    return await User.update(userData, {
        where: { id: id }
    });
};

const deleteUser = async(id) => {
    return await User.destroy({
        where: { id: id }
    });
};

const getUserById = async(id) => {
    return await User.findByPk(id);
};
module.exports = {
    getAllUsers,
    createUser,
    updateUser,
    deleteUser,
    getUserById
};