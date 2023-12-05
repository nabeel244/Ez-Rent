// controllers/AuthController.js
const authService = require('../services/AuthService');
const HttpStatus = require('../utils/ResponseStatus')



const register = async (req, res, next) => {
  try {
    const user = await authService.register(req.body)
    res.status(HttpStatus.CREATED).json({ message: "Register successfully", user });
  } catch (error) {
    next(error)
  }
};
// const verfiyPhone = async (req, res, next) => {
//   try {
//     await authService.verfiyPhone(req.body)
//     res.status(HttpStatus.CREATED).json({ message: "Verification code have sent to your number" });
//   } catch (error) {
//     next(error)
//   }
// };

const login = async (req, res, next) => {
  try {
    const user = await authService.login(req.body)
    res.status(HttpStatus.OK).json({ message: "Login successfully", user });

  } catch (error) {
    next(error)
  }
}

const forgotPassword = async (req, res, next) => {
  try {
     await authService.forgotPassword(req.body)
    res.status(HttpStatus.OK).json({ message: "Reset link send to your email" });

  } catch (error) {
    next(error)
  }
}

const resetPassword = async (req, res, next) => {
  try {
    await authService.resetPassword(req.body)
    res.status(HttpStatus.OK).json({ message: "Password changed successfully" });
  } catch (error) {
    next(error)
    
  }
}

module.exports = {
  register,
  login,
  forgotPassword,
  resetPassword,
  // verfiyPhone
  
};
