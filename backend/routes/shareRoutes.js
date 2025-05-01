const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const shareController = require('../controllers/shareController');

// All routes require authentication
router.use(auth.protect);

router.post('/design/:designId', shareController.shareDesign);
router.get('/shared-with-me', shareController.getSharedDesigns);
router.put('/design/:designId/permissions', shareController.updateSharePermissions);
router.delete('/design/:designId/revoke', shareController.revokeAccess);

module.exports = router;
