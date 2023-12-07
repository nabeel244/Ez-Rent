// routes/CategoryRoutes.js
const express = require('express');
const CategoryController = require('../controllers/CategoryController');
const authenticateToken = require('../middlewares/AuthMiddleware');
const checkRole = require('../middlewares/RoleMiddleware');


const fileHandlingMiddleware = require('../middlewares/FileHandlingMiddleware'); // Adjust the path as necessary
const router = express.Router();

router.post('/create', fileHandlingMiddleware, CategoryController.createCategory);

router.get('/:id', authenticateToken, checkRole(['lessor']), CategoryController.getCategory);
router.put('/:id', fileHandlingMiddleware, CategoryController.updateCategory);
router.delete('/:id', CategoryController.deleteCategory);

module.exports = router;