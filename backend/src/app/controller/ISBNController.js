import * as Yup from "yup";
import Isbn from "../models/Isbn";

/****************************************
Rota para cadastrar ISBN:

Campos obrigatórios:
nome_livro:
autor:
editora:
codigo:
idioma:
*****************************************/
class ISBNController {
  async index(req, res) {
    // Retirar o atributo "id" dos inserts e queries
    Isbn.removeAttribute("id");

    /**********************************
     * Mostrar todos os usuarios
     * *******************************/
    const resultado = await Isbn.findAll({
      attributes: ["isbn", "nome_livro", "editora", "idioma"]
    })
      .catch(err => {
        return res.status(400).json({ erro: err.name });
      })
      .catch(err => {
        return res.status(400).json({ erro: err.name });
      });

    return res.json(resultado);
  } //fim do método index

  async show(req, res) {
    // Retirar o atributo "id" dos inserts e queries
    Isbn.removeAttribute("id");

    /**********************************
     * Validação de entrada
     * *******************************/
    const schema = Yup.object().shape({
      isbn: Yup.string().required()
    });

    if (!(await schema.isValid(req.params))) {
      return res.status(400).json({ error: "Falha no formato" });
    }

    /**********************************
     * Verificar se o Id existe
     * *******************************/
    const { isbn } = req.params;
    let validacao = await Isbn.findOne({ where: { isbn } }).catch(err => {
      return res.status(400).json({ erro: err.name });
    });

    if (validacao == null) {
      return res.status(400).json({ error: "ISBN não existe" });
    }
    /**********************************
     * Mostrar ISBN
     * isbn,
     * nome_livro,
     * autor,
     * editora,
     * idioma
     *********************************/
    const { nome_livro, autor, editora, idioma } = validacao;
    return res.json({ isbn, nome_livro, autor, editora, idioma });
  } //fim do método show

  async store(req, res) {
    //Apenas permite operação de usuários administradores
    if (res.tipo != "3") {
      return res.status(400).json({ erro: "Usuário deve ser administrador!" });
    }

    // Retirar o atributo "id" dos inserts e queries
    Isbn.removeAttribute("id");

    /**********************************
     * Validação de entrada
     * *******************************/
    const schema = Yup.object().shape({
      isbn: Yup.string().required(),
      nome_livro: Yup.string().required(),
      autor: Yup.string().required(),
      editora: Yup.string().required(),
      idioma: Yup.string().required()
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: "Falha no formato" });
    }

    const { isbn } = req.body;

    let validacao = await Isbn.findAll({
      where: {
        isbn
      }
    }).catch(err => {
      return res.status(400).json({ erro: err.name });
    });

    if (!(validacao == false)) {
      return res.status(400).json({ error: "Livro já existente" });
    }

    const { nome_livro, autor, editora } = await Isbn.create(req.body).catch(
      err => {
        return res.status(400).json({ erro: err.name });
      }
    );
    return res.json({ nome_livro, autor, isbn, editora });
  } //fim do método store

  async update(req, res) {
    //Apenas permite operação de usuários administradores
    if (res.tipo != "3") {
      return res.status(400).json({ erro: "Usuário deve ser administrador!" });
    }

    // Retirar o atributo "id" dos inserts e queries
    Isbn.removeAttribute("id");

    /**********************************
     * Verificar se o Isbn existe
     * *******************************/
    let userExistente = await Isbn.findOne({
      where: { isbn: req.params.isbn }
    }).catch(err => {
      return res.status(400).json({ erro: err.name });
    });

    if (userExistente == null) {
      return res.status(400).json({ error: "ISBN não existe" });
    }

    /****************************************************************
     * Garantir que o ISBN seja unico
     * *************************************************************/

    if (req.body.isbn) {
      let validacao = await Isbn.findOne({
        where: { isbn: req.body.isbn }
      }).catch(err => {
        return res.status(400).json({ erro: err.name });
      });
      if (!(validacao == null)) {
        console.log("validacao: " + validacao);
        return res.status(400).json({ error: "ISBN já existente" });
      }
    }

    /**********************************
     * Update do Livro
     * *******************************/

    const { nome_livro, autor, editora, idioma } = req.body;
    let response = await Isbn.update(req.body, {
      returning: true,
      where: { isbn: req.params.isbn }
    }).catch(err => {
      return res.status(400).json({ erro: err.name });
    });

    return res.json({
      isbn: req.body.isbn,
      nome_livro,
      autor,
      editora,
      idioma
    });
  } //fim do método update

  async delete(req, res) {
    //Apenas permite operação de usuários administradores
    if (res.tipo != "3") {
      return res.status(400).json({ erro: "Usuário deve ser administrador!" });
    }

    // Retirar o atributo "id" dos inserts e queries
    Isbn.removeAttribute("id");

    /**********************************
     * Validação de entrada
     * *******************************/
    const schema = Yup.object().shape({
      isbn: Yup.string().required()
    });

    if (!(await schema.isValid(req.params))) {
      return res.status(400).json({ error: "Falha no formato" });
    }
    /**********************************
     * Verificar se o Id existe
     * *******************************/
    const { isbn } = req.params;
    let userExistente = await Isbn.findOne({ where: { isbn } }).catch(err => {
      return res.status(400).json({ erro: err.name });
    });

    if (userExistente == null) {
      return res.status(400).json({ error: "ISBN não existe" });
    }

    /**********************************
     * Remove o usuário
     * *******************************/
    const respostaRemoção = await userExistente.destroy().catch(err => {
      return res.status(400).json({ erro: err.name });
    });
    return res.json({ "ISBN removido": isbn });
  } //fim do método delete
}

export default new ISBNController();
