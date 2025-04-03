const { KnowledgeItem, Tag } = require('../models');
const { Op } = require('sequelize');

/* 
    include: Tag
    responsible to attach the relevent tags by the primary key, does that thanks to the many-to-many connection
*/ 
class KnowledgeService {

  async create(data) {
    const { tags, ...itemData } = data; // keeps the input of the user seperates to the itemData and the tags
    const item = await KnowledgeItem.create(itemData); // creates the item without tags

    const tagInstances = await Promise.all( //only after all tags are done we continue
      tags.map(async (tagText) => {
        const [tag] = await Tag.findOrCreate({ where: { tag: tagText } }); // attaching existing/new tags
        return tag;
      })
    );

    await item.setTags(tagInstances); 
    return item;
  }

  async getAll() {
    return await KnowledgeItem.findAll({ include: Tag });
  }


  async update(id, data) { //BY ID
    const { tags, ...itemData } = data;
    const item = await KnowledgeItem.findOne({ where: { KnowledgeItem_id: id } });
    if (!item) return null; //there is no item with this ID, nothing to update... // we can create anyway if requested!

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

  async delete(id) {
    const item = await KnowledgeItem.findOne({ where: { KnowledgeItem_id: id } });
    if (!item) return null; // there is no item with this ID , nothing to delete

    await item.destroy();
    return item;
  }

  async getById(id) {
    return await KnowledgeItem.findOne({
      where: { KnowledgeItem_id: id },
      include: Tag
    });
  }

  async findByTag(tagText) {
    const tag = await Tag.findOne({
      where: { tag: tagText },
      include: KnowledgeItem  // returns all the knowledge items relates to the given tag
    });

    return tag ? tag.KnowledgeItems : [];
  }


  async findByTitle(text) {
    return await KnowledgeItem.findAll({
      where: {
        content: { [Op.like]: `%${text}%` } // LIKE ׂׂׂ(SQL)
      },
      include: Tag
    });
  }

  async findBySubtitle(text) {
    return await KnowledgeItem.findAll({
      where: {
        subtitle: { [Op.like]: `%${text}%` } // LIKE ׂׂׂ(SQL)
      },
      include: Tag
    });
  }
}

module.exports = KnowledgeService;
