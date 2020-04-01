import React from "react";
import "./App.css";
import logo from "../src/static/logoILib.png";

function App() {
  return (
    <div className="App">
      <h1>Página de Administração</h1>
      <img src={logo} alt="logo" />`
      <p>
        Faça empréstimos de livros e reserve <br></br> salas de maneira
        descomplicada
      </p>
      <form>
        <input type="text" placeholder="Usuário" id="loginUsuario"></input>
        <input type="text" placeholder="Senha" id="loginSenha"></input>
        <input type="submit" id="loginBotao" value="Acessar"></input>
        <a href="#">Esqueci minha senha</a>
        <a href="#">Não sou cadastrado</a>
      </form>
    </div>
  );
}

export default App;
