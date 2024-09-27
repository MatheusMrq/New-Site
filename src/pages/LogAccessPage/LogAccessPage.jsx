import React, { useState } from "react";
import './LogAccessPage.css';

const logsMockData = [
  { id: 1, label: "Log Refeições", type: "refeicoes" },
  { id: 2, label: "Log Alunos", type: "atribuicoes" },
  { id: 3, label: "Log Geral", type: "geral" },
  { id: 4, label: "Log Camisa", type: "camisa" },

];

const eventosMockData = [
  { id: 1, rangeData: "01/04 - 04/04" },
  { id: 2, rangeData: "02/11 - 06/11" },
  // Evento LINKADO COM OS EVENTOS DE REFEIÇÕES
];

function LogAccessPage() {
  const [selectedEvento, setSelectedEvento] = useState("");

  const handleEventoChange = (e) => {
    setSelectedEvento(e.target.value);
  };

  const handleLogClick = (logType) => {
    alert(`Gerando ${logType} para o evento ${selectedEvento}`);
    // LINKAR COM A LÓGICA DE LOGS
  };

  return (
    <div className="log-access-page">
      <header>
        <h2>Acesso aos Logs</h2>
      </header>
      <div className="evento-select-container">
        <label htmlFor="evento-select">Selecione o Evento:</label>
        <select
          id="evento-select"
          value={selectedEvento}
          onChange={handleEventoChange}
        >
          <option value="">Selecione o Evento</option>
          {eventosMockData.map((evento) => (
            <option key={evento.id} value={evento.rangeData}>
              {evento.rangeData}
            </option>
          ))}
        </select>
      </div>
      {selectedEvento && (
        <div className="log-buttons-container">
          {logsMockData.map((log) => (
            <button
              key={log.id}
              className="log-button"
              onClick={() => handleLogClick(log.label)}
            >
              {log.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default LogAccessPage;
