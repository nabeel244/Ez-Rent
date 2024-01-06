// services/WishlistService.js
const  Wishlist  = require('../models/Wishlist'); // Make sure to import the Wishlist model

const WishlistService = {
    async addToWishlist(user_id, product_id) {
        return await Wishlist.create({ user_id : user_id,product_id: product_id });
    },

    async removeFromWishlist(user_id, product_id) {
        return await Wishlist.destroy({
            where: { user_id, product_id }
        });
    },

    async getUserWishlist(user_id) {
        return await Wishlist.findAll({
            where: { user_id },
            include: ['Product'] // Assuming you have set an alias in your relations
        });
    }
};

module.exports = WishlistService;