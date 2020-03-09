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
routes.get("/isbn", ISBNController.index);
routes.get("/isbn/:isbn", ISBNController.show);
routes.post("/isbn", ISBNController.store);
routes.put("/isbn/:isbn", ISBNController.update);
routes.delete("/isbn/:isbn", ISBNController.delete);

export default routes;
