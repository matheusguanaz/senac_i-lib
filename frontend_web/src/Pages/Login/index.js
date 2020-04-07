import React, { Component } from "react";
import "./styles.css";
import logo from "../../../src/static/logoILib.png";
import api from "../../../src/services/api";

export default class Login extends Component {
  enviarCredenciais = async e => {
    e.preventDefault();

    var usuario = document.getElementById("loginUsuario").value;
    var senha = document.getElementById("loginSenha").value;

    const response = await api
      .post("/sessao", {
        email: usuario,
        senha: senha
      })
      .then(function(response) {
        console.log(response);
      })
      .catch(function(response) {
        console.log(response);
        document.getElementById("mensagemFalhaAutenticacao").innerText =
          "Usuário ou senha incorretos";
      });
  };

  handleChange = async e => {
    document.getElementById("mensagemFalhaAutenticacao").innerText = "";
  };

  render() {
    return (
      <div className="App">
        <div className="Container">
          <h1>Página de Administração</h1>
          <img src={logo} alt="logo" />`
          <p>
            Faça empréstimos de livros e reserve <br></br> salas de maneira
            descomplicada
          </p>
          <form>
            <input
              type="text"
              placeholder="Usuário"
              id="loginUsuario"
              onChange={this.handleChange}
            ></input>
            <input
              type="password"
              placeholder="Senha"
              id="loginSenha"
              onChange={this.handleChange}
            ></input>
            <div id="mensagemFalhaAutenticacao"></div>
            <input
              type="submit"
              id="loginBotao"
              value="Acessar"
              onClick={this.enviarCredenciais}
            ></input>

            <a href="#">Esqueci minha senha</a>
            <a href="#">Não sou cadastrado</a>
          </form>
        </div>
      </div>
    );
  }
}
