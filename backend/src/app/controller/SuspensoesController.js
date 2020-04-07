import * as Yup from "yup";
import Suspensoes from "../models/Suspensoes";
import { startOfHour, parseISO, isBefore, format } from "date-fns";
import pt from "date-fns/locale/pt";
import regras from "../../app/regrasNegocio/regrasNegocios";

import { Op } from "sequelize";

/****************************************
Rota para cadastrar Suspensões

Campos obrigatórios:
id_usuario:
vencimento:
tipo: (1 | 2) onde 1 = ativo, 2 = finalizado

*****************************************/
//index
//show
//store
//update
//delete

class SuspensoesController {
  async index(req, res) {
    /**********************************
     * Mostrar todos as suspensoes
     * *******************************/
    const resultado = await Suspensoes.findAll({
      attributes: ["id", "id_usuario", "estado", "vencimento"]
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
    let validacao = await Suspensoes.findByPk(id).catch(err => {
      return res.status(400).json({ erro: err.name });
    });

    if (validacao == null) {
      return res.status(400).json({ error: "Id de suspensoes não existe" });
    }
    /**********************************
     * Mostrar suspensoes
     * *******************************/
    const { id_usuario, estado, vencimento } = validacao;
    return res.json({ id, id_usuario, estado, vencimento });
  } // fim do método show

  async store(req, res) {
    /**********************************
     * Validação de entrada
     * *******************************/
    const schema = Yup.object().shape({
      id_usuario: Yup.number().required()
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: "Falha no formato" });
    }

    const diaAgora = new Date();
    const dia = diaAgora.getDate();
    const mes = diaAgora.getMonth() + 1;
    const ano = diaAgora.getFullYear();
    const { id_usuario, estado, vencimento } = await Suspensoes.create({
      id: req.body.id,
      id_usuario: req.body.id_usuario,
      estado: 1,
      vencimento: `${mes}/${dia + regras.diasSuspensao.alunos}/${ano}`
    }).catch(err => {
      return res.status(400).json({ erro: err.name });
    });
    return res.json({ id_usuario, estado, vencimento });
  } // fim do método store

  async update(req, res) {
    /**********************************
     * Verificar se o Id existe
     * *******************************/
    const { id } = req.params;
    let suspensoesExistente = await Suspensoes.findByPk(id).catch(err => {
      return res.status(400).json({ erro: err.name });
    });

    if (suspensoesExistente == null) {
      return res.status(400).json({ error: "Id de suspensão não existe" });
    }

    /**********************************
     * Edita suspensoes
     * *******************************/
    const { id_usuario, estado, vencimento } = req.body;
    let response = await Suspensoes.update(req.body, {
      returning: true,
      where: { id }
    }).catch(err => {
      return res.status(400).json({ erro: err.name });
    });

    return res.json({ id_usuario, estado, vencimento });
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
    let suspensoesExistente = await Suspensoes.findByPk(id).catch(err => {
      return res.status(400).json({ erro: err.name });
    });

    if (suspensoesExistente == null) {
      return res.status(400).json({ error: "Id de suspensão não existe" });
    }

    /**********************************
     * Remove a suspensoes
     * *******************************/
    const respostaRemoção = await suspensoesExistente.destroy().catch(err => {
      return res.status(400).json({ erro: err.name });
    });
    return res.json({ "Suspensão removida": id });
  } // fim do método udpate
}

export default new SuspensoesController();
