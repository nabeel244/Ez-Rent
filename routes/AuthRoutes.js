// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/AuthController');
const passport = require('../utils/PassportStrategy')

router.post('/register', authController.register)
router.post('/login', authController.login)
router.post('/forgot-password', authController.forgotPassword)
router.post('/reset-password', authController.resetPassword)
router.post('/send-verification-code', authController.sendVerificationCode)
router.post('/verify-code', authController.verifyCode)
router.get('/search-users', authController.searchUsers);


router.get('/google', passport.authenticate('google', {
    scope: ['profile', 'email']
}));

router.get('/google/callback', passport.authenticate('google'), (req, res) => {
    res.redirect('/profile');
});

module.exports = router;