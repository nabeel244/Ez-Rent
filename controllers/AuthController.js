// controllers/AuthController.js
const authService = require('../services/AuthService');
const HttpStatus = require('../utils/ResponseStatus')



const register = async(req, res, next) => {
    try {
        const user = await authService.register(req.body)
        res.status(HttpStatus.CREATED).json({ message: "Register successfully", user });
    } catch (error) {
        next(error)
    }
};
const sendVerificationCode = async(req, res, next) => {
    try {
        await authService.sendVerificationCode(req.body)
        res.status(HttpStatus.CREATED).json({ message: "Verification code have sent to your number" });
    } catch (error) {
        next(error)
    }
};
const verifyCode = async(req, res, next) => {
    try {
        await authService.verifyCode(req.body)
        res.status(HttpStatus.OK).json({ message: "Verfication successfully" });
    } catch (error) {
        next(error)
    }
};

const login = async(req, res, next) => {
    try {
        const user = await authService.login(req.body)
        res.status(HttpStatus.OK).json({ message: "Login successfully", user });

    } catch (error) {
        next(error)
    }
}

const forgotPassword = async(req, res, next) => {
    try {
        await authService.forgotPassword(req.body)
        res.status(HttpStatus.OK).json({ message: "Reset link send to your email" });

    } catch (error) {
        next(error)
    }
}

const resetPassword = async(req, res, next) => {
        try {
            await authService.resetPassword(req.body)
            res.status(HttpStatus.OK).json({ message: "Password updated" });
        } catch (error) {
            next(error)

        }
    }
    //User Search Controller
const searchUsers = async(req, res, next) => {
    try {
        const searchTerm = req.query.search;
        if (!searchTerm) {
            return res.status(400).json({ message: "Search term is required" });
        }

        const users = await authService.searchUsers(searchTerm);
        res.status(200).json(users);
    } catch (error) {
        next(error);
    }
};

module.exports = {
    register,
    login,
    forgotPassword,
    resetPassword,
    sendVerificationCode,
    verifyCode,
    searchUsers

};