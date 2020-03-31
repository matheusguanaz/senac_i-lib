import React from "react";
import "./App.css";
import logo from "../src/static/logoILib.png";

function App() {
  return (
    <div className="App">
      <h1>Página de Administração</h1>
      <img src={logo} alt="logo" />`
      <p>Faça empréstimos de livros e reserve salas de maneira descomplicada</p>
      <p>Usuário</p>
      <input type="text" id="loginUsuario"></input>
      <p>Senha</p>
      <input type="text" id="loginSenha"></input>
      <input type="button" id="loginBotao" value="Acessar"></input>
      <a href="#">Esqueci minha senha</a>
      <a href="#">Não sou cadastrado</a>
    </div>
  );
}

export default App;
