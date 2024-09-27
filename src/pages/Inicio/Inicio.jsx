import React from "react";
import './Inicio.css';
import { Link } from "react-router-dom";

function Inicio() {
  return (
    <div className="inicio-container">
      <h1>Organização de Eventos - SENAI</h1>
      <p>Bem-vindo ao sistema de organização de eventos do SENAI. Aqui você pode gerenciar alunos, eventos e refeições de forma eficiente.</p>
      <Link to="/logs"><button className="logs-button">Acessar Logs</button></Link>
      <div>
        <table>
          <thead>
            <tr>
              <th>ID/Matrícula</th>
              <th>Data</th>
              <th>Dia</th>
              <th>Nome do Aluno</th>
              <th>Turma</th>
              <th>Período</th>
              <th>Local</th>
              <th>Refeições</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>24161866</td>
              <td>02/10</td>
              <td>Quinta</td>
              <td>João Pedro Maldonado</td>
              <td>DEV1B</td>
              <td>Manhã</td>
              <td>TI</td>
              <td>Café da Manha, Almoço</td>
            </tr>
            <tr>
              <td>24163856</td>
              <td>02/10</td>
              <td>Quinta</td>
              <td>Matheus Marquesi Cardoso</td>
              <td>DEV1B</td>
              <td>Manhã</td>
              <td>TI</td>
              <td>Café da Manha, Almoço</td>
      </tr>
    </tbody>
  </table>
      </div>
    </div>
  );
}

export default Inicio;
