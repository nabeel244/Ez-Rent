// services/productService.js
const cloudinary = require('cloudinary').v2;
const Product = require('../models/Product');
// Add other models if necessary

//Helper Function to upload images in cloudianry
const uploadImageToCloudinary = async(imagePath) => {
    try {
        const result = await cloudinary.uploader.upload(imagePath);
        return { path: result.url, name: result.original_filename };
    } catch (error) {
        console.error('Error uploading to Cloudinary', error);
        throw error;
    }
};

const productService = {
    async createProduct(data, imageFiles) {
        // Handle featured image upload
        if (imageFiles.featuredImage) {
            const featuredImageResult = await uploadImageToCloudinary(imageFiles.featuredImage.path);
            data.featuredImagePath = featuredImageResult.path;
            data.featuredImageName = featuredImageResult.name;
        }

        // Handle multiple images upload
        if (imageFiles.images && imageFiles.images.length > 0) {
            const imagesResults = await Promise.all(imageFiles.images.map(file => uploadImageToCloudinary(file.path)));
            data.images = imagesResults; // 'images' should be an array of { path, name }
        }

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

    async updateProduct(productId, updateData, imageFiles) {
        const product = await Product.findByPk(productId);
        if (!product) {
            throw new Error('Product not found');
        }

        // Update featured image if provided
        if (imageFiles.featuredImage) {
            const featuredImageResult = await uploadImageToCloudinary(imageFiles.featuredImage.path);
            updateData.featuredImagePath = featuredImageResult.path;
            updateData.featuredImageName = featuredImageResult.name;
        }

        // Update multiple images if provided
        if (imageFiles.images && imageFiles.images.length > 0) {
            const imagesResults = await Promise.all(imageFiles.images.map(file => uploadImageToCloudinary(file.path)));
            updateData.images = imagesResults;
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
    },
    async searchProducts(searchParams) {
        let whereConditions = {};

        if (searchParams.categoryId) {
            whereConditions.categoryId = searchParams.categoryId;
        }

        if (searchParams.userId) {
            whereConditions.userId = searchParams.userId;
        }

        const products = await Product.findAll({
            where: whereConditions,
            include: [
                // Include other models here if necessary, like Category or User
            ]
        });

        return products;
    },

};

module.exports = productService;