const logger = require('../config/logger'); 

class KnowledgeController {
  constructor(service) {
    this.service = service;
  }
/*
  validate(req, res, next) {
    const { error } = KnowledgeItemSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: 'Validation error', details: error.details });
    }
    next();
  }
    */

  create = async (req, res) => {
    try {
      const item = await this.service.create(req.body);
      logger.info('Knowledge item created: ' + item.title); // Log creation event
      res.status(201).json(item);
    } catch (err) {
      logger.error('Error creating knowledge item: ' + err.message); // Log error
      res.status(500).json({ message: 'Error creating knowledge item', error: err.message });
    }
  }

  getAll = async (req, res) => {
    try {
      const items = await this.service.getAll();
      logger.info('Fetched all knowledge items');
      res.status(200).json(items);
    } catch (err) {
      logger.error('Error retrieving knowledge items: ' + err.message); // Log error
      res.status(500).json({ message: 'Error retrieving knowledge items', error: err.message });
    }
  }

  getById = async (req, res) => {
    try {
      const item = await this.service.getById(req.params.id);
      if (!item) {
        logger.warn(`Knowledge item with ID ${req.params.id} not found`); // Log warning for not found item
        return res.status(404).json({ message: 'Knowledge item not found' });
      }
      logger.info(`Fetched knowledge item with ID: ${req.params.id}`); // Log fetching specific item
      res.status(200).json(item);
    } catch (err) {
      logger.error('Error retrieving knowledge item: ' + err.message); // Log error
      res.status(500).json({ message: 'Error retrieving knowledge item', error: err.message });
    }
  }

  update = async (req, res) => {
    try {
      const item = await this.service.update(req.params.id, req.body);
      if (!item) {
        logger.warn(`Knowledge item with ID ${req.params.id} not found to update`); // Log warning for not found item
        return res.status(404).json({ message: 'Knowledge item not found to update' });
      }
      logger.info(`Knowledge item with ID ${req.params.id} updated successfully`); // Log successful update
      res.status(200).json(item);
    } catch (err) {
      logger.error('Error updating knowledge item: ' + err.message); // Log error
      res.status(500).json({ message: 'Error updating knowledge item', error: err.message });
    }
  }

  delete = async (req, res) => {
    try {
      const item = await this.service.delete(req.params.id);
      if (!item) {
        logger.warn(`Knowledge item with ID ${req.params.id} not found to delete`); // Log warning for not found item
        return res.status(404).json({ message: 'Knowledge item not found to delete' });
      }
      logger.info(`Knowledge item with ID ${req.params.id} deleted successfully`); // Log successful deletion
      res.status(200).json({ message: 'Knowledge item deleted successfully' });
    } catch (err) {
      logger.error('Error deleting knowledge item: ' + err.message); // Log error
      res.status(500).json({ message: 'Error deleting knowledge item', error: err.message });
    }
  }

  findByTag = async (req, res) => {
    try {
      const items = await this.service.findByTitle(req.params.text);
      logger.info(`Found ${items.length} knowledge items for title: ${req.params.text}`); // Log items found by title
      res.status(200).json(items);
    } catch (err) {
      logger.error('Error finding items by title: ' + err.message); // Log error
      res.status(500).json({ message: 'Error finding items by title', error: err.message });
    }
  }

  findByTitle = async (req, res) => {
    try {
      const items = await this.service.findByTitle(req.params.text);
      logger.info(`Found ${items.length} knowledge items for title: ${req.params.text}`); // Log items found by title
      res.status(200).json(items);
    } catch (err) {
      logger.error('Error finding items by title: ' + err.message); // Log error
      res.status(500).json({ message: 'Error finding items by title', error: err.message });
    }
  }

  findBySubtitle = async (req, res) => {
    try {
      const items = await this.service.findBySubtitle(req.params.text);
      logger.info(`Found ${items.length} knowledge items for subtitle: ${req.params.text}`); // Log items found by subtitle
      res.status(200).json(items);
    } catch (err) {
      logger.error('Error finding items by subtitle: ' + err.message); // Log error
      res.status(500).json({ message: 'Error finding items by subtitle', error: err.message });
    }
  }
}


module.exports = KnowledgeController;
