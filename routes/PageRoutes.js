// routes/PageRoutes.js
const express = require('express');
const PageController = require('../controllers/PageController');
const authenticateToken = require('../middlewares/AuthMiddleware');
const checkRole = require('../middlewares/RoleMiddleware');

const router = express.Router();

// Assuming PageController has methods similar to CategoryController
router.post('/create', authenticateToken, checkRole(['admin']), PageController.createPage);
router.get('/all', authenticateToken, checkRole(['admin']), PageController.allPages);
router.get('/:pageName', PageController.getPage); // Public access, no authentication required
router.put('/update/:pageName', authenticateToken, checkRole(['admin']), PageController.updatePage);
router.delete('/:pageName', authenticateToken, checkRole(['admin']), PageController.deletePage);

module.exports = router;