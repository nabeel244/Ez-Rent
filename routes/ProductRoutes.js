// routes/productRoutes.js

const express = require('express');
const productController = require('../controllers/ProductConroller');

const router = express.Router();

// POST request to create a new product
router.post('/products', authenticateToken, checkRole(['lessor']), productController.createProduct);

router.get('/products/:id', authenticateToken, checkRole(['lessor', 'lessee']), productController.getProduct);

router.put('/products/:id', authenticateToken, checkRole(['lessor']), productController.updateProduct);

router.delete('/products/:id', authenticateToken, checkRole(['lessor']), productController.deleteProduct);

router.get('/products', authenticateToken, checkRole(['lessor', 'admin']), productController.getAllProducts);

router.get('/products/search', authenticateToken, checkRole(['lessor', 'lessee', 'admin']), productController.searchProducts);


module.exports = router;