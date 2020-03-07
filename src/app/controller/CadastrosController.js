import * as Yup from "yup";
import User from "../models/User";

/****************************************
Rota para cadastrar Usuários:

Campos obrigatórios:
nome:
cpf:
email:
senha:
tipo: (1 | 2 | 3) onde 1 = aluno, 2 = funcionário e 3 = administrador

*****************************************/
class CadastrosController {
  async store(req, res) {
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

    const { email } = req.body;

    let validacao = await User.findAll({
      where: {
        email
      }
    });
    console.log(validacao);

    if (!(validacao == false)) {
      return res.status(400).json({ error: "Email ou CPF já existente" });
    }

    const { id, nome, cpf } = await User.create(req.body);
    return res.json({ id, nome, cpf, email });
  }
  
}

export default new CadastrosController();
