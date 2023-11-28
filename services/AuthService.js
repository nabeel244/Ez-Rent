// services/UserService.js
const User = require('../models/User');
const PasswordResetToken = require('../models/ResetPassword')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');
const { Error, Op } = require('sequelize');
const crypto = require('crypto');
const { forgotPasswordMail } = require('../utils/EmailService')


const register = async (userData) => {

  // Encrypt user password
  if (!userData.password) {
    throw new Error('password is required');

  }
  if (userData.password != userData.confirm_password) {
    throw new Error('Confirm Password not match')
  }
  const hashedPassword = await bcrypt.hash(userData.password, 10); // the number 10 is the salt rounds

  // Create user record in database
  const newUser = await User.create({
    ...userData,
    password: hashedPassword
  });
  return newUser

};

const login = async (body) => {
  const { email, password } = body
  const user = await User.findOne({ where: { email: email } });
  if (!user) {
    throw new Error('User not found');
  }
 

  const passwordIsValid = await bcrypt.compare(password, user.password);
  if (!passwordIsValid) {
    throw new Error('Invalid password');
  }

  let userForToken = {
    id: user.id,
    email: user.email,
    role: user.role,
    phone: user.phone
  };

  const token = jwt.sign(userForToken, process.env.SECRETKEY, { expiresIn: process.env.EXPIRETIME });
  userForToken.token = token;

  // Return the updated userForToken object
  return userForToken;

}

const forgotPassword = async (body) => {
  const { email } = body
  const user = await User.findOne({ where: { email: email } });
  if (!user) {
    throw new Error('User not found');
  }

  const resetToken = crypto.randomBytes(20).toString('hex');
  const tokenExpiry = Date.now() + 3600000; // 1 hour

  // Find or create a reset token
  const [resetTokenRecord, created] = await PasswordResetToken.findOrCreate({
    where: { userId: user.id },
    defaults: {
      token: resetToken,
      expiresAt: tokenExpiry
    }
  });

  if (!created) {
    // If the record already exists, update it
    resetTokenRecord.token = resetToken;
    resetTokenRecord.expiresAt = tokenExpiry;
    await resetTokenRecord.save();
  }

  const resetUrl = `${process.env.APP_URL}&user_id=${user.id}&token=${resetToken}`;

  const mailOptions = {
    from: process.env.TRANSPORTER_USER,
    to: user.email,
    subject: 'Password Reset',
    text: `Please click on the following link, or paste this into your browser to complete the process: ${resetUrl}`
  };

  await forgotPasswordMail(mailOptions);
};
const resetPassword = async (body) => {
  // Find the password reset token record
  const { token, password,user_id } = body
  const resetTokenRecord = await PasswordResetToken.findOne({
    where: {
      token: token,
      userId : user_id,
      expiresAt: {
        [Op.gt]: new Date() // Checks if the token has not expired
      }
    }
  });

  if (!resetTokenRecord) {
    throw new Error('Invalid or expired password reset token');
  }

  // Hash the new password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Update the user's password
  const user = await User.findOne({ where: { id: resetTokenRecord.userId } });
  if (!user) {
    throw new Error('User not found');
  }

  user.password = hashedPassword;
  await user.save();

  await resetTokenRecord.destroy();
};

module.exports = {
  register,
  login,
  forgotPassword,
  resetPassword
};
