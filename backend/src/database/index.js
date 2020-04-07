import { Sequelize } from "sequelize";
import Isbn from "../app/models/Isbn";
import Usuarios from "../app/models/Usuarios";
import Livros from "../app/models/Livros";
import Salas from "../app/models/Salas";
import EmprestimosLivros from "../app/models/EmprestimosLivros";
import EmprestimosSalas from "../app/models/EmprestimosSalas";
import ReservaLivros from "../app/models/ReservaLivros";
import ReservaSalas from "../app/models/ReservaSalas";
import Suspensoes from "../app/models/Suspensoes";

import databaseConfig from "../configs/databaseConfig";

const models = [
  Isbn,
  Usuarios,
  Livros,
  Salas,
  EmprestimosLivros,
  EmprestimosSalas,
  ReservaLivros,
  ReservaSalas,
  Suspensoes
];

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
