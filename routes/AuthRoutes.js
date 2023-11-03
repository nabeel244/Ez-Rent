// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/AuthController');

// router.get('/', authController.getUsers);
router.post('/register', authController.register);

module.exports = router;
