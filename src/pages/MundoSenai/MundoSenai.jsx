import React, { useState } from "react";
import './MundoSenai.css';
import ProgramarMundoSENAI from "../../components/ProgramarMundoSenai/ProgramarMundoSenai";

function MundoSENAI() {
  const [eventos, setEventos] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [eventoParaEditar, setEventoParaEditar] = useState(null);
  const [eventoParaDetalhar, setEventoParaDetalhar] = useState(null);

  const handleProgramarClick = () => {
    setEventoParaEditar(null);
    setShowModal(true);
  };

  const saveEvento = (evento) => {
    if (eventoParaEditar !== null) {
      setEventos(eventos.map((ev, idx) => (idx === eventoParaEditar ? evento : ev)));
    } else {
      setEventos([...eventos, evento]);
    }
    setShowModal(false);
  };

  const handleEditarClick = (index) => {
    setEventoParaEditar(index);
    setShowModal(true);
  };

  const handleDetalhesClick = (evento) => {
    setEventoParaDetalhar(evento);
  };

  return (
    <div className="mundo-senai-container">
      <div className="header">
        <h1>Mundo SENAI</h1>
        <button className="programar-button" onClick={handleProgramarClick}>
          Programar Mundo SENAI
        </button>
      </div>

      {eventos.length === 0 ? (
        <div className="no-event">
          <p>Você não tem nenhum compromisso programado</p>
        </div>
      ) : (
        <div className="eventos-list">
          {eventos.map((evento, index) => (
            <div key={index} className="evento-card">
              <p><strong>Data:</strong> {evento.rangeData}</p>
              <button className="editar-button" onClick={() => handleEditarClick(index)}>
                Editar
              </button>
              <button className="detalhes-button" onClick={() => handleDetalhesClick(evento)}>
                Detalhes
              </button>
            </div>
          ))}
        </div>
      )}

      {showModal && (
        <ProgramarMundoSENAI
          saveEvento={saveEvento}
          closeModal={() => setShowModal(false)}
          eventoInicial={eventoParaEditar !== null ? eventos[eventoParaEditar] : null}
        />
      )}

      {eventoParaDetalhar && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Detalhes do Evento</h2>
            <p><strong>Data:</strong> {eventoParaDetalhar.rangeData}</p>
            <p><strong>Observações:</strong> {eventoParaDetalhar.observacoes}</p>
            <button onClick={() => setEventoParaDetalhar(null)}>Fechar</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default MundoSENAI;
