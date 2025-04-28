const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const collaborationController = require('../controllers/collaborationController');

// All routes require authentication
router.use(auth);

router.get('/project/:projectId/collaborators', collaborationController.getCollaborators);
router.post('/project/:projectId/collaborators', collaborationController.addCollaborator);
router.delete('/project/:projectId/collaborators/:userId', collaborationController.removeCollaborator);
router.put('/project/:projectId/collaborators/:userId/role', collaborationController.updateCollaboratorRole);

module.exports = router;
