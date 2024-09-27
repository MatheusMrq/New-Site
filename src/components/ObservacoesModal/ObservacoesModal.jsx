import React, { useState } from "react";
import './ObservacoesModal.css';

function ObservacoesModal({ observacoesIniciais, saveObservacoes, closeModal }) {
  const [observacoes, setObservacoes] = useState(observacoesIniciais || "");

  const handleSave = () => {
    saveObservacoes(observacoes);
    closeModal();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Observações</h2>
        <textarea
          value={observacoes}
          onChange={(e) => setObservacoes(e.target.value)}
          placeholder="Escreva suas observações aqui..."
        />
        <button className="save-button" onClick={handleSave}>Salvar</button>
        <button className="cancel-button" onClick={closeModal}>Cancelar</button>
      </div>
    </div>
  );
}

export default ObservacoesModal;
