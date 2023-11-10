// services/UserService.js
const User = require('../models/User');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');


  const register = async (userData) => {

    const existingUser = await User.findOne({ where: { email: userData.email } });
    if (existingUser) {
      throw new Error('User already exists');
    }

    // Encrypt user password
    const hashedPassword = await bcrypt.hash(userData.password, 10); // the number 10 is the salt rounds

    // Create user record in database
    const newUser = await User.create({
      ...userData,
      password: hashedPassword
    });

    // Omit the password when returning the user object
    const userForToken = {
      id: newUser.id,
      email: newUser.email,
      role : newUser.role,
      status : newUser.status
    };

    // Generate JWT
    const token = jwt.sign(userForToken, process.env.SECRETKEY, { expiresIn: process.env.EXPIRETIME }); // Token expires in 1 hour

    return { newUser, token };
  };

module.exports = {
    register
};
