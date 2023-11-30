// routes/CategoryRoutes.js
const express = require('express');
const CategoryController = require('../controllers/CategoryController');
const router = express.Router();

router.post('/create', CategoryController.createCategory);
router.get('/:id', CategoryController.getCategory);
router.put('/:id', CategoryController.updateCategory);
router.delete('/:id', CategoryController.deleteCategory);

module.exports = router;