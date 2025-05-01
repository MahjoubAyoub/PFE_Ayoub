const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const elementController = require('../controllers/elementController');

// All routes require authentication
router.use(auth.protect);

router.get('/', elementController.getAllElements);
router.post('/', elementController.createElement);
router.get('/:id', elementController.getElementById);
router.put('/:id', elementController.updateElement);
router.delete('/:id', elementController.deleteElement);

module.exports = router;
