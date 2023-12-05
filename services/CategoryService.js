// services/CategoryService.js

const cloudinary = require('cloudinary').v2;
const Category = require("../models/Category");
const upload = require("../middlewares/FileHandlingMiddleware");


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

    let imagePath, imageName;
    if (imageFile) {
        const uploadResult = await uploadImageToCloudinary(imageFile.path);
        imagePath = uploadResult.path;
        imageName = uploadResult.name;
    }

    return await Category.create({ name, imagePath, imageName });

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