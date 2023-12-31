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
const getCategory = async(req, res, next) => {
    try {
        const category = await CategoryService.getCategoryById(req.body.id);
        if (!category) {
            res.status(HttpStatus.NOT_FOUND).json({ message: "Category not found", category });
        }
        res.json(category);
    } catch (error) {
        next(error)
    }
};

//Update Category
const updateCategory = async(req, res, next) => {
    try {
        const updatedCategory = await CategoryService.updateCategory(req.body.id, req.body, req.file);
        if (!updatedCategory) {
            res.status(HttpStatus.NOT_FOUND).json({ message: "Category not found", updatedCategory });

        }
        res.json(updatedCategory);
    } catch (error) {
        next(error)
    }
};


//Delete Category
const deleteCategory = async(req, res, next) => {
    try {
        const categoryToDelete = await CategoryService.deleteCategory(req.body.id);
        if (!categoryToDelete) {
            res.status(HttpStatus.NOT_FOUND).json({ message: "Category not found", categoryToDelete });
        }
        res.json(categoryToDelete);
    } catch (error) {
        next(error)
    }
};

// Search Category
const searchCategory = async(req, res, next) => {
    try {
        // const searchTerm = req.query.name;

        const categories = await CategoryService.searchCategoriesByName(req);
        // res.status(HttpStatus.OK).json(categories);
        res.status(HttpStatus.OK).json({ message: "Category Found", categories });

    } catch (error) {
        console.log(error.message);
        next(error);
    }
};

module.exports = {
    createCategory,
    getCategory,
    updateCategory,
    deleteCategory,
    searchCategory
};