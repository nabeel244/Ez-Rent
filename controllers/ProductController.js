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
            const productId = req.body.id;
            const imageFiles = {
                featuredImage: req.file,
                images: req.files.images
            };

            const updatedProduct = await productService.updateProduct(productId, req.body, imageFiles);
            res.json(updatedProduct);
        } catch (error) {
            next(error)
        }
    },

    async deleteProduct(req, res, next) {
        try {
            const productId = req.body.id;
            const response = await productService.deleteProduct(productId);
            res.json(response);
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
    async searchProducts(req, res) {
        try {
            const { categoryId, userId } = req.query;
            const products = await productService.searchProducts({ categoryId, userId });
            res.json(products);
        } catch (error) {
            next(error);
        }
    },
};

module.exports = productController;