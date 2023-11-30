// controllers/CategoryController.js
const CategoryService = require("../services/CategoryService");
const HttpStatus = require('../utils/ResponseStatus')

//Create Category
const createCategory = async(req, res, next) => {
    try {
        const category = await CategoryService.createCategory(req);
        res.status(HttpStatus.CREATED).json({ message: "Category created successfully", category });
    } catch (error) {
        next(error)
    }
};

//Get Category
const getCategory = async(req, res) => {
    try {
        const category = await CategoryService.getCategoryById(req.params.id);
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }
        res.json(category);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

//Update Category
const updateCategory = async(req, res) => {
    try {
        const updatedCategory = await CategoryService.updateCategory(req.params.id, req.body.name, req.body.image);
        if (!updatedCategory) {
            return res.status(404).json({ message: 'Category not found' });
        }
        res.json(updatedCategory);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

//Delete Category
const deleteCategory = async(req, res) => {
    try {
        const categoryToDelete = await CategoryService.deleteCategory(req.params.id);
        if (!categoryToDelete) {
            return res.status(404).json({ message: 'Category not found' });
        }
        res.status(200).json({ message: 'Category deleted' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    createCategory,
    getCategory,
    updateCategory,
    deleteCategory
};