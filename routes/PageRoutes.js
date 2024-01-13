// routes/PageRoutes.js
const express = require('express');
const PageController = require('../controllers/PageController');
const authenticateToken = require('../middlewares/AuthMiddleware');
const checkRole = require('../middlewares/RoleMiddleware');

const router = express.Router();

// Use PUT for both create and update
router.put('/:pageName?' , PageController.createOrUpdatePage);

router.get('/:pageName', PageController.viewPage);

module.exports = router;
