// services/productService.js
const cloudinary = require('cloudinary').v2;
const Product = require('../models/Product');
const slugify = require('slugify');

// Add other models if necessary

const uploadImageToCloudinary = async (file) => {
    try {
        return new Promise((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream({
                resource_type: 'auto',
                public_id: file.originalname.split('.')[0] // This sets the public_id to the original filename without extension
            }, (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    resolve({ path: result.url, name: file.originalname }); // Use file.originalname to get the original file name
                }
            });

            uploadStream.end(file.buffer);
        });
    } catch (error) {
        console.error('Error uploading to Cloudinary', error);
        throw error;
    }
};

const productService = {
    async createProduct(data, filesData) {

        const imageFiles = {
            featuredImage: filesData.image, // if there's a single featured image
            images: filesData.images // if there are multiple images
        };
        if (data.title) {
            // Creating a slug from the title
            data.slug = slugify(data.title, {
                lower: true,      // Convert to lower case
                strict: true,     // Strip special characters
                remove: /[*+~.()'"!:@]/g // Additional characters to remove
            });
        }
        data.remaining_quantity = 0
        if (imageFiles.featuredImage) {
            const featuredImageResult = await uploadImageToCloudinary(imageFiles.featuredImage[0]);
            data.featuredImagePath = featuredImageResult.path;
            data.featuredImageName = featuredImageResult.name;
        }
        // Handle multiple images upload
        if (imageFiles.images && imageFiles.images.length > 0) {
            const imagesResults = await Promise.all(imageFiles.images.map(file => uploadImageToCloudinary(file)));
            data.images = imagesResults; // 'images' should be an array of { path, name }
        }
        return await Product.create(data);

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
        if (imageFiles.images && Array.isArray(imageFiles.images) && imageFiles.images.length > 0) {
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