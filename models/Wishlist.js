// models/Wishlist.js
const { DataTypes } = require('sequelize');
const sequelize = require('../database'); // adjust the path as necessary

const Wishlist = sequelize.define('wishlist', {
    user_id: {
        type: DataTypes.INTEGER,
    },
    product_id: {
        type: DataTypes.INTEGER,
    }
});

module.exports = Wishlist;