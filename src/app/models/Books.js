import Sequelize, { Model } from "sequelize";

class Books extends Model {
  static init(sequelize) {
    super.init(
      {
        id_livro: Sequelize.NUMBER,
        estado: Sequelize.STRING
      },
      {
        sequelize
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.isbn, { foreignKey: "isbn_id", as: "isbn" });
  }
}

export default Books;
