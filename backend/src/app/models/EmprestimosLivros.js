import Sequelize, { Model } from "sequelize";

class emprestimosLivros extends Model {
  static init(sequelize) {
    super.init(
      {
        estado: Sequelize.STRING,
        vencimento: Sequelize.DATE
      },
      {
        freezeTableName: true,
        sequelize
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.usuarios, { foreignKey: "id_usuario", as: "usuario" });
    this.belongsTo(models.livros, { foreignKey: "id_livro", as: "livros" });
  }
}

export default emprestimosLivros;
