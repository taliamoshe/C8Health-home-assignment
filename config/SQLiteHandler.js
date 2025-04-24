const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite', 
  logging: false, 
  dialectOptions: {
    busyTimeout: 3000 
  },
  retry: {
    match: [/SQLITE_BUSY/],
    max: 5                 
  }
});
 
sequelize
.query("PRAGMA busy_timeout = 3000")
.catch(err => console.error("Failed to set PRAGMA busy_timeout:", err));

module.exports = sequelize; 
