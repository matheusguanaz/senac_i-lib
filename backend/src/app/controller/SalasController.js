import * as Yup from "yup";
import Salas from "../models/Salas";

/****************************************
Rota para cadastrar Livros:

Campos obrigatórios:
id
numero
localizacao

Opcionais:
descricao
estado: (0 = indisponível | 1 = disponível| 2 = emprestado | 3 = reservado | 4 = não pode ser empretado ) 


*****************************************/
class SalasController {
  async index(req, res) {
    /**********************************
     * Mostrar todos os livros cadastrados
     * *******************************/
    const resultado = await Salas.findAll({
      attributes: ["id", "numero", "localizacao", "descricao", "estado"]
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
    let validacao = await Salas.findOne({ where: { id } }).catch(err => {
      return res.status(400).json({ erro: err.name });
    });

    if (validacao == null) {
      return res.status(400).json({ error: "ID da Sala não existe" });
    }
    /**********************************
     * Mostrar Sala
     *id
     *numero
     *localizacao
     *descricao
     *estado
     *********************************/
    const { numero, localizacao, descricao, estado } = validacao;
    return res.json({ id, numero, localizacao, descricao, estado });
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
      id: Yup.number().required(),
      numero: Yup.number().required(),
      localizacao: Yup.string().required()
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: "Falha no formato" });
    }

    const { id, localizacao, numero, descricao } = req.body;

    let validacao = await Salas.findAll({
      where: {
        id
      }
    }).catch(err => {
      return res.status(400).json({ erro: err.name });
    });

    if (!(validacao == false)) {
      return res.status(400).json({ error: "Sala já existente" });
    }

    let resposta = await Salas.create({
      id,
      numero,
      localizacao,
      descricao,
      estado: 0
    }).catch(err => {
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
     * Verificar se o Código da Sala existe
     * *******************************/
    let salaExistente = await Salas.findOne({
      where: { id: req.params.id }
    }).catch(err => {
      return res.status(400).json({ erro: err.name });
    });

    if (salaExistente == null) {
      return res.status(400).json({ error: "Código da Sala não existe" });
    }

    /****************************************************************
     * Garantir que o Código da Sala seja unico
     * *************************************************************/

    if (req.body.id) {
      let validacao = await Salas.findOne({
        where: { id: req.body.id }
      }).catch(err => {
        return res.status(400).json({ erro: err.name });
      });
      if (!(validacao == null)) {
        return res.status(400).json({ error: "Código da sala já existe" });
      }
    }

    /**********************************
     * Update da Sala
     * *******************************/

    const { id, numero, localizacao, descricao, estado } = req.body;
    let response = await Salas.update(req.body, {
      returning: true,
      where: { id: req.params.id }
    }).catch(err => {
      return res.status(400).json({ erro: err.name });
    });

    return res.json({ id, numero, localizacao, descricao, estado });
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
    let salaExistente = await Salas.findOne({ where: { id } }).catch(err => {
      return res.status(400).json({ erro: err.name });
    });

    if (salaExistente == null) {
      return res.status(400).json({ error: "Código da sala não existe" });
    }

    /**********************************
     * Remove o usuário
     * *******************************/
    const respostaRemoção = await salaExistente.destroy().catch(err => {
      return res.status(400).json({ erro: err.name });
    });
    return res.json({ "Sala removida": id });
  } //fim do método delete
}

export default new SalasController();
