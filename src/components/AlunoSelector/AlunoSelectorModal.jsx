import React, { useEffect, useState } from "react";
import axios from "axios";
import './AlunoSelectorModal.css';

function AlunoSelectorModal({ alunosIniciais = [], saveAlunos, closeModal }) {
  const [alunos, setAlunos] = useState([]);
  const [roles, setRoles] = useState([]);
  const [selectedAlunos, setSelectedAlunos] = useState(alunosIniciais);

  useEffect(() => {
    const fetchAlunos = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/alunos');
        setAlunos(response.data);
      } catch (error) {
        console.error("Erro ao buscar alunos:", error);
      }
    };

    const fetchRoles = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/roles');
        setRoles(response.data);
      } catch (error) {
        console.error("Erro ao buscar roles:", error);
      }
    };

    fetchAlunos();
    fetchRoles();
  }, []);

  const handleAlunoClick = (aluno, funcao) => {
    const alunoComFuncao = { ...aluno, funcao };
    setSelectedAlunos((prevSelected) =>
      prevSelected.some((a) => a.id === aluno.id)
        ? prevSelected.map((a) => (a.id === aluno.id ? alunoComFuncao : a))
        : [...prevSelected, alunoComFuncao]
    );
  };

  const handleFuncaoChange = (e, aluno) => {
    const funcao = e.target.value;
    handleAlunoClick(aluno, funcao);
  };
  
  const handleSave = () => {
    saveAlunos(selectedAlunos);
    closeModal();
  };

  const isAlunoSelected = (alunoId) => {
    return selectedAlunos.some(aluno => aluno.id === alunoId);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content aluno-selector-modal">
        <h2>Selecione os Alunos</h2>
        <main>
          <ul className="aluno-list">
            {alunos.map((aluno) => (
              <li
                key={aluno.id}
                className={`aluno-item ${isAlunoSelected(aluno.id) ? "selected" : ""}`}
              >
                <p><strong>Nome:</strong> {aluno.nome}</p>
                <p><strong>Matrícula:</strong> {aluno.matricula}</p>
                <select onChange={(e) => handleFuncaoChange(e, aluno)}>
                  <option value="">Selecione uma função</option>
                  {roles.map(role => (
                    <option key={role.id} value={role.nome}>{role.nome}</option>
                  ))}
                </select>
              </li>
            ))}
          </ul>
        </main>
        <div className="modal-actions">
          <button className="save-button" onClick={handleSave}>Salvar</button>
          <button className="cancel-button" onClick={closeModal}>Cancelar</button>
        </div>
      </div>
    </div>
  );
}

export default AlunoSelectorModal;
