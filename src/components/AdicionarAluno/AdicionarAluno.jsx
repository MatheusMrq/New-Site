import React, { useState, useEffect } from "react";
import axios from "axios";
import './AdicionarAluno.css';

function AdicionarAluno({ mode, closeModal }) {
  const [nome, setNome] = useState("");
  const [lastNome, setLastNome] = useState("");
  const [matricula, setMatricula] = useState("");
  const [curso, setCurso] = useState("");
  const [cursosDisponiveis, setCursosDisponiveis] = useState([]);

  useEffect(() => {
    const fetchCursos = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:5000/api/cursos');
        setCursosDisponiveis(response.data);
      } catch (error) {
        console.error("Erro ao buscar cursos:", error);
      }
    };

    fetchCursos();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const aluno = { nome, lastNome, matricula, curso };    

    axios.post('http://127.0.0.1:5000/api/adicionar-aluno', aluno)
      .then(response => {
        console.log("Resposta: ", response.data);
        closeModal();
      })
      .catch(error => {
        console.error("Erro ao tentar adicionar o aluno!", error);
      });
};


  return (
    <div className="adicionar-aluno-container">
      <h2>{mode === "adicionar" ? "Adicionar Aluno" : "Editar Aluno"}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Primeiro Nome:</label>
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Sobrenome:</label>
          <input
            type="text"
            value={lastNome}
            onChange={(e) => setLastNome(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Matrícula:</label>
          <input
            type="text"
            value={matricula}
            onChange={(e) => setMatricula(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Curso:</label>
          <select value={curso} onChange={(e) => setCurso(e.target.value)} required>
            <option value="" disabled>Selecione um curso</option>
            {cursosDisponiveis.map(({ id, nome }) => (
              <option key={id} value={id}>
                {nome}
              </option>
            ))}
          </select>
        </div>
        <button type="submit">Salvar</button>
        <button type="button" onClick={closeModal}>Cancelar</button>
      </form>
    </div>
  );
}

export default AdicionarAluno;
