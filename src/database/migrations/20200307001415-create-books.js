"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("livros", {
      id: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true
      },
      estado: {
        type: Sequelize.STRING,
        allowNull: false
      },
      id_isbn: {
        type: Sequelize.STRING,
        references: { model: "isbn", key: "isbn" },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
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
    return queryInterface.dropTable("livros");
  }
};
