//const { Router } = require("express");
//const CadastrosController = require("./src/app/controller/CadastrosController");
import { Router } from "express";
import CadastrosController from "./src/app/controller/CadastrosController";
import ISBNController from "./src/app/controller/ISBNController";

const routes = new Router();

//Rotas para o Controlador CadastrosController
routes.get("/cadastros", CadastrosController.index);
routes.get("/cadastros/:id", CadastrosController.show);
routes.post("/cadastros", CadastrosController.store);
routes.put("/cadastros/:id", CadastrosController.update);
routes.delete("/cadastros/:id", CadastrosController.delete);

//Rotas para o Controlador ISBNController
routes.post("/isbn", ISBNController.store);

export default routes;
