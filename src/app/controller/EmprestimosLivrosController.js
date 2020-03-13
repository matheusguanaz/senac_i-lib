import * as Yup from "yup";
import EmprestimosLivros from "../models/EmprestimosLivros";
import { startOfHour, parseISO, isBefore, format } from "date-fns";
import pt from "date-fns/locale/pt";

import { Op } from "sequelize";

/****************************************
Rota para cadastrar Emprestimos de Livros

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

class EmprestimosLivrosController {
  diasE = 7;

  async index(req, res) {
    /**********************************
     * Mostrar todos os emprestimos
     * *******************************/
    const resultado = await EmprestimosLivros.findAll({
      attributes: ["id", "id_usuario", "id_livro", "estado", "vencimento"]
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
    let validacao = await EmprestimosLivros.findByPk(id);

    if (validacao == null) {
      return res.status(400).json({ error: "Id de Emprestimo não existe" });
    }
    /**********************************
     * Mostrar emprestimo
     * *******************************/
    const { id_usuario, id_livro, estado, vencimento } = validacao;
    return res.json({ id, id_usuario, id_livro, estado, vencimento });
  } // fim do método show

  async store(req, res) {
    var diasEmprestimo = 7;
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

    /**********************************
     * Gravar dados no Banco
     * *******************************/

    const diaAgora = new Date();
    const dia = diaAgora.getDay();
    const mes = diaAgora.getMonth();
    const ano = diaAgora.getFullYear();

    console.log(`Hoje é dia ${dia}/${mes}/${ano}`);

    const {
      id_usuario,
      id_livro,
      estado,
      vencimento
    } = await EmprestimosLivros.create({
      id_usuario: req.body.id_usuario,
      id_livro: req.body.id_livro,
      estado: 1,
      vencimento: `${dia + diasEmprestimo}/${mes}/${ano}`
    });
    return res.json({ id_usuario, id_livro, estado, vencimento });
  } // fim do método store

  async update(req, res) {
    return res.json({ status: "Em desenvolvimento." });
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
    let emprestimoExistente = await EmprestimosLivros.findByPk(id);

    if (emprestimoExistente == null) {
      return res.status(400).json({ error: "Id de emprestimo não existe" });
    }

    /**********************************
     * Remove o usuário
     * *******************************/
    const respostaRemoção = await emprestimoExistente.destroy();
    return res.json({ "Emprestimo removido": id });
  } // fim do método udpate
}

export default new EmprestimosLivrosController();
