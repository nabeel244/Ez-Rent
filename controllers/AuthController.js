// controllers/AuthController.js
const authService = require('../services/AuthService');
const HttpStatus = require('../utils/ResponseStatus')



const register = async (req, res) => {
  try {
    const user = await authService.register(req.body)
    res.status(HttpStatus.CREATED).json({ message: "Register successfully",  user });
  } catch (err) {
   res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(err.message);
  }

};

module.exports = {
 register
};
