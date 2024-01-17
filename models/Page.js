
    const { DataTypes } = require('sequelize');
    const sequelize = require('../database');

    const Page = sequelize.define('pages', {

            page_name: {
                type: DataTypes.STRING,
                allowNull: false,
    
            },
            content: {
                type: DataTypes.TEXT,
                allowNull: false
            },
            page_type:{
                type: DataTypes.STRING,
                allowNull: false,
                unique: true
            }
        }, {
            timestamps: true,
            createdAt: 'created_at',
            updatedAt: 'updated_at'
        });
        
    module.exports = Page;