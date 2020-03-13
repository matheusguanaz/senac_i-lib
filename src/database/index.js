import { Sequelize } from "sequelize";
import Isbn from "../app/models/Isbn";
import Usuarios from "../app/models/Usuarios";
import Livros from "../app/models/Livros";
import EmprestimosLivros from "../app/models/EmprestimosLivros";

import databaseConfig from "../configs/databaseConfig";

const models = [Isbn, Usuarios, Livros, EmprestimosLivros];

class Database {
  constructor() {
    this.init();
  }
  init() {
    this.connection = new Sequelize(databaseConfig);
    models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models));
  }
}

export default new Database();
