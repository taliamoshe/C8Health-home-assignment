const logger = require('../config/logger'); 

class KnowledgeController {
  constructor(service) {
    this.service = service;
  }

  create = async (req, res) => {
    try {
      const item = await this.service.create(req.body);
      logger.info('Knowledge item created: ' + item.title); // Log creation event
      res.status(201).json(item);
    } catch (err) {
      logger.error('Error creating knowledge item: ' + err.message);
      res.status(500).json({ message: 'Error creating knowledge item', error: err.message });
    }
  }

  getAll = async (req, res) => {
    try {
      const items = await this.service.getAll(); // For now we can do getAll, when we have a lot of data of items we should use pagination
      logger.info('Fetched all knowledge items');
      res.status(200).json(items);
    } catch (err) {
      logger.error('Error retrieving knowledge items: ' + err.message);
      res.status(500).json({ message: 'Error retrieving knowledge items', error: err.message });
    }
  }

  getById = async (req, res) => {
    try {
      const item = await this.service.getById(req.params.id);
      logger.info(`Fetched knowledge item with ID: ${req.params.id}`); // Log fetching specific item
      res.status(200).json(item);
    } catch (err) {
      logger.error('Error retrieving knowledge item: ' + err.message); 
      const status = err.message.includes('not found') ? 404 : 500;
      res.status(status).json({ message: 'Error retrieving knowledge item', error: err.message });
    }
  }

  update = async (req, res) => {
    try {
      const item = await this.service.update(req.params.id, req.body);
      logger.info(`Knowledge item with ID ${req.params.id} updated successfully`); // Log successful update
      res.status(200).json(item);
    } catch (err) {
      logger.error('Error updating knowledge item: ' + err.message); 
      const status = err.message.includes('not found') ? 404 : 500;
      res.status(status).json({ message: 'Error updating knowledge item', error: err.message });
    }
  }

  delete = async (req, res) => {
    try {
      await this.service.delete(req.params.id);
      logger.info(`Knowledge item with ID ${req.params.id} deleted successfully`); // Log successful deletion
      res.status(200).json({ message: 'Knowledge item deleted successfully' });
    } catch (err) {
      logger.error('Error deleting knowledge item: ' + err.message);
      const status = err.message.includes('not found') ? 404 : 500;
      res.status(status).json({ message: 'Error deleting knowledge item', error: err.message });
    }
  }

  findByTag = async (req, res) => {
    try {
      const items = await this.service.findByTag(req.params.tag);
      logger.info(`Found ${items.length} knowledge items for tag: ${req.params.tag}`); // Log items found by title
      res.status(200).json(items);
    } catch (err) {
      logger.error('Error finding items by tag: ' + err.message); 
      res.status(500).json({ message: 'Error finding items by tag', error: err.message });
    }
  }


  findByTitle = async (req, res) => {
    try {
      const items = await this.service.findByTitle(req.params.text);
      logger.info(`Found ${items.length} knowledge items for title: ${req.params.text}`); // Log items found by title
      res.status(200).json(items);
    } catch (err) {
      logger.error('Error finding items by title: ' + err.message); 
      res.status(500).json({ message: 'Error finding items by title', error: err.message });
    }
  }


  findBySubtitle = async (req, res) => {
    try {
      const items = await this.service.findBySubtitle(req.params.text);
      logger.info(`Found ${items.length} knowledge items for subtitle: ${req.params.text}`); // Log items found by subtitle
      res.status(200).json(items);
    } catch (err) {
      logger.error('Error finding items by subtitle: ' + err.message);
      res.status(500).json({ message: 'Error finding items by subtitle', error: err.message });
    }
  }
  getVersion = async (req, res) => {
    try {
      const version = await this.service.getVersion(req.params.id);
      res.status(200).json(version);
    } catch (err) {
      const status = err.message.includes('not found') ? 404 : 500;
      res.status(status).json({ message: 'Error retrieving version history', error: err.message });
    }
  }

  filterByTags = async (req, res) => {
  try {
    const tags = Array.isArray(req.query.tags) ? req.query.tags : [req.query.tags];
    const items = await this.service.filterByTags(tags);
    res.status(200).json(items);
  } catch (err) {
    logger.error('Error filtering items by tags: ' + err.message);
    res.status(500).json({ message: 'Error filtering items by tags', error: err.message });
  }
}

  
}

module.exports = KnowledgeController;
