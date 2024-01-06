// routes/productRoutes.js

const express = require('express');
const productController = require('../controllers/ProductController');
const authenticateToken = require('../middlewares/AuthMiddleware')
const checkRole = require('../middlewares/RoleMiddleware')
const router = express.Router();
const fileHandlingMiddleware = require('../middlewares/FileHandlingMiddleware');


// POST request to create a new product
router.post('/create', fileHandlingMiddleware, productController.createProduct);
// router.post('/', authenticateToken, checkRole(['lessor']), productController.createProduct);

router.get('/products/get', authenticateToken, checkRole(['lessor', 'lessee']), productController.getProduct);

router.put('/products/update', authenticateToken, checkRole(['lessor']), productController.updateProduct);

router.delete('/products/delete', authenticateToken, checkRole(['lessor']), productController.deleteProduct);

router.get('/all', productController.getAllProducts);

router.get('/products/search', authenticateToken, checkRole(['lessor', 'lessee', 'admin']), productController.searchProducts);

module.exports = router;