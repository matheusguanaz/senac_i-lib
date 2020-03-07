"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("books", {
      id_livro: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true
      },
      estado: {
        type: Sequelize.STRING,
        allowNull: false
      },
      isbn: {
        type: Sequelize.INTEGER,
        references: { model: "isbn", key: "isbn" },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
        allowNull: false
      }
    });
  },

  down: queryInterface => {
    return queryInterface.dropTable("books");
  }
};
