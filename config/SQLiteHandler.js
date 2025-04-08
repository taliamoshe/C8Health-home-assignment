const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite', 
  logging: false, 
  dialectOptions: {
    busyTimeout: 3000000 // to avoid database locking issues in SQLite
  }
});

module.exports = sequelize; 
