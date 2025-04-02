const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

//Knowledge Item Table
const KnowledgeItem = sequelize.define('KnowledgeItem', {
    KnowledgeItem_id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true }, //PK
    subtitle: { type: DataTypes.STRING, allowNull: false },
    vettedDate: { type: DataTypes.DATE, allowNull: false },
    content: { type: DataTypes.STRING, allowNull: false }
  });
  

module.exports = KnowledgeItem;
