const { DataTypes } = require('sequelize');
const sequelize = require('../config/SQLiteHandler');

//Tag table
const Tag = sequelize.define('Tag', {
  tag_id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true }, //PK
  tag: { type: DataTypes.STRING, unique: true, allowNull: false } 
});

module.exports = Tag;