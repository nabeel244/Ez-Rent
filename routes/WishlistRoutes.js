// routes/wishlistRoutes.js
const express = require('express');
const WishlistController = require('../controllers/WishlistController');
const authenticateToken = require('../middlewares/AuthMiddleware');
const checkRole = require('../middlewares/RoleMiddleware');

const router = express.Router();

// Route to add an item to the wishlist
router.post('/add', checkRole(['lessee']), authenticateToken, WishlistController.addToWishlist);

// Route to remove an item from the wishlist
router.delete('/remove', checkRole(['lessee']), authenticateToken, WishlistController.removeFromWishlist);

// Route to get the wishlist of a specific user
router.get('/user/:userId', checkRole(['admin']), authenticateToken, WishlistController.getUserWishlist);

module.exports = router;