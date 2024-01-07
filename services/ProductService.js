// services/productService.js
const cloudinary = require('cloudinary').v2;
const Product = require('../models/Product');
const slugify = require('slugify');
const Category = require('../models/Category');
const User = require('../models/User');
const { Sequelize } = require('sequelize');
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
        const { status, comment, id } = data
        console.log(status, comment, id)
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
        }

        await product.update(data);
        return product;
    },

    async deleteProduct(productId) {
        const product = await Product.findByPk(productId);
        if (!product) {
            throw new Error('Product not found');
        }
      return  await product.destroy();
       
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
    }

};

module.exports = productService;