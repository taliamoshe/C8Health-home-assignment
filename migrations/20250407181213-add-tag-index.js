
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Tags', {
      tag_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      tag: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      }
    });

    await queryInterface.addIndex('Tags', ['tag'], {
      name: 'tag_index',
      unique: true 
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Tags');
  }
};
