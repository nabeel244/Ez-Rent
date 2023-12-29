// services/CategoryService.js

const Category = require("../models/Category");
const cloudinary = require('../utils/cloudinary');
const { Op } = require('sequelize'); // Import Op from Sequelize



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

//Create Category

const createCategory = async (body, imageFile) => {
    const { name } = body;
    let image_path, image_name;
    if (imageFile) {
        const uploadResult = await uploadImageToCloudinary(imageFile);
        image_path = uploadResult.path;
        image_name = uploadResult.name;
    }

    return await Category.create({ name, image_path, image_name });

};

const allCategories = async () => {
    return await Category.findAll();
}

//Get Category
const getCategoryById = async (id) => {
    return await Category.findByPk(id);
};

//Update Category

const updateCategory = async (body, imageFile) => {
    const { name, id, comment } = body;
    const category = await Category.findByPk(id);
    if (!category) {
        throw new Error('Category not found');
    }
    if (comment) {
        category.comment = comment
        return await category.save()
    }
    // Update category details
    category.name = name;

    // If an image file is provided, upload it and update category image details
    if (imageFile) {
        const uploadResult = await uploadImageToCloudinary(imageFile);
        category.image_path = uploadResult.path;
        category.image_name = uploadResult.name;
    }
    console.log(category)
    return await category.save();

};


//Delete Category
const deleteCategory = async (id) => {
    const category = await Category.findByPk(id);
    if (category) {
        await category.destroy();
    }
    return category;
};

// Search Category
const searchCategoriesByName = async (req) => {
    const { name } = req.body;
    if (!name) {
        throw new Error('Name is required');
    }

    return await Category.findAll({
        where: {
            name: {
                [Op.like]: `%${name}%` // Use Op.like for partial matching
            }
        }
    });
};

module.exports = {
    createCategory,
    getCategoryById,
    updateCategory,
    deleteCategory,
    searchCategoriesByName,
    allCategories
};