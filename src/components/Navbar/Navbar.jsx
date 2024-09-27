import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css"; // Estilo personalizado

function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/">Início</Link>
      <Link to="/alunos">Alunos</Link>
      <Link to="/mundo-senai">Mundo SENAI</Link>
      <Link to="/refeicoes">Refeições</Link>
      <Link to="/tutorial">Tutorial</Link>
    </nav>
  );
}

export default Navbar;
