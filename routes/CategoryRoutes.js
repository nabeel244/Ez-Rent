// routes/CategoryRoutes.js
const express = require('express');
const CategoryController = require('../controllers/CategoryController');
const authenticateToken = require('../middlewares/AuthMiddleware');
const checkRole = require('../middlewares/RoleMiddleware');


const fileHandlingMiddleware = require('../middlewares/FileHandlingMiddleware'); // Adjust the path as necessary
const router = express.Router();

router.post('/create', authenticateToken, checkRole(['admin']), fileHandlingMiddleware, CategoryController.createCategory);
router.get('/:id', authenticateToken, checkRole(['admin']), CategoryController.getCategory);
router.put('/:id', authenticateToken, checkRole(['admin']), fileHandlingMiddleware, CategoryController.updateCategory);
router.delete('/:id', authenticateToken, checkRole(['admin']), CategoryController.deleteCategory);
router.get('/search', authenticateToken, checkRole(['admin', 'lessor']), CategoryController.searchCategory); // Adjust roles as necessary


module.exports = router;