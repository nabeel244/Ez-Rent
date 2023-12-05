// services/CategoryService.js

const Category = require("../models/Category");
const cloudinary = require('../utils/cloudinary')


const uploadImageToCloudinary = async (file) => {
    try {
        // Return a promise that resolves when the upload is complete
        return new Promise((resolve, reject) => {
            // Create an upload stream
            const uploadStream = cloudinary.uploader.upload_stream({
                resource_type: 'auto'
            }, (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    console.log(result)
                    resolve({ path: result.url, name: result.original_filename });
                }
            });

            // Write file buffer to the stream
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
    console.log(imageFile)
    let image_path, image_name;
    if (imageFile) {
        const uploadResult = await uploadImageToCloudinary(imageFile);
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

const updateCategory = async (id, body, imageFile) => {
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