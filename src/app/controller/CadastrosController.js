import * as Yup from "yup";

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
      return res.status(400).json({ error: "Validation fails" });
    }

    return res.json(req.body);
  }
}

export default new CadastrosController();
