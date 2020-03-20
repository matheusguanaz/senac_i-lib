import * as Yup from "yup";
import Books from "../models/Livros";

/****************************************
Rota para cadastrar Livros:

Campos obrigatórios:
id-livro

isbn:

Opcionais:
estado: (0 = indisponível | 1 = disponível| 2 = emprestado | 3 = reservado | 4 = não pode ser empretado ) 

*****************************************/
class LivrosController {
  async index(req, res) {
    /**********************************
     * Mostrar todos os livros cadastrados
     * *******************************/
    const resultado = await Books.findAll({
      attributes: ["id", "id_isbn", "estado"]
    }).catch(err => {
      return res.status(400).json({ erro: err.name });
    });

    return res.json(resultado);
  } //fim do método index

  async show(req, res) {
    /**********************************
     * Validação de entrada
     * *******************************/
    const schema = Yup.object().shape({
      id: Yup.string().required()
    });

    if (!(await schema.isValid(req.params))) {
      return res.status(400).json({ error: "Falha no formato" });
    }

    /**********************************
     * Verificar se o Id existe
     * *******************************/
    const { id } = req.params;
    let validacao = await Books.findOne({ where: { id } }).catch(err => {
      return res.status(400).json({ erro: err.name });
    });

    if (validacao == null) {
      return res.status(400).json({ error: "ID do Livro não existe" });
    }
    /**********************************
     * Mostrar ISBN
     * id,
     * isbn,
     * estado,
     *********************************/
    const { id_isbn, estado } = validacao;
    return res.json({ id, id_isbn, estado });
  } //fim do método show

  async store(req, res) {
    //Apenas permite operação de usuários administradores
    if (res.tipo != "3") {
      return res.status(400).json({ erro: "Usuário deve ser administrador!" });
    }
    /**********************************
     * Validação de entrada
     * *******************************/

    const schema = Yup.object().shape({
      id: Yup.string().required(),
      id_isbn: Yup.string().required()
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: "Falha no formato" });
    }

    const { id, id_isbn } = req.body;

    let validacao = await Books.findAll({
      where: {
        id
      }
    }).catch(err => {
      return res.status(400).json({ erro: err.name });
    });

    if (!(validacao == false)) {
      return res.status(400).json({ error: "Livro já existente" });
    }

    let resposta = await Books.create({ id, id_isbn, estado: 1 }).catch(err => {
      return res.status(400).json({ erro: err.name });
    });
    return res.json(resposta);
  } //fim do método store

  async update(req, res) {
    //Apenas permite operação de usuários administradores
    if (res.tipo != "3") {
      return res.status(400).json({ erro: "Usuário deve ser administrador!" });
    }
    /**********************************
     * Verificar se o Código do Livro existe
     * *******************************/
    let livroExistente = await Books.findOne({
      where: { id: req.params.id }
    }).catch(err => {
      return res.status(400).json({ erro: err.name });
    });

    if (livroExistente == null) {
      return res.status(400).json({ error: "Código do Livro não existe" });
    }

    /****************************************************************
     * Garantir que o Código do Livro seja unico
     * *************************************************************/

    if (req.body.id) {
      let validacao = await Books.findOne({
        where: { id: req.body.id }
      }).catch(err => {
        return res.status(400).json({ erro: err.name });
      });
      if (!(validacao == null)) {
        return res.status(400).json({ error: "Código do livro já existe" });
      }
    }

    /**********************************
     * Update do Livro
     * *******************************/

    const { id, estado, id_isbn } = req.body;
    let response = await Books.update(req.body, {
      returning: true,
      where: { id: req.params.id }
    }).catch(err => {
      return res.status(400).json({ erro: err.name });
    });

    return res.json({
      id_isbn,
      id,
      estado
    });
  } //fim do método update

  async delete(req, res) {
    //Apenas permite operação de usuários administradores
    if (res.tipo != "3") {
      return res.status(400).json({ erro: "Usuário deve ser administrador!" });
    }
    /**********************************
     * Validação de entrada
     * *******************************/
    const schema = Yup.object().shape({
      id: Yup.string().required()
    });

    if (!(await schema.isValid(req.params))) {
      return res.status(400).json({ error: "Falha no formato" });
    }
    /**********************************
     * Verificar se o Id existe
     * *******************************/
    const { id } = req.params;
    let livroExistente = await Books.findOne({ where: { id } }).catch(err => {
      return res.status(400).json({ erro: err.name });
    });

    if (livroExistente == null) {
      return res.status(400).json({ error: "Código do livro não existe" });
    }

    /**********************************
     * Remove o usuário
     * *******************************/
    const respostaRemoção = await livroExistente.destroy().catch(err => {
      return res.status(400).json({ erro: err.name });
    });
    return res.json({ "Livro removido": id });
  } //fim do método delete
}

export default new LivrosController();
