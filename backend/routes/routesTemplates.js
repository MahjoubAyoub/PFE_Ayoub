const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const templateController = require('../controllers/templateController');

// All routes require authentication
router.use(auth.protect);

router.get('/', templateController.getTemplates);
router.post('/', templateController.createTemplate);
router.get('/:id', templateController.getTemplate);
router.put('/:id', templateController.updateTemplate);
router.delete('/:id', templateController.deleteTemplate);

module.exports = router;
