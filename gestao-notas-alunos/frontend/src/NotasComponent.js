import React, { useState } from 'react';
import axios from 'axios';
import DOMPurify from 'dompurify';

export default function DisciplinasComponent({ aluno, onAction }) {
  const [novaDisciplina, setNovaDisciplina] = useState('');
  const [notaInputs, setNotaInputs] = useState({});

  const adicionarDisciplina = async () => {
    if (novaDisciplina.trim() === '') return;
    try {
      await axios.post(`http://localhost:5001/alunos/${aluno.id}/disciplinas`, { nome: novaDisciplina });
      setNovaDisciplina('');
      onAction(); // Recarrega os dados no componente pai
    } catch (error) {
      console.error("Erro ao adicionar disciplina:", error);
      alert(`Erro: ${error.response?.data?.mensagem || 'Não foi possível adicionar a disciplina.'}`);
    }
  };

  const lancarNota = async (disciplinaNome) => {
    const nota = parseFloat(notaInputs[disciplinaNome]);
    if (isNaN(nota)) return;
    try {
      await axios.post(`http://localhost:5001/alunos/${aluno.id}/disciplinas/${disciplinaNome}/notas`, { nota });
      setNotaInputs({ ...notaInputs, [disciplinaNome]: '' });
      onAction();
    } catch (error) {
      console.error("Erro ao lançar nota:", error);
      alert(`Erro: ${error.response?.data?.mensagem || 'Não foi possível lançar a nota.'}`);
    }
  };

  const editarNota = async (disciplinaNome, index) => {
    const novoValor = prompt("Digite a nova nota:", aluno.disciplinas.find(d => d.nome === disciplinaNome).notas[index]);
    if (novoValor === null) return; // Cancelado
    
    const novaNota = parseFloat(novoValor);
    if (isNaN(novaNota)) {
      alert("Valor inválido. A nota deve ser um número.");
      return;
    }

    try {
      await axios.put(`http://localhost:5001/alunos/${aluno.id}/disciplinas/${disciplinaNome}/notas/${index}`, { novaNota });
      onAction();
    } catch (error) {
      console.error("Erro ao editar nota:", error);
      alert(`Erro: ${error.response?.data?.mensagem || 'Não foi possível editar a nota.'}`);
    }
  };

  const handleNotaInputChange = (disciplinaNome, value) => {
    setNotaInputs({ ...notaInputs, [disciplinaNome]: value });
  };

  const calcularMedia = (notas) => {
    if (!notas || notas.length === 0) return 'N/A';
    const soma = notas.reduce((acc, curr) => acc + curr, 0);
    return (soma / notas.length).toFixed(1);
  };

  return (
    <div className="disciplinas-container">
      {/* Formulário para adicionar nova disciplina */}
      <div className="form-add-disciplina">
        <input
          value={novaDisciplina}
          onChange={(e) => setNovaDisciplina(e.target.value)}
          placeholder="Nome da nova disciplina"
          aria-label={`Adicionar nova disciplina para ${aluno.nome}`}
        />
        <button onClick={adicionarDisciplina}>Adicionar Disciplina</button>
      </div>

      {/* Lista de disciplinas do aluno */}
      {(aluno.disciplinas || []).map((disciplina, dIndex) => (
        <div key={dIndex} className="disciplina-item">
          <h4 dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(disciplina.nome) }} />
          <p><strong>Média:</strong> {calcularMedia(disciplina.notas)}</p>
          
          <ul>
            {disciplina.notas.map((nota, nIndex) => (
              <li key={nIndex}>
                {`Nota ${nIndex + 1}: ${nota}`}
                <button className="btn-editar-nota" onClick={() => editarNota(disciplina.nome, nIndex)}>
                  Editar
                </button>
              </li>
            ))}
          </ul>

          {/* Formulário para adicionar nova nota */}
          <div className="form-add-nota">
            <input
              type="number"
              value={notaInputs[disciplina.nome] || ''}
              onChange={(e) => handleNotaInputChange(disciplina.nome, e.target.value)}
              placeholder="Nova nota"
              aria-label={`Adicionar nota para ${disciplina.nome}`}
            />
            <button onClick={() => lancarNota(disciplina.nome)}>Lançar Nota</button>
          </div>
        </div>
      ))}
    </div>
  );
}
