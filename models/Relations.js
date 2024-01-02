const Product = require('./Product');
const Category = require('./Category');
const User = require('./User');

const setupDatabaseRelations = () => {
    /////////////// Reltion with category and product /////////////////////////////////////
    Category.hasMany(Product, {
        foreignKey: 'category_id',
        as: 'products'
    });

    Product.belongsTo(Category, {
        foreignKey: 'category_id',
        as: 'category'
    });


    /////////////// Reltion with user and product /////////////////////////////////////
    User.hasMany(Product, {
        foreignKey: 'user_id', // Assuming user_id is the foreign key in the Product table
        as: 'products',
      });
    
      Product.belongsTo(User, {
        foreignKey: 'user_id',
        as: 'user',
      });
};

module.exports = setupDatabaseRelations;