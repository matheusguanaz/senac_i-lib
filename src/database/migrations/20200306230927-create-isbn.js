"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("isbn", {
      isbn: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true
      },
      nome_livro: {
        type: Sequelize.STRING,
        allowNull: false
      },
      autor: {
        type: Sequelize.STRING,
        allowNull: false
      },
      editora: {
        type: Sequelize.STRING,
        allowNull: false
      },
      idioma: {
        type: Sequelize.STRING,
        allowNull: false
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false
      }
    });
  },
  
  down: queryInterface => {
    return queryInterface.dropTable("isbn");
  }
};
