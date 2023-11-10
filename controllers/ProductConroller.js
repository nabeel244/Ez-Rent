// controllers/productController.js

const productService = require('../services/ProductService');

const productController = {
    async createProduct(req, res) {
        try {
            const product = await productService.createProduct(req.body);
            res.status(201).json(product);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

    async getProduct(req, res) {
        try {
            const productId = req.params.id;
            const product = await productService.getProductById(productId);
            res.json(product);
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    },

    async updateProduct(req, res) {
        try {
            const productId = req.params.id;
            const updatedProduct = await productService.updateProduct(productId, req.body);
            res.json(updatedProduct);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

    async deleteProduct(req, res) {
        try {
            const productId = req.params.id;
            const response = await productService.deleteProduct(productId);
            res.json(response);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

    async getAllProducts(req, res) {
        try {
            const products = await productService.getAllProducts();
            res.json(products);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
};

module.exports = productController;