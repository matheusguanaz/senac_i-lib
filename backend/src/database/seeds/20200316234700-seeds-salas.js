"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "salas",
      [
        {
          id: 1001,
          numero: 20,
          localizacao: "Segundo Andar",
          descricao: "Sala de estudos em grupo",
          estado: 1,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          id: 1002,
          numero: 21,
          localizacao: "Segundo Andar",
          descricao: "Sala de estudos em grupo",
          estado: 1,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          id: 1003,
          numero: 23,
          localizacao: "Primeiro Andar",
          descricao: "Sala de estudos individual",
          estado: 1,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          id: 1004,
          numero: 24,
          localizacao: "Primeiro Andar",
          descricao: "Sala de estudos individual",
          estado: 1,
          created_at: new Date(),
          updated_at: new Date()
        }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("salas", null, {});
  }
};
