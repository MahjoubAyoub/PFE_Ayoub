const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const exportController = require('../controllers/exportController');

// All routes require authentication
router.use(auth.protect);

router.post('/design/:designId/image', exportController.exportAsImage);
router.post('/design/:designId/pdf', exportController.exportAsPDF);
router.get('/history', exportController.getExportHistory);

module.exports = router;
