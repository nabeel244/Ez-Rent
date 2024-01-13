const Product = require('./Product');
const Category = require('./Category');
const User = require('./User');
const Wishlist = require('./Wishlist')
const Page = require('./Page')

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
    ////////////////////Relation between User and Product via Wishlist//////////////////////

    User.hasMany(Wishlist, {
        foreignKey: 'user_id',
        as: 'wishlists'
    });
    };
    Product.hasMany(Wishlist, {
        foreignKey: 'product_id',
        as: 'wishlists'
    });

    Wishlist.belongsTo(User, {
        foreignKey: 'user_id',
        as: 'user'
    });
    Wishlist.belongsTo(Product, {
        foreignKey: 'product_id',
        as: 'product'
    });



module.exports = setupDatabaseRelations;