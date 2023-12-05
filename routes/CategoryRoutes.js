// routes/CategoryRoutes.js
const express = require('express');
const CategoryController = require('../controllers/CategoryController');

const fileHandlingMiddleware = require('../middlewares/FileHandlingMiddleware'); // Adjust the path as necessary
const router = express.Router();

router.post('/create', fileHandlingMiddleware, CategoryController.createCategory);

router.get('/:id', CategoryController.getCategory);
router.put('/:id', fileHandlingMiddleware, CategoryController.updateCategory);
router.delete('/:id', CategoryController.deleteCategory);

module.exports = router;