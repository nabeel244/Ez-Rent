// services/CategoryService.js
const Category = require("../model/Category.js");

//Create Category
const createCategory = async(name, image) => {
    return await Category.create({ name, image });
};


//Get Category
const getCategoryById = async(id) => {
    return await Category.findByPk(id);
};

//Update Category
const updateCategory = async(id, name, image) => {
    const category = await Category.findByPk(id);
    if (category) {
        category.name = name;
        category.image = image;
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