import { Sequelize } from "sequelize";
import Isbn from "../app/models/Isbn";
import User from "../app/models/User";
import Books from "../app/models/Books";

import databaseConfig from "../configs/databaseConfig";

const models = [Isbn, User, Books];

class Database {
  constructor() {
    this.init();
  }
  init() {
    this.connection = new Sequelize(databaseConfig);
    models.map(model => model.init(this.connection));
  }
}

export default new Database();
