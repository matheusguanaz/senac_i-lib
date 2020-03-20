import Sequelize, { Model } from "sequelize";

class isbn extends Model {
  static init(sequelize) {
    super.init(
      {
        isbn: Sequelize.STRING,
        nome_livro: Sequelize.STRING,
        autor: Sequelize.STRING,
        editora: Sequelize.STRING,
        idioma: Sequelize.STRING,
      },
      {
        sequelize,
        freezeTableName: true
      }
    );

    return this;
  }
}

export default isbn;
