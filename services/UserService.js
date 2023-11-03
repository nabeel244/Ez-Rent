// services/UserService.js
const User = require('../models/User');

const getAllUsers = async () => {
    return await User.findAll();
  };
  
  const createUser = async (userData) => {
    return await User.create(userData);
  };

module.exports = {
  getAllUsers,
  createUser
};
