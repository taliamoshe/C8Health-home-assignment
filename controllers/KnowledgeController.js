//const KnowledgeItemSchema = require('../KnowledgeValidation');

class KnowledgeController {
  constructor(service) {
    this.service = service;
    this.getAll = this.getAll.bind(this);
    this.create = this.create.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
    this.getById = this.getById.bind(this);
    this.findByTag = this.findByTag.bind(this);
    this.findByTitle = this.findByTitle.bind(this);
    this.findBySubtitle = this.findBySubtitle.bind(this);
    //this.validate = this.validate.bind(this);
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

  async create(req, res) {
    try {
      const item = await this.service.create(req.body);
      res.status(201).json(item);
    } catch (err) {
      res.status(500).json({ message: 'Error creating knowledge item', error: err.message });
    }
  }

  async getAll(req, res) {
    try {
      const items = await this.service.getAll();
      res.status(200).json(items);
    } catch (err) {
      res.status(500).json({ message: 'Error retrieving knowledge items', error: err.message });
    }
  }

  async getById(req, res) {
    try {
      const item = await this.service.getById(req.params.id);
      if (!item) {
        return res.status(404).json({ message: 'Knowledge item not found' });
      }
      res.status(200).json(item);
    } catch (err) {
      res.status(500).json({ message: 'Error retrieving knowledge item', error: err.message });
    }
  }

 async update(req, res) {
    try {
      const item = await this.service.update(req.params.id, req.body);
      if (!item) {
        return res.status(404).json({ message: 'Knowledge item not found to update' });
      }
      res.status(200).json(item);
    } catch (err) {
      res.status(500).json({ message: 'Error updating knowledge item', error: err.message });
    }
  }

  async delete(req, res) {
    try {
      const item = await this.service.delete(req.params.id);
      if (!item) {
        return res.status(404).json({ message: 'Knowledge item not found to delete' });
      }
      res.status(200).json({ message: 'Knowledge item deleted successfully' });
    } catch (err) {
      res.status(500).json({ message: 'Error deleting knowledge item', error: err.message });
    }
  }

  async findByTag(req, res) {
    try {
      const items = await this.service.findByTag(req.params.tag);
      res.status(200).json(items);
    } catch (err) {
      res.status(500).json({ message: 'Error finding items by tag', error: err.message });
    }
  }

  async findByTitle(req, res) {
    try {
      const items = await this.service.findByTitle(req.params.text);
      res.status(200).json(items);
    } catch (err) {
      res.status(500).json({ message: 'Error finding items by title', error: err.message });
    }
  }

  async findBySubtitle(req, res) {
    try {
      const items = await this.service.findBySubtitle(req.params.text);
      res.status(200).json(items);
    } catch (err) {
      res.status(500).json({ message: 'Error finding items by subtitle', error: err.message });
    }
  }

}

module.exports = KnowledgeController;
