const express = require('express');
const KnowledgeService = require('../services/KnowledgeService');
const KnowledgeController = require('../controllers/KnowledgeController');
const validate = require('../services/KnowledgeValidation'); 

const router = express.Router();
const service = new KnowledgeService();
const controller = new KnowledgeController(service);

router.post('/v1/', validate, controller.create);  // Create new knowledge item
router.get('/v1/', controller.getAll);  // Get all knowledge items
router.get('/v1/:id', controller.getById);  // Get knowledge item by ID
router.get('/v1/tag/:tag', controller.findByTag);  // Get knowledge items by tag
router.get('/v1/title/:text', controller.findByTitle);  // Get knowledge items by title
router.get('/v1/subtitle/:text', controller.findBySubtitle);  // Get knowledge items by subtitle
router.patch('/v1/:id', validate, controller.update);  // Update knowledge item by ID (PATCH)
router.delete('/v1/:id', controller.delete);  // Delete knowledge item by ID
router.get('/v1/:id/version', controller.getVersion);

module.exports = router;
