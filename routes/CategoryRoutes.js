// routes/CategoryRoutes.js
const express = require('express');
const CategoryController = require('../controllers/CategoryController');
const upload = require('../middlewares/FileHandlingMiddleware')
const router = express.Router();


router.post('/create',upload, CategoryController.createCategory);
router.get('/:id', CategoryController.getCategory);
router.put('/:id', CategoryController.updateCategory);
router.delete('/:id', CategoryController.deleteCategory);

module.exports = router;