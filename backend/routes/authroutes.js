const express = require('express');
const router = express.Router();
const { register, login, createAdmin, handleOAuth } = require('../controllers/authController');
const { protect, admin } = require('../middleware/authMiddleware');

// Auth routes
router.post('/register', register);
router.post('/login', login);
router.post('/oauth', handleOAuth);

// Admin routes - protected
router.post('/admin/create', protect, admin, createAdmin);

module.exports = router;
