// services/productService.js
const cloudinary = require('cloudinary').v2;
const Product = require('../models/Product');
const slugify = require('slugify');
const Category = require('../models/Category');
const User = require('../models/User');
const { Sequelize } = require('sequelize');

const uploadImageToCloudinary = async (file) => {
    try {
        return new Promise((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream({
                resource_type: 'auto',
                public_id: file.originalname.split('.')[0],
                timeout: 60000,
            }, (error, result) => {
                if (error) {
                    console.error('Error uploading to Cloudinary:', error);
                    reject(error);
                } else {
                    resolve({ path: result.url, name: file.originalname });
                }
            });

            uploadStream.end(file.buffer);
        });
    } catch (error) {
        console.error('Error in uploadImageToCloudinary function:', error);
        throw error; // Consider removing this line
    }
};

const productService = {
    async createProduct(data, filesData) {

        const imageFiles = {
            featuredImage: filesData.image,
            images: filesData.images
        }
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

    async updateProduct(data, filesData) {
        const { status, comment, id, old_images } = data

        const product = await Product.findByPk(id, {
            include: [
                {
                    model: Category,
                    as: 'category',
                    attributes: ['id', 'name'],
                },
                {
                    model: User,
                    as: 'user',
                    attributes: ['id', 'name', 'email', 'role']
                }
            ]
        });
        if (!product) {
            throw new Error('Product not found');
        }
        const imageFiles = {
            featuredImage: filesData.image,
            images: filesData.images
        }
        if (status) {
            product.comment = comment
            product.status = status === 'true' ? 1 : 0
            return await product.save()
        }
        // Update featured image if provided
        if (imageFiles.featuredImage) {
            const featuredImageResult = await uploadImageToCloudinary(imageFiles.featuredImage[0]);
            data.featuredImagePath = featuredImageResult.path;
            data.featuredImageName = featuredImageResult.name;
        }
        // Handle multiple images upload
        if (imageFiles.images && imageFiles.images.length > 0) {
            const imagesResults = await Promise.all(imageFiles.images.map(file => uploadImageToCloudinary(file)));
            data.images = imagesResults; // 'images' should be an array of { path, name }

            // Compare old_images with existing product images
            const existingImages = product.images || [];

            if (old_images.length !== existingImages.length) {
                // Determine missing images based on path
                const missingImages = existingImages.filter(existingImage =>
                    !old_images.some(oldImage => oldImage.path === existingImage.path)
                );

                // Replace the missing images with the new ones
                missingImages.forEach((missingImage, index) => {
                    const newImage = imagesResults[index];
                    const imageToUpdate = existingImages.find(existingImage => existingImage.path === missingImage.path);

                    if (imageToUpdate) {
                        imageToUpdate.path = newImage.path;
                        imageToUpdate.name = newImage.name;
                    }
                });
            }
        }
        await product.update(data);
        return product;
    },

    async deleteProduct(productId) {
        const product = await Product.findByPk(productId);
        if (!product) {
            throw new Error('Product not found');
        }
        return await product.destroy();

    },

    async getAllProducts() {
        const products = await Product.findAll({
            include: [
                {
                    model: Category,
                    as: 'category',
                    attributes: ['id', 'name'],
                },
                {
                    model: User,
                    as: 'user',
                    attributes: ['id', 'name', 'email', 'role']
                }
            ]
        });
        return products;
    },
    async searchProducts(req) {
        const { search, type } = req.body;
        const validSearchFields = ['name', 'category'];

        if (!validSearchFields.includes(type)) {
            throw new Error('Invalid search type');
        }

        let whereClause = {};

        // If searching by category name, include the association with Category
        if (type === 'category') {
            whereClause = {
                '$category.name$': {
                    [Sequelize.Op.like]: `%${search}%`,
                },
            };
        }

        // If searching by product name, include the association with User
        if (type === 'name') {
            whereClause = {
                '$user.name$': {
                    [Sequelize.Op.like]: `%${search}%`,
                },
            };
        }

        // Perform the search with the appropriate associations
        const products = await Product.findAll({
            where: whereClause,
            include: [
                {
                    model: Category,
                    as: 'category',
                },
                {
                    model: User,
                    as: 'user',
                },
            ],
        });

        return products;
    },
     // Get Product for a specific user 
     async getProductsForUser(userId) {
        try {
            // Retrieve products associated with the specified user ID
            const products = await Product.findAll({
                where: {
                    user_id: userId,
                },
                include: [
                    {
                        model: Category,
                        as: 'category',
                        attributes: ['id', 'name'],
                    },
                    {
                        model: User,
                        as: 'user',
                        attributes: ['id', 'name', 'email', 'role'],
                    },
                ],
            });

            return products;
        } catch (error) {
            console.error('Error in getProductsForUser function:', error);
            throw error; 
        }
    },

    //REMARKS about a specific product
    async updateRemarks(productId, userId, remarks) {
        try {
            const product = await Product.findOne({
                where: {
                    id: productId,
                    user_id: userId,
                },
            });

            if (!product) {
                return null; // Return null when the product is not found or user does not have permission
            }

            // Update the remarks field
            product.remarks = remarks;
            await product.save();

            return product;
        } catch (error) {
            console.error('Error in updateRemarks function:', error);
            throw error; // Consider removing this line or handling the error appropriately
        }
    },
};


module.exports = productService;