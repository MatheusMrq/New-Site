import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar.jsx";
import Inicio from "./pages/Inicio/Inicio.jsx";
import Alunos from "./pages/Alunos/Alunos.jsx";
import MundoSENAI from "./pages/MundoSenai/MundoSENAI.jsx";
import Refeicoes from "./pages/Refeicoes/Refeicoes.jsx";
import Tutorial from "./pages/Tutorial/Tutorial.jsx";
import LogAccessPage from "./pages/LogAccessPage/LogAccessPage.jsx";

function App() {
  const [eventos, setEventos] = useState([
    { rangeData: "01/04 - 04/04" },
    { rangeData: "02/11 - 06/11" },
    // Adicione mais eventos conforme necessário
  ]);

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/alunos" element={<Alunos />} />
        <Route path="/mundo-senai" element={<MundoSENAI />} />
        <Route path="/refeicoes" element={<Refeicoes eventos={eventos} />} />
        <Route path="/tutorial" element={<Tutorial />} />
        <Route path="/logs" element={<LogAccessPage />} />
      </Routes>
    </Router>
  );
}

export default App;
