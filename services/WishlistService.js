// services/WishlistService.js
const  Wishlist  = require('../models/Wishlist'); // Make sure to import the Wishlist model

const WishlistService = {
    async addToWishlist(req) {
        const { product_id } = req.body;
        const user = req.user; 
  
        const existingWishlistItem = await Wishlist.findOne({
            where: {
                user_id: user.id,
                product_id: product_id
            }
        });
    
        if (existingWishlistItem) {
          let wishlist =  await Wishlist.destroy({
                where: {
                    user_id: user.id,
                    product_id: product_id
                }
            });
            return  {
                wishlist : wishlist,
                message : 'Removed from wishlist'
            }
          
        } else {
          let wishlist =  await Wishlist.create({
                user_id: user.id,
                product_id: product_id
            });
            return  {
                wishlist : wishlist,
                message : 'Added to wishlist'
            }
        }
    
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