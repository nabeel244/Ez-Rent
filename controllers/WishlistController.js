const WishlistService = require('../services/WishlistService')
const HttpStatus = require('../utils/ResponseStatus')


const WishlistController = {
    async addToWishlist(req, res, next) {
        try {
           
            let wishlist = await WishlistService.addToWishlist(req);
            res.status(HttpStatus.OK).json({ message: wishlist.message, wishlist : wishlist.wishlist });
        } catch (error) {
            // res.status(500).send(error.message);
            next(error)
        }
    },

    async removeFromWishlist(req, res, next) {
        try {
            const { userId, productId } = req.body; // Assuming these are passed in the request body
            await WishlistService.removeFromWishlist(userId, productId);
            // res.status(200).send('Removed from wishlist.');
            res.status(HttpStatus.OK).json({ message: "Removed From wishlist" });

        } catch (error) {
            // res.status(500).send(error.message);
            next(error)
        }
    },

    async getUserWishlist(req, res, next) {
        try {
            const userId = req.params.userId; // Assuming user ID is passed as a URL parameter
            const wishlist = await WishlistService.getUserWishlist(userId);
            // res.json(wishlist);
            res.status(HttpStatus.OK).json({ message: "Wishlist data", wishlist });

        } catch (error) {
            // res.status(500).send(error.message);
            next(error)
        }
    }
};

module.exports = WishlistController;