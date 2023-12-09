// controllers/CategoryController.js
const CategoryService = require("../services/CategoryService");
const HttpStatus = require('../utils/ResponseStatus')

//Create Category
const createCategory = async(req, res, next) => {
    try {

        // req.file is where the uploaded file data will be
        const category = await CategoryService.createCategory(req.body, req.file);
        res.status(HttpStatus.CREATED).json({ message: "Category added successfully", category });

    } catch (error) {
        next(error)
    }
};


//Get Category
const getCategory = async(req, res) => {
    try {
        const category = await CategoryService.getCategoryById(req.params.id);
        if (!category) {
            res.status(HttpStatus.NOT_FOUND).json({ message: "Category not found", category });
        }
        res.json(category);
    } catch (error) {
        next(error)
    }
};

//Update Category
const updateCategory = async(req, res) => {
    try {
        const updatedCategory = await CategoryService.updateCategory(req.params.id, req.body, req.file);
        if (!updatedCategory) {
            res.status(HttpStatus.NOT_FOUND).json({ message: "Category not found", category });

        }
        res.json(updatedCategory);
    } catch (error) {
        next(error)
    }
};


//Delete Category
const deleteCategory = async(req, res) => {
    try {
        const categoryToDelete = await CategoryService.deleteCategory(req.params.id);
        if (!categoryToDelete) {
            res.status(HttpStatus.NOT_FOUND).json({ message: "Category not found", category });
        }
        res.status(200).json({ message: 'Category deleted' });
    } catch (error) {
        next(error)
    }
};

module.exports = {
    createCategory,
    getCategory,
    updateCategory,
    deleteCategory
};