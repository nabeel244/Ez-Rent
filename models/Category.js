const { DataTypes } = require('sequelize');
const sequelize = require('../database'); // Adjust this path to where your sequelize instance is configured

const Page = sequelize.define('Page', {
    pageName: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false
    }
}, {});

module.exports = Page;