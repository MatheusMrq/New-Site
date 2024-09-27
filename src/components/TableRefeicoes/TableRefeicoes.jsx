import React from 'react'

const TableRefeicoes = ({}) => {
  return (
<table>
      <thead>
        <tr>
            <th>Nome do Aluno</th>
            <th>Turma</th>
            <th>Observações</th>
            <th>Refeições</th>
          </tr>
        </thead>
          <tbody>
            <tr>
              <td>João Pedro Maldonado</td>
              <td>DEV1B</td>
              <td>é bom falando</td>
              <td>Café da Manhã, Almoço</td>
            </tr>
            <tr>
              <td>Matheus Marquesi Cardoso</td>
              <td>DEV1B</td>
              <td>é</td>
              <td>Café da Manhã</td>
      </tr>
    </tbody>
  </table>

  )
}

export default TableRefeicoes