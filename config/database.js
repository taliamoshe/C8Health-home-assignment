const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite',
  logging: false,
  dialectOptions: {
    busyTimeout: 30000
  }
});

module.exports = sequelize;