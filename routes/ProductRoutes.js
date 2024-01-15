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

router.put('/update', authenticateToken,fileHandlingMiddleware, checkRole(['admin']), productController.updateProduct);

router.post('/delete', authenticateToken, checkRole(['lessor', 'admin']), productController.deleteProduct);

router.get('/all', productController.getAllProducts);

router.post('/search', authenticateToken, productController.searchProducts);

router.post('/user/products', productController.getProductsForUser);

module.exports = router;