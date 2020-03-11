"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("emprestimosSalas", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      id_usuario: {
        type: Sequelize.INTEGER,
        references: { model: "usuarios", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
        allowNull: false
      },
      id_sala: {
        type: Sequelize.INTEGER,
        references: { model: "salas", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
        allowNull: false
      },
      estado: {
        type: Sequelize.STRING,
        allowNull: false
      },
      vencimento: {
        type: Sequelize.DATE,
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
    return queryInterface.dropTable("emprestimosSalas");
  }
};
