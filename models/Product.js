const { DataTypes, Model } = require('sequelize');
const sequelize = require('../database');

const Product = sequelize.define('product', {
    slug: {
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
    total_quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    remaining_quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    tagline: {
        type: DataTypes.STRING,
        allowNull: true // Tagline can be optional
    },
    collection_fee: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    refundable_deposit: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    category_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    status: {
        type: DataTypes.ENUM('Active', 'Inactive', 'Deleted'), // Example values
        allowNull: false
    },
    feature_image: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null
    },
    images: {
        type: DataTypes.TEXT, // This can be a JSON string or similar to store multiple images
        allowNull: true,
        defaultValue: null
    },
    remarks: {
        type: DataTypes.TEXT,
        allowNull: true
    }
}, {
    timestamps: true, // if you want to have Sequelize automatically add createdAt and updatedAt
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});

module.exports = Product;