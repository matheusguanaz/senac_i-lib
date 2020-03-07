import Sequelize, { Model } from "sequelize";

class Books extends Model {
  static init(sequelize) {
    super.init(
      {
        id_livro: Sequelize.STRING,
        estado: Sequelize.STRING
      },
      {
        sequelize
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Isbn, { foreignKey: "isbn", as: "isbn" });
  }
}

export default Books;
