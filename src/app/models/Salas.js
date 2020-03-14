import Sequelize, { Model } from "sequelize";

class salas extends Model {
  static init(sequelize) {
    super.init(
      {
        estado: Sequelize.STRING,
        numero: Sequelize.INTEGER,
        localizacao: Sequelize.STRING,
        descricao: Sequelize.STRING
      },
      {
        sequelize,
        freezeTableName: true
      }
    );

    return this;
  }
}

export default salas;
