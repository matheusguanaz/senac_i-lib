import * as Yup from "yup";
import User from "../models/User";
import { Op } from "sequelize";

/****************************************
Rota para cadastrar Usuários:

Campos obrigatórios:
nome:
cpf:
email:
senha:
tipo: (1 | 2 | 3) onde 1 = aluno, 2 = funcionário e 3 = administrador

*****************************************/
//index
//show
//store
//update
//delete

class CadastrosController {
  async index(req, res) {
    /**********************************
     * Mostrar todos os usuarios
     * *******************************/
    const resultado = await User.findAll({
      attributes: ["id", "nome", "cpf", "email"]
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
    let validacao = await User.findByPk(id);
    console.log(validacao);

    if (validacao == null) {
      return res.status(400).json({ error: "Usuário não existe" });
    }
    /**********************************
     * Mostrar usuario
     * *******************************/
    const { nome, cpf } = validacao;
    return res.json({ id, nome, cpf });
  } // fim do método show

  async store(req, res) {
    /**********************************
     * Validação de entrada
     * *******************************/
    const schema = Yup.object().shape({
      nome: Yup.string().required(),
      cpf: Yup.string().required(),
      email: Yup.string().required(),
      senha: Yup.string().required(),
      tipo: Yup.number().required()
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: "Falha no formato" });
    }

    /****************************************************************
     * Garantir que o email e CPF sejam unicos
     * *************************************************************/

    let validacao = await User.findAll({
      where: {
        [Op.or]: [{ email: req.body.email }, { cpf: req.body.cpf }]
      }
    });
    if (!(validacao == false)) {
      return res.status(400).json({ error: "Email ou CPF já existente" });
    }

    /**********************************
     * Gravar dados no Banco
     * *******************************/

    const { id, nome, cpf, email } = await User.create(req.body);
    return res.json({ id, nome, cpf, email });
  } // fim do método store

  async update(req, res) {} // fim do método udpate

  async delete(req, res) {} // fim do método udpate
}

export default new CadastrosController();
