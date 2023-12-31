const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Category = sequelize.define('categories', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    image_path: {
        type: DataTypes.STRING,
        allowNull: true, // Allow null if the image path is not mandatory
        defaultValue: null
    },
    image_name: {
        type: DataTypes.STRING,
        allowNull: true, // Allow null if the image name is not mandatory
        defaultValue: null
    },
    comment: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    status: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
}, {
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});

module.exports = Category;