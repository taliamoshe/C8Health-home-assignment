const { Sequelize } = require('sequelize');
const KnowledgeItemModel = require('./KnowledgeItem');
const TagModel = require('./Tag');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './hometask.db',
  logging: false
});

const KnowledgeItem = KnowledgeItemModel(sequelize);
const Tag = TagModel(sequelize);

//many-to-many connection between the tables: KnowledgeItem and Tag
KnowledgeItem.belongsToMany(Tag, {
  through: 'KnowledgeItemTags',
  foreignKey: 'KnowledgeItem_id',
  otherKey: 'tag_id'
});

Tag.belongsToMany(KnowledgeItem, {
  through: 'KnowledgeItemTags',
  foreignKey: 'tag_id',
  otherKey: 'KnowledgeItem_id'
});

module.exports = {
  KnowledgeItem,
  Tag,
  sequelize
};
