// services/CategoryService.js
const Category = require("../models/Category");
const upload = require("../middlewares/FileHandlingMiddleware");


//Create Category
const createCategory = async (req) => {
    const name = req.body.name;
    let imagePath = '';

    // Check if file is uploaded
    if (req.file) {
        imagePath = req.file.path; // Path where the image is stored
    }
    return await Category.create({ name, image: imagePath });
};


//Get Category
const getCategoryById = async (id) => {
    return await Category.findById(id);
};

//Update Category
const updateCategory = async (id, name, image) => {
    const category = await Category.findByPk(id);

    if (category) {
        category.name = name || category.name;
        if (image) { // Only update the image if a new one is provided
            category.image = image;
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