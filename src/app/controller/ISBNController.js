import * as Yup from "yup";
import Isbn from "../models/Isbn";

/****************************************
Rota para cadastrar Livros:

Campos obrigatórios:
nome_livro:
autor:
editora:
codigo:
idioma:
quantidade_livros:

*****************************************/
class LivrosController {
  async store(req, res) {
    Isbn.removeAttribute("id");
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
    });
    console.log(validacao);

    if (!(validacao == false)) {
      return res.status(400).json({ error: "Livro já existente" });
    }

    const { nome_livro, autor, editora } = await Isbn.create(req.body);
    return res.json({ nome_livro, autor, isbn, editora });
  }
}

export default new LivrosController();
