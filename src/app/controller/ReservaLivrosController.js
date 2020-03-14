import * as Yup from "yup";
import ReservaLivros from "../models/ReservaLivros";
import { startOfHour, parseISO, isBefore, format } from "date-fns";
import pt from "date-fns/locale/pt";
import regras from "../../app/regrasNegocio/regrasNegocios";

import { Op } from "sequelize";

/****************************************
Rota para cadastrar Reserva de Livros

Campos obrigatórios:
id_usuario:
id_livro:
vencimento:
tipo: (1 | 2) onde 1 = ativo, 2 = finalizado

*****************************************/
//index
//show
//store
//update
//delete

class ReservaLivrosController {
  async index(req, res) {
    /**********************************
     * Mostrar todos as reservas
     * *******************************/
    const resultado = await ReservaLivros.findAll({
      attributes: ["id", "id_usuario", "id_livro", "estado", "vencimento"]
    }).catch(err => {
      return res.status(400).json({ erro: err.name });
    });

    return res.json(resultado);
  } // fim do método index

  async show(req, res) {
    /**********************************
     * Validação de entrada
     * *******************************/
    const schema = Yup.object().shape({
      id: Yup.number().required()
    });

    if (!(await schema.isValid(req.params))) {
      return res.status(400).json({ error: "Falha no formato" });
    }

    /**********************************
     * Verificar se o Id existe
     * *******************************/
    const { id } = req.params;
    let validacao = await ReservaLivros.findByPk(id).catch(err => {
      return res.status(400).json({ erro: err.name });
    });

    if (validacao == null) {
      return res.status(400).json({ error: "Id de reserva não existe" });
    }
    /**********************************
     * Mostrar reserva
     * *******************************/
    const { id_usuario, id_livro, estado, vencimento } = validacao;
    return res.json({ id, id_usuario, id_livro, estado, vencimento });
  } // fim do método show

  async store(req, res) {
    /**********************************
     * Validação de entrada
     * *******************************/
    const schema = Yup.object().shape({
      id_usuario: Yup.number().required(),
      id_livro: Yup.number().required()
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: "Falha no formato" });
    }

    /****************************************************************
     * Garantir que usuario possa pegar livros emprestados
     * *************************************************************/

    // Os métodos de verificação serão criados

    /**********************************
     * Gravar dados no Banco
     * *******************************/

    const diaAgora = new Date();
    const dia = diaAgora.getDate();
    const mes = diaAgora.getMonth() + 1;
    const ano = diaAgora.getFullYear();
    const {
      id_usuario,
      id_livro,
      estado,
      vencimento
    } = await ReservaLivros.create({
      id: req.body.id,
      id_usuario: req.body.id_usuario,
      id_livro: req.body.id_livro,
      estado: 1,
      vencimento: `${mes}/${dia + regras.diasEmprestimo.alunos}/${ano}`
    }).catch(err => {
      return res.status(400).json({ erro: err.name });
    });
    return res.json({ id_usuario, id_livro, estado, vencimento });
  } // fim do método store

  async update(req, res) {
    /**********************************
     * Verificar se o Id existe
     * *******************************/
    const { id } = req.params;
    let reservaExistente = await ReservaLivros.findByPk(id).catch(err => {
      return res.status(400).json({ erro: err.name });
    });

    if (reservaExistente == null) {
      return res.status(400).json({ error: "Id de reserva não existe" });
    }

    /**********************************
     * Edita reservas
     * *******************************/
    const { id_usuario, id_livro, estado, vencimento } = req.body;
    let response = await ReservaLivros.update(req.body, {
      returning: true,
      where: { id }
    }).catch(err => {
      return res.status(400).json({ erro: err.name });
    });

    return res.json({ id_usuario, id_livro, estado, vencimento });
  } // fim do método udpate

  async delete(req, res) {
    /**********************************
     * Validação de entrada
     * *******************************/
    const schema = Yup.object().shape({
      id: Yup.number().required()
    });

    if (!(await schema.isValid(req.params))) {
      return res.status(400).json({ error: "Falha no formato" });
    }
    /**********************************
     * Verificar se o Id existe
     * *******************************/
    const { id } = req.params;
    let reservaExistente = await ReservaLivros.findByPk(id).catch(err => {
      return res.status(400).json({ erro: err.name });
    });

    if (reservaExistente == null) {
      return res.status(400).json({ error: "Id de reserva não existe" });
    }

    /**********************************
     * Remove a reserva
     * *******************************/
    const respostaRemoção = await reservaExistente.destroy().catch(err => {
      return res.status(400).json({ erro: err.name });
    });
    return res.json({ "Reserva removida": id });
  } // fim do método udpate
}

export default new ReservaLivrosController();
