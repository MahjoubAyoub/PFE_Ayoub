const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const designController = require('../controllers/designController');

// All routes require authentication
router.use(auth.protect);

router.get('/', designController.getUserDesigns);
router.post('/', designController.createDesign);
router.get('/:designId', designController.getDesignById);
router.put('/:designId', designController.updateDesign);
router.delete('/:designId', designController.deleteDesign);

module.exports = router;
