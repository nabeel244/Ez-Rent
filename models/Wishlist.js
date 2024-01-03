// models/Wishlist.js
const { DataTypes } = require('sequelize');
const sequelize = require('../database'); // adjust the path as necessary

const Wishlist = sequelize.define('Wishlist', {
    userId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Users', // should match the table name
            key: 'id'
        }
    },
    productId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Products', // should match the table name
            key: 'id'
        }
    }
});

module.exports = Wishlist;