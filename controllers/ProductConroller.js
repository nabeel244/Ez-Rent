// controllers/productController.js

const productService = require('../services/ProductService');
const HttpStatus = require('../utils/ResponseStatus')

const productController = {
    async createProduct(req, res, next) {

        try {
            console.log(req.body, req.file, req.files);
            // Assuming 'featuredImage' and 'images' are the field names for the uploaded files
            const imageFiles = {
                featuredImage: req.file, // if there's a single featured image
                images: req.files.images // if there are multiple images
            };

            const product = await productService.createProduct(req.body, imageFiles);

            res.status(HttpStatus.CREATED).json({ message: "Product created successfully", product });

        } catch (error) {
            next(error)
        }
    },

    async getProduct(req, res) {
        try {
            const productId = req.params.id;
            const product = await productService.getProductById(productId);
            res.json(product);
        } catch (error) {
            next(error)
        }
    },

    async updateProduct(req, res) {
        try {
            const productId = req.params.id;
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

    async deleteProduct(req, res) {
        try {
            const productId = req.params.id;
            const response = await productService.deleteProduct(productId);
            res.json(response);
        } catch (error) {
            next(error)
        }
    },

    async getAllProducts(req, res) {
        try {
            const products = await productService.getAllProducts();
            res.json(products);
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