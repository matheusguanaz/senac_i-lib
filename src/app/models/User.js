import Sequelize, { Model } from "sequelize";
import bcrypt from "bcryptjs";

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        nome: Sequelize.STRING,
        cpf: Sequelize.STRING,
        email: Sequelize.STRING,
        tipo: Sequelize.INTEGER,
        senha: Sequelize.VIRTUAL,
        senha_hash: Sequelize.STRING
      },
      {
        sequelize
      }
    );

    this.addHook("beforeSave", async user => {
      if (user.senha) {
        user.senha_hash = await bcrypt.hash(user.senha, 8);
      }
    });

    return this;
  }
}

export default User;
