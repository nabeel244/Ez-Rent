// services/productService.js

const Product = require('../models/Product');
// Add other models if necessary

const productService = {
    async createProduct(data) {
        const product = await Product.create(data);
        return product;
    },

    async getProductById(productId) {
        const product = await Product.findByPk(productId);
        if (!product) {
            throw new Error('Product not found');
        }
        return product;
    },

    async updateProduct(productId, updateData) {
        const product = await Product.findByPk(productId);
        if (!product) {
            throw new Error('Product not found');
        }
        await product.update(updateData);
        return product;
    },

    async deleteProduct(productId) {
        const product = await Product.findByPk(productId);
        if (!product) {
            throw new Error('Product not found');
        }
        await product.destroy();
        return { message: 'Product deleted successfully' };
    },

    async getAllProducts() {
        const products = await Product.findAll();
        return products;
    }
};

module.exports = productService;