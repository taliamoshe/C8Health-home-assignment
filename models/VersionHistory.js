const { DataTypes } = require('sequelize');
const sequelize = require('../config/SQLiteHandler');

const VersionHistory = sequelize.define('VersionHistory', {
  KnowledgeItem_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    references: {
      model: 'KnowledgeItems',
      key: 'KnowledgeItem_id'
    }
  },
  title: { type: DataTypes.STRING, allowNull: false },
  subtitle: { type: DataTypes.STRING, allowNull: false },
  vettedDate: { type: DataTypes.DATE, allowNull: false },
  content: { type: DataTypes.STRING, allowNull: false },
  tags: { type: DataTypes.JSON, allowNull: true },
  updatedAt: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW }
});

module.exports = VersionHistory;
