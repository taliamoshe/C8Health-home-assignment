const { KnowledgeItem, Tag, VersionHistory } = require('../models');
const { Op } = require('sequelize');


class KnowledgeService {

  create = async (data) => {
    try {
      let { tags, ...itemData } = data; // keeps the input of the user separated into itemData and the tags
      const item = await KnowledgeItem.create(itemData); // creates the item without tags

      if (typeof tags === 'string') {
        tags = [tags];
      }
      if (tags && Array.isArray(tags)) {
        const tagInstances = await Promise.all( //only after all tags are done we continue
          tags.map(async (tagText) => {
            const [tag] = await Tag.findOrCreate({ where: { tag: tagText } }); // attaching existing/new tags
            return tag;
          })
        );
        await item.setTags(tagInstances); 
      }
      return item;
    } catch (err) {
      throw new Error('Failed to create knowledge item: ' + err.message);
    }
  }


  getAll = async () => {
    try {
      return await KnowledgeItem.findAll({ include: Tag });
    } catch (err) {
      throw new Error('Failed to fetch all knowledge items: ' + err.message);
    }
  }


  update = async (id, data) => { //BY ID
    try {
      const { tags, ...itemData } = data;
      const item = await KnowledgeItem.findOne({ where: { KnowledgeItem_id: id } });
      if (!item) throw new Error('Item not found');

      const oldItem = { ...item.get({ plain: true }) };

      const previousVersion = await VersionHistory.findOne({ where: { KnowledgeItem_id: id } });
      if (previousVersion) {
        await previousVersion.destroy();
      }

      await VersionHistory.create({
        KnowledgeItem_id: id,
        title: oldItem.title,
        subtitle: oldItem.subtitle,
        content: oldItem.content,
        vettedDate: oldItem.vettedDate,
        tags: JSON.stringify(oldItem.tags),  
        updatedAt: new Date(),
      });

      await item.update(itemData); //exist!

      if (tags) {
        const tagInstances = await Promise.all(
          tags.map(async (tagText) => {
            const [tag] = await Tag.findOrCreate({ where: { tag: tagText } });
            return tag;
          })
        );
        await item.setTags(tagInstances);
      }

      return item;
    } catch (err) {
      throw new Error('Failed to update knowledge item: ' + err.message);
    }
  }

  delete = async (id) => {
    try {
      const item = await KnowledgeItem.findOne({ where: { KnowledgeItem_id: id } });
      if (!item) throw new Error('Item not found');

      const previousVersion = await VersionHistory.findOne({ where: { KnowledgeItem_id: id } }); //checks if there is other version
      if (previousVersion) {
        await previousVersion.destroy();
      }
      await item.destroy();
      return item;
    } catch (err) {
      throw new Error('Failed to delete knowledge item: ' + err.message);
    }
  }

  getById = async (id) => {
    try {
      const item = await KnowledgeItem.findOne({
        where: { KnowledgeItem_id: id },
        include: Tag
      });
      if (!item) throw new Error('Item not found');
      return item;
    } catch (err) {
      throw new Error('Failed to get knowledge item by ID: ' + err.message);
    }
  }

  findByTag = async (tagText) => {
    try {
      const tag = await Tag.findOne({
        where: { tag: tagText },
        include: KnowledgeItem, // returns all the knowledge items related to the given tag
        through: { attributes: [] }
      });

      return tag?.KnowledgeItems ?? [];
    } catch (err) {
      throw new Error('Failed to find knowledge items by tag: ' + err.message);
    }
  }



  findByTitle = async (text) => {
    try {
      return await KnowledgeItem.findAll({
        where: {
          title: { [Op.like]: `%${text}%` } // LIKE (SQL)
        },
        include: Tag
      });
    } catch (err) {
      throw new Error('Failed to find knowledge items by title: ' + err.message);
    }
  }

  findBySubtitle = async (text) => {
    try {
      return await KnowledgeItem.findAll({
        where: {
          subtitle: { [Op.like]: `%${text}%` } // LIKE (SQL)
        },
        include: Tag
      });
    } catch (err) {
      throw new Error('Failed to find knowledge items by subtitle: ' + err.message);
    }
  }

  getVersion = async (id) => {
    try {
      const version = await VersionHistory.findOne({ where: { KnowledgeItem_id: id } });
      if (!version) throw new Error('Version history not found');
      return version;
    } catch (err) {
      throw new Error('Failed to get version history: ' + err.message);
    }
  }

  filterByTags = async (tagList) => {
    const tagRecords = await Tag.findAll({
      where: { tag: tagList },
      include: {
        model: KnowledgeItem,
        through: { attributes: [] }
      }
    });
  
    if (tagRecords.length !== tagList.length) {
      throw new Error("Not all tags were found in the database");
    }
  
    const itemCounts = {};
    tagRecords.forEach(tag => {
      tag.KnowledgeItems.forEach(item => {
        itemCounts[item.KnowledgeItem_id] = (itemCounts[item.KnowledgeItem_id] || 0) + 1;
      });
    });
  
    const matchingItemIds = Object.entries(itemCounts)
      .filter(([_, count]) => count === tagList.length)
      .map(([id]) => parseInt(id));
  
    const items = await KnowledgeItem.findAll({
      where: { KnowledgeItem_id: matchingItemIds },
      include: Tag,
      distinct: true
    });
  
    return items;
  };
  
}



module.exports = KnowledgeService;
