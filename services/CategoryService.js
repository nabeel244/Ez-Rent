// services/CategoryService.js
const Category = require("../models/Category");

//Create Category
const createCategory = async(body) => {
    const { name, imagePath, imageName } = body;
    return await Category.create({ name, imagePath, imageName });
};



//Get Category
const getCategoryById = async(id) => {
    return await Category.findById(id);
};

//Update Category
const updateCategory = async(id, body) => {
    const { name, imagePath, imageName } = body;
    const category = await Category.findByPk(id);

    if (category) {
        category.name = name || category.name;
        category.imagePath = imagePath || category.imagePath;
        category.imageName = imageName || category.imageName;
        await category.save();
    }
    return category;
};


//Delete Category
const deleteCategory = async(id) => {
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