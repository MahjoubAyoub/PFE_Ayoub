const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const aiController = require('../controllers/aiController');

// All routes require authentication
router.use(auth.protect);

router.post('/generate-design', aiController.generateDesign);
router.post('/enhance-design', aiController.enhanceDesign);
router.post('/suggest-elements', aiController.suggestElements);

module.exports = router;
