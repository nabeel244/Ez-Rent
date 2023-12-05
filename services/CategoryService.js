// services/CategoryService.js

const Category = require("../models/Category");
const cloudinary = require('../utils/cloudinary')


const uploadImageToCloudinary = async(imagePath) => {
    try {
        const result = await cloudinary.uploader.upload(imagePath);
        return { path: result.url, name: result.original_filename };
    } catch (error) {
        console.error('Error uploading to Cloudinary', error);
        throw error;
    }
};

//Create Category

const createCategory = async(body, imageFile) => {
    const { name } = body;

    let image_path, image_name;
    if (imageFile) {
        const uploadResult = await uploadImageToCloudinary(imageFile.path);
        console.log(uploadResult, 'this is the result')
        image_path = uploadResult.path;
        image_name = uploadResult.name;
    }

    return await Category.create({ name, image_path, image_name });

};


//Get Category
const getCategoryById = async (id) => {
    return await Category.findById(id);
};

//Update Category

const updateCategory = async(id, body, imageFile) => {
    const { name } = body;

    const category = await Category.findByPk(id);

    if (category) {
        category.name = name || category.name;

        if (imageFile) {
            const uploadResult = await uploadImageToCloudinary(imageFile.path);
            category.imagePath = uploadResult.path;
            category.imageName = uploadResult.name;
        }

        await category.save();
    }
    return category;
};


//Delete Category
const deleteCategory = async (id) => {
    const category = await Category.findByPk(id);
    if (category) {
        await category.destroy();
    }
    return category;
};

module.exports = {
    createCategory,
    getCategoryById,
    updateCategory,
    deleteCategory
};