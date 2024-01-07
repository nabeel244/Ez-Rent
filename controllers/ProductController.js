// controllers/productController.js

const productService = require('../services/ProductService');
const HttpStatus = require('../utils/ResponseStatus')

const productController = {
    async createProduct(req, res, next) {
        try {
            const product = await productService.createProduct(req.body, req.files);
            res.status(HttpStatus.CREATED).json({ message: "Product created successfully", product });

        } catch (error) {
            next(error)
        }
    },

    async getProduct(req, res, next) {
        try {
            const productId = req.body.id;
            const product = await productService.getProductById(productId);
            res.json(product);
        } catch (error) {
            next(error)
        }
    },

    async updateProduct(req, res, next) {
        try {
            console.log(req.body)
            const updatedProduct = await productService.updateProduct(req.body, req.files);
            res.status(HttpStatus.OK).json({ message: "Product updated successfully", updatedProduct });

        } catch (error) {
            console.log(error.message, 'new message')
            next(error)
        }
    },

    async deleteProduct(req, res, next) {
        try {
            console.log(req.body,'body')
            const productId = req.body.id;
            const product = await productService.deleteProduct(productId);
            res.status(HttpStatus.OK).json({message: 'Product deleted successfylly', product})
        } catch (error) {
            next(error)
        }
    },

    async getAllProducts(req, res) {
        try {
            const products = await productService.getAllProducts();
            res.status(HttpStatus.OK).json({ message: "Products fetch successfully", products });

        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    async searchProducts(req, res, next) {
        try {
            const products = await productService.searchProducts(req);
            res.status(HttpStatus.OK).json({products})
        } catch (error) {
            next(error);
        }
    },
};

module.exports = productController;