import React, { useState } from "react";
import AdicionarAluno from '../../components/AdicionarAluno/AdicionarAluno.jsx';
import './Alunos.css';

function Alunos() {
  const [showModal, setShowModal] = useState(false);
  const [formMode, setFormMode] = useState(null);

  const handleAddClick = () => {
    setShowModal(true);
  };

  const handleFormMode = (mode) => {
    setFormMode(mode);
  };

  const closeModal = () => {
    setShowModal(false);
    setFormMode(null);
  };

  return (
    <div className="alunos-container">
      <h1>Gerenciamento de Alunos</h1>
      <button className="add-aluno-button" onClick={handleAddClick}>
        Adicionar Aluno
      </button>

      {showModal && (
        <div className="modal">
          <div className="modal-size">
            {!formMode ? (
              <div className="modal-contenti">
                <div className="div-close">
                <button id="button-close" onClick={() => closeModal()}>X</button>
                </div>
                <h2>O que você quer fazer?</h2>
                <button onClick={() => handleFormMode("adicionar")}>Adicionar</button>
                <button onClick={() => handleFormMode("editar")}>Editar</button>
              </div>
            ) : (
              <AdicionarAluno mode={formMode} closeModal={closeModal} />
            )}
          </div>
        </div>
        
      )}


<table>
      <thead>
        <tr>
            <th>ID/Matrícula</th>
            <th>Nome do Aluno</th>
            <th>Turma</th>
            <th>Observações</th>
          </tr>
        </thead>
          <tbody>
            <tr>
              <td>24161866</td>
              <td>João Pedro Maldonado</td>
              <td>DEV1B</td>
              <td>é bom falando</td>
            </tr>
            <tr>
              <td>24163856</td>
              <td>Matheus Marquesi Cardoso</td>
              <td>DEV1B</td>
              <td>é</td>
      </tr>
    </tbody>
  </table>
    </div>
  );
}

export default Alunos;
