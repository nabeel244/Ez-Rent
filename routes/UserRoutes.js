// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/UserController');
const checkRole = require('../middlewares/RoleMiddleware');
const authenticateToken = require('../middlewares/AuthMiddleware');

router.get('/all',authenticateToken, checkRole(['admin']),  userController.getUsers);
router.get('/:id',authenticateToken, userController.getUser);
router.post('/create',authenticateToken, userController.createUser);
router.put('/:id',authenticateToken, userController.updateUser);
router.delete('/:id',authenticateToken, userController.deleteUser);


module.exports = router;