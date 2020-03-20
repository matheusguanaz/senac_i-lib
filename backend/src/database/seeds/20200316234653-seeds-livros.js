"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "livros",
      [
        {
          id: "SENAC_1001",
          id_isbn: "978-8521207450",
          estado: 1,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          id: "SENAC_1002",
          id_isbn: "978-8521207450",
          estado: 1,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          id: "SENAC_1003",
          id_isbn: "978-8521207450",
          estado: 1,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          id: "SENAC_1004",
          id_isbn: "978-8521207450",
          estado: 1,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          id: "SENAC_1005",
          id_isbn: "978-8521207450",
          estado: 1,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          id: "SENAC_1006",
          id_isbn: "978-8580556193",
          estado: 1,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          id: "SENAC_1007",
          id_isbn: "978-8580556193",
          estado: 1,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          id: "SENAC_1008",
          id_isbn: "978-8580556193",
          estado: 1,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          id: "SENAC_1009",
          id_isbn: "0060763280",
          estado: 1,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          id: "SENAC_1010",
          id_isbn: "978-8522112593",
          estado: 1,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          id: "SENAC_1011",
          id_isbn: "978-8522112593",
          estado: 1,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          id: "SENAC_1012",
          id_isbn: "978-8522112593",
          estado: 1,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          id: "SENAC_1013",
          id_isbn: "978-8522112593",
          estado: 1,
          created_at: new Date(),
          updated_at: new Date()
        }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("livros", null, {});
  }
};
