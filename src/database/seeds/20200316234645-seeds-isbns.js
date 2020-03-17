"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "isbn",
      [
        {
          isbn: "978-8521207450",
          nome_livro: "Curso de Física Básica - Volume 1",
          autor: "Nussenzveig",
          editora: "Edgard Blucher; Ciencias Exatas edition (1969)",
          idioma: "Português",
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          isbn: "978-8580556193",
          nome_livro: "Mecânica Vetorial para Engenheiros: Estática",
          autor: "Ferdinand P. Beer",
          editora: "AMGH (2019)",
          idioma: "Português",
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          isbn: "0060763280",
          nome_livro: "SECRETS MILLIONAIRE MIND",
          autor: "T. Harve Eker",
          editora: "HarperCollins e-books",
          idioma: "Inglês",
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          isbn: "978-8522112593",
          nome_livro: "Cálculo - Volume 2",
          autor: "James Stewart ",
          editora: "Cengage; E  dição: 7ª",
          idioma: "Português",
          created_at: new Date(),
          updated_at: new Date()
        }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("isbn", null, {});
  }
};
