const { DataTypes, Model } = require('sequelize');
const sequelize = require('../database');

class Product extends Model {}

Product.init({
    productSlug: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    price: {
        type: DataTypes.DECIMAL(10, 2), // Assuming price is a decimal
        allowNull: false
    },
    totalQuantity: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    remainingQuantity: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    tagline: {
        type: DataTypes.STRING,
        allowNull: true // Tagline can be optional
    },
    collectionFee: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    refundableDeposit: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    categoryId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    status: {
        type: DataTypes.ENUM('Active', 'Inactive', 'Deleted'), // Example values
        allowNull: false
    },
    mainImage: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null
    },
    productImages: {
        type: DataTypes.TEXT, // This can be a JSON string or similar to store multiple images
        allowNull: true,
        defaultValue: null
    },
    remarks: {
        type: DataTypes.TEXT,
        allowNull: true
    }
}, {
    sequelize,
    modelName: 'Product'
});

module.exports = Product;