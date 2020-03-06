//const { Router } = require("express");
//const CadastrosController = require("./src/app/controller/CadastrosController");
import { Router } from "express";
import CadastrosController from "./src/app/controller/CadastrosController";

const routes = new Router();

routes.get("/cadastros", CadastrosController.store);

export default routes;
