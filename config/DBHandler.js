class DBHandler {
    constructor(sequelize) {
      this.sequelize = sequelize;
    }
  
    async connect() {
      try {
        await this.sequelize.authenticate();
        console.log('Connection has been established successfully.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
    }
  }
  
  module.exports = DBHandler;
  