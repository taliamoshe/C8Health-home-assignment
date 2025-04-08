'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addIndex('Tags', ['tag'], {
      name: 'tag_index',
      unique: true 
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeIndex('Tags', 'tag_index');
  }
};
