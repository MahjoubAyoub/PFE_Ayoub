const express = require('express');
const router = express.Router();
const { protect, admin } = require('../middleware/authMiddleware');
const adminController = require('../controllers/adminController');

// All routes require both authentication and admin role
router.use(protect, admin);

// User Management
router.get('/users', adminController.getAllUsers);
router.get('/users/:userId', adminController.getUserById);
router.put('/users/:userId', adminController.updateUser);
router.delete('/users/:userId', adminController.deleteUser);

// Template Management
router.get('/templates', adminController.getAllTemplates);
router.post('/templates', adminController.createTemplate);
router.put('/templates/:templateId', adminController.updateTemplate);
router.delete('/templates/:templateId', adminController.deleteTemplate);

// Statistics
router.get('/statistics', adminController.getStatistics);
router.get('/statistics/users', adminController.getUserStatistics);
router.get('/statistics/designs', adminController.getDesignStatistics);
router.get('/statistics/templates', adminController.getTemplateStatistics);

// Media Management
router.get('/media', adminController.getAllMedia);
router.delete('/media/:mediaId', adminController.deleteMedia);
router.post('/media/cleanup', adminController.cleanupUnusedMedia);

module.exports = router;