import Sequelize, { Model } from "sequelize";

class livros extends Model {
  static init(sequelize) {
    super.init(
      {
        estado: Sequelize.STRING
      },
      {
        freezeTableName: true,
        sequelize
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.isbn, { foreignKey: "id_isbn", as: "isbn" });
  }
}

export default livros;
