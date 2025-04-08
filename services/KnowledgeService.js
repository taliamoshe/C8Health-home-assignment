const { KnowledgeItem, Tag, VersionHistory } = require('../models');
const { Op } = require('sequelize');


class KnowledgeService {

  create = async (data) => {
    const { tags, ...itemData } = data; // keeps the input of the user separated into itemData and the tags
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
  }

  getAll = async () => {
    return await KnowledgeItem.findAll({ include: Tag });
  }


  update = async (id, data) => { //BY ID
    const { tags, ...itemData } = data;
    const item = await KnowledgeItem.findOne({ where: { KnowledgeItem_id: id } });
    if (!item) return null; //there is no item with this ID, nothing to update... // we can create anyway if requested!
    
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
  }

  delete = async (id) => {
    const item = await KnowledgeItem.findOne({ where: { KnowledgeItem_id: id } });
    if (!item) return null; // there is no item with this ID, nothing to delete

    await item.destroy();
    return item;
  }

  getById = async (id) => {
    return await KnowledgeItem.findOne({
      where: { KnowledgeItem_id: id },
      include: Tag
    });
  }

 findByTag = async (tagText) => {
    const tag = await Tag.findOne({
      where: { tag: tagText },
      include: KnowledgeItem  // returns all the knowledge items related to the given tag
    });

    return tag ? tag.KnowledgeItems : [];
  }


  findByTitle = async (text) => {
    return await KnowledgeItem.findAll({
      where: {
        title: { [Op.like]: `%${text}%` } // LIKE (SQL)
      },
      include: Tag
    });
  }

  findBySubtitle = async (text) => {
    return await KnowledgeItem.findAll({
      where: {
        subtitle: { [Op.like]: `%${text}%` } // LIKE (SQL)
      },
      include: Tag
    });
  }

  getVersion = async (id) => {
    return await VersionHistory.findOne({ where: { KnowledgeItem_id: id } });
  };

}



module.exports = KnowledgeService;
