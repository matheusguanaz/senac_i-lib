import * as Yup from "yup";
import Books from "../models/Books";

/****************************************
Rota para cadastrar Livros:

Campos obrigatórios:
id-livro

isbn:

Opcionais:
estado:

*****************************************/
class LivrosController {
  async index(req, res) {
    /**********************************
     * Mostrar todos os livros cadastrados
     * *******************************/
    const resultado = await Books.findAll({
      attributes: ["id_livro", "isbn_id", "estado"]
    });

    return res.json(resultado);
  } //fim do método index

  async show(req, res) {
    // Retirar o atributo "id" dos inserts e queries
    Books.removeAttribute("id");

    /**********************************
     * Validação de entrada
     * *******************************/
    const schema = Yup.object().shape({
      id_livro: Yup.string().required()
    });

    if (!(await schema.isValid(req.params))) {
      return res.status(400).json({ error: "Falha no formato" });
    }

    /**********************************
     * Verificar se o Id existe
     * *******************************/
    const { id_livro } = req.params;
    let validacao = await Books.findOne({ where: { id_livro } });

    if (validacao == null) {
      return res.status(400).json({ error: "ID do Livro não existe" });
    }
    /**********************************
     * Mostrar ISBN
     * id_livro,
     * isbn,
     * estado,
     *********************************/
    const { isbn_id, estado } = validacao;
    return res.json({ id_livro, isbn_id, estado });
  } //fim do método show

  async store(req, res) {
    // Retirar o atributo "id" dos inserts e queries
    Books.removeAttribute("id");

    /**********************************
     * Validação de entrada
     * *******************************/

    const schema = Yup.object().shape({
      id_livro: Yup.string().required(),
      isbn_id: Yup.string().required()
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: "Falha no formato" });
    }

    const { id_livro, isbn_id } = req.body;

    let validacao = await Books.findAll({
      where: {
        id_livro
      }
    });

    if (!(validacao == false)) {
      return res.status(400).json({ error: "Livro já existente" });
    }

    let resposta = await Books.create({ id_livro, isbn_id, estado: 0 });
    return res.json(resposta);
  } //fim do método store

  async update(req, res) {
    // Retirar o atributo "id" dos inserts e queries
    Books.removeAttribute("id");

    /**********************************
     * Verificar se o Código do Livro existe
     * *******************************/
    let livroExistente = await Books.findOne({
      where: { id_livro: req.params.id_livro }
    });

    if (livroExistente == null) {
      return res.status(400).json({ error: "Código do Livro não existe" });
    }

    /****************************************************************
     * Garantir que o Código do Livro seja unico
     * *************************************************************/

    if (req.body.id_livro) {
      let validacao = await Books.findOne({
        where: { id_livro: req.body.id_livro }
      });
      if (!(validacao == null)) {
        console.log("validacao: " + validacao);
        return res.status(400).json({ error: "Código do livro já existe" });
      }
    }

    /**********************************
     * Update do Livro
     * *******************************/

    const { id_livro, estado, isbn_id } = req.body;
    let response = await Books.update(req.body, {
      returning: true,
      where: { id_livro: req.params.id_livro }
    });

    return res.json({
      isbn_id,
      id_livro,
      estado
    });
  } //fim do método update

  async delete(req, res) {
    // Retirar o atributo "id" dos inserts e queries
    Books.removeAttribute("id");

    /**********************************
     * Validação de entrada
     * *******************************/
    const schema = Yup.object().shape({
      id_livro: Yup.string().required()
    });

    if (!(await schema.isValid(req.params))) {
      return res.status(400).json({ error: "Falha no formato" });
    }
    /**********************************
     * Verificar se o Id existe
     * *******************************/
    const { id_livro } = req.params;
    let livroExistente = await Books.findOne({ where: { id_livro } });

    if (livroExistente == null) {
      return res.status(400).json({ error: "Código do livro não existe" });
    }

    /**********************************
     * Remove o usuário
     * *******************************/
    const respostaRemoção = await livroExistente.destroy();
    return res.json({ "Livro removido": id_livro });
  } //fim do método delete
}

export default new LivrosController();
