// services/WishlistService.js
// const { Wishlist } = require('../models/Wishlist'); // Make sure to import the Wishlist model
const Wishlist = require('../models/Wishlist');
const WishlistService = {
    async addToWishlist(userId, productId) {
        return await Wishlist.create({ userId, productId });
    },

    async removeFromWishlist(userId, productId) {
        return await Wishlist.destroy({
            where: { userId, productId }
        });
    },

    async getUserWishlist(userId) {
        return await Wishlist.findAll({
            where: { userId },
            include: ['Product'] // Assuming you have set an alias in your relations
        });
    }
};

module.exports = WishlistService;