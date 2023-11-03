// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/UserController');

router.get('/', userController.getUsers);
router.post('/create', userController.createUser);

module.exports = router;
