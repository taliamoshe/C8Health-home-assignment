const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite', 
  logging: false, 
  dialectOptions: {
    busyTimeout: 3000 // שווה ערך ל־PRAGMA busy_timeout
  },
  retry: {
    match: [/SQLITE_BUSY/], // במידה ונעול
    max: 5                  // נסה עד 5 פעמים
  }
});
 
sequelize
.query("PRAGMA busy_timeout = 3000")
.catch(err => console.error("❌ Failed to set PRAGMA busy_timeout:", err));

module.exports = sequelize; 
