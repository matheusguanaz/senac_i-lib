//const { Router } = require("express");
//const CadastrosController = require("./src/app/controller/CadastrosController");
import { Router } from "express";
import CadastrosController from "./src/app/controller/CadastrosController";
import ISBNController from "./src/app/controller/ISBNController";
import SessionController from "./src/app/controller/SessionController";
import LivrosController from "./src/app/controller/LivrosController";
import EmprestimosLivrosController from "./src/app/controller/EmprestimosLivrosController";
import SalasController from "./src/app/controller/SalasController";
import EmprestimosSalasController from "./src/app/controller/EmprestimosSalasController";
import ReservaLivrosController from "./src/app/controller/ReservaLivrosController";
import ReservaSalasController from "./src/app/controller/ReservaSalasController";
import SuspensoesController from "./src/app/controller/SuspensoesController";

//Importação do Middleware para validação de Autenticação JWT
import authMiddlware from "./src/app/middlewares/auth";
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

//Rotas para o Controlador SalasController
routes.get("/salas", authMiddlware, SalasController.index);
routes.get("/salas/:id", authMiddlware, SalasController.show);
routes.post("/salas", authMiddlware, SalasController.store);
routes.put("/salas/:id", authMiddlware, SalasController.update);
routes.delete("/salas/:id", authMiddlware, SalasController.delete);

//Rotas para o Controlador LivrosController
routes.get("/livros", authMiddlware, LivrosController.index);
routes.get("/livros/:id", authMiddlware, LivrosController.show);
routes.post("/livros", authMiddlware, LivrosController.store);
routes.put("/livros/:id", authMiddlware, LivrosController.update);
routes.delete("/livros/:id", authMiddlware, LivrosController.delete);

//Rotas para o Controlador EmprestimosLivrosController
routes.get("/emprestimos/livros", authMiddlware, EmprestimosLivrosController.index);
routes.get("/emprestimos/livros/:id", authMiddlware, EmprestimosLivrosController.show);
routes.post("/emprestimos/livros", authMiddlware, EmprestimosLivrosController.store);
routes.put("/emprestimos/livros/:id",authMiddlware,EmprestimosLivrosController.update);
routes.delete("/emprestimos/livros/:id",authMiddlware,EmprestimosLivrosController.delete);

//Rotas para o Controlador EmprestimosSalasController
routes.get("/emprestimos/salas/", authMiddlware, EmprestimosSalasController.index);
routes.get("/emprestimos/salas/:id", authMiddlware, EmprestimosSalasController.show);
routes.post("/emprestimos/salas/", authMiddlware, EmprestimosSalasController.store);
routes.put("/emprestimos/salas/:id",authMiddlware,EmprestimosSalasController.update);
routes.delete("/emprestimos/salas/:id",authMiddlware,EmprestimosSalasController.delete);

//Rotas para o Controlador EmprestimosLivrosController
routes.get("/reservas/livros", authMiddlware, ReservaLivrosController.index);
routes.get("/reservas/livros/:id", authMiddlware, ReservaLivrosController.show);
routes.post("/reservas/livros", authMiddlware, ReservaLivrosController.store);
routes.put("/reservas/livros/:id",authMiddlware,ReservaLivrosController.update);
routes.delete("/reservas/livros/:id",authMiddlware,ReservaLivrosController.delete)

//Rotas para o Controlador ReservaSalasController
routes.get("/reservas/salas/", authMiddlware, ReservaSalasController.index);
routes.get("/reservas/salas/:id", authMiddlware, ReservaSalasController.show);
routes.post("/reservas/salas/", authMiddlware, ReservaSalasController.store);
routes.put("/reservas/salas/:id",authMiddlware,ReservaSalasController.update);
routes.delete("/reservas/salas/:id",authMiddlware,ReservaSalasController.delete);

//Rotas para o Controlador SuspensoesController
routes.get("/suspensoes/", authMiddlware, SuspensoesController.index);
routes.get("/suspensoes/:id", authMiddlware, SuspensoesController.show);
routes.post("/suspensoes/", authMiddlware, SuspensoesController.store);
routes.put("/suspensoes/:id",authMiddlware,SuspensoesController.update);
routes.delete("/suspensoes/:id",authMiddlware,SuspensoesController.delete);


//Rotas para o Controlador Sessão
routes.post("/sessao", SessionController.show);

export default routes;
