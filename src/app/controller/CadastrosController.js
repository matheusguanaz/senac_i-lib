/****************************************
Rota para cadastrar Usuários:

Campos obrigatórios:
Nome:
CPF:
email:
Senha:
Tipo: (aluno | funcionario | adm)

*****************************************/
class CadastrosController {
  async store(req, res) {
    return res.json({ status: "ok" });
  }
}

export default new CadastrosController();
