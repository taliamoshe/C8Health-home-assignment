const express = require('express');
const KnowledgeService = require('../services/KnowledgeService');
const KnowledgeController = require('../controllers/KnowledgeController');
const validate = require('../KnowledgeValidation'); 

const router = express.Router();
const service = new KnowledgeService();
const controller = new KnowledgeController(service);

router.post('/', validate, controller.create);
router.get('/', controller.getAll);
router.get('/tag/:tag', controller.findByTag);
router.get('/title/:text', controller.findByTitle);
router.get('/subtitle/:text', controller.findBySubtitle);
router.get('/:id', controller.getById);
router.put('/:id', validate, controller.update);
router.delete('/:id', controller.delete);

module.exports = router;
