const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Category = sequelize.define('categories', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Name is required"
            }
        }

    },
    image_path: {
        type: DataTypes.STRING,
        allowNull: false, // Allow null if the image path is not mandatory
       
    },
    image_name: {
        type: DataTypes.STRING,
        allowNull: true, // Allow null if the image name is not mandatory
        defaultValue: null
    }
}, {
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});

module.exports = Category;