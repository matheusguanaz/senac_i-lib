//const { Router } = require("express");
//const CadastrosController = require("./src/app/controller/CadastrosController");
import { Router } from "express";
import CadastrosController from "./src/app/controller/CadastrosController";
import ISBNController from "./src/app/controller/ISBNController";
import SessionController from "./src/app/controller/SessionController";
import LivrosController from "./src/app/controller/LivrosController";
import EmprestimosLivrosController from "./src/app/controller/EmprestimosLivrosController";

//Importação do Middleware para validação de Autenticação JWT
import authMiddlware from "./src/app/middlewares/authAdm";
const routes = new Router();

//Rotas para o Controlador CadastrosController
routes.get("/cadastros", CadastrosController.index);
routes.get("/cadastros/:id", CadastrosController.show);
routes.post("/cadastros", CadastrosController.store);
routes.put("/cadastros/:id", CadastrosController.update);
routes.delete("/cadastros/:id", CadastrosController.delete);

//Rotas para o Controlador ISBNController
routes.get("/isbn", authMiddlware, ISBNController.index);
routes.get("/isbn/:isbn", authMiddlware, ISBNController.show);
routes.post("/isbn", authMiddlware, ISBNController.store);
routes.put("/isbn/:isbn", authMiddlware, ISBNController.update);
routes.delete("/isbn/:isbn", authMiddlware, ISBNController.delete);

//Rotas para o Controlador LivrosController
routes.get("/livros", authMiddlware, LivrosController.index);
routes.get("/livros/:id", authMiddlware, LivrosController.show);
routes.post("/livros", authMiddlware, LivrosController.store);
routes.put("/livros/:id", authMiddlware, LivrosController.update);
routes.delete("/livros/:id", authMiddlware, LivrosController.delete);

//Rotas para o Controlador EmprestimosLivrosController
routes.get("/emprestimos", authMiddlware, EmprestimosLivrosController.index);
routes.get("/emprestimos", authMiddlware, EmprestimosLivrosController.index);
routes.post("/emprestimos", authMiddlware, EmprestimosLivrosController.store);
routes.put("/emprestimos/:id", authMiddlware, EmprestimosLivrosController.update);
routes.delete("/emprestimos/:id", authMiddlware, EmprestimosLivrosController.delete);

//Rotas para o Controlador Sessão
routes.get("/sessao", SessionController.show);

export default routes;
