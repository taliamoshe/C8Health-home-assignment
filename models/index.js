const { Sequelize } = require('sequelize');
const sequelize = require('../config/SQLiteHandler');

const KnowledgeItem = require('./KnowledgeItem');
const Tag = require('./Tag');
const VersionHistory = require('./VersionHistory'); 


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
  VersionHistory,
  sequelize
};
