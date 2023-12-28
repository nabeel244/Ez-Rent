// routes/CategoryRoutes.js
const express = require('express');
const CategoryController = require('../controllers/CategoryController');
const authenticateToken = require('../middlewares/AuthMiddleware');
const checkRole = require('../middlewares/RoleMiddleware');


const fileHandlingMiddleware = require('../middlewares/FileHandlingMiddleware'); // Adjust the path as necessary
const router = express.Router();

router.get('/search', authenticateToken, checkRole(['lessor', 'admin']), CategoryController.searchCategory); // Adjust roles as necessary
router.post('/create', authenticateToken, checkRole(['admin']), fileHandlingMiddleware, CategoryController.createCategory);
router.get('/:id', authenticateToken, checkRole(['lessor']), CategoryController.getCategory);
router.put('/:id', authenticateToken, checkRole(['admin']), fileHandlingMiddleware, CategoryController.updateCategory);
router.delete('/:id', authenticateToken, checkRole(['admin']), CategoryController.deleteCategory);


module.exports = router;