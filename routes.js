//const { Router } = require("express");
//const CadastrosController = require("./src/app/controller/CadastrosController");
import { Router } from "express";
import CadastrosController from "./src/app/controller/CadastrosController";
import ISBNController from "./src/app/controller/ISBNController";

const routes = new Router();

routes.post("/cadastros", CadastrosController.store);
routes.post("/isbn", ISBNController.store);

export default routes;
