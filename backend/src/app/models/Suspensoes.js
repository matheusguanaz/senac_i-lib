import Sequelize, { Model } from "sequelize";

class suspensoes extends Model {
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
  }
}

export default suspensoes;
