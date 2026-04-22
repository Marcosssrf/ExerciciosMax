import React, { useState, useEffect, Suspense } from 'react';
import axios from "axios";
import DOMPurify from 'dompurify';
import './App.css';

// Lazy loading do componente de Disciplinas
const DisciplinasLazy = React.lazy(() => import('./NotasComponent'));

function App() {
  const [alunos, setAlunos] = useState([]);
  const [nome, setNome] = useState('');
  const [cep, setCep] = useState('');
  const [endereco, setEndereco] = useState('');

  // Função para buscar todos os alunos e atualizar o estado
  const fetchAlunos = async () => {
    try {
      const response = await axios.get('http://localhost:5001/alunos');
      setAlunos(response.data);
    } catch (error) {
      console.error("Erro ao buscar alunos:", error);
      alert('Falha ao carregar os dados dos alunos. Verifique se o servidor está rodando.');
    }
  };

  useEffect(() => {
    fetchAlunos();
  }, []);

  const buscarCep = async () => {
    if (cep.length === 8) {
      try {
        const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
        if (!response.data.erro) {
           const enderecoLimpo = DOMPurify.sanitize(`${response.data.logradouro}, ${response.data.bairro}, ${response.data.localidade} - ${response.data.uf}`);
           setEndereco(enderecoLimpo);
        } else {
           setEndereco('CEP não encontrado');
        }
      } catch (error) {
        console.error("Erro ao buscar CEP:", error);
        setEndereco('Erro ao buscar CEP');
      }
    } else {
       setEndereco('CEP inválido');
    }
  };

  const adicionarAluno = async () => {
    if (nome) {
      try {
        const nomeLimpo = DOMPurify.sanitize(nome);
        const enderecoLimpo = DOMPurify.sanitize(endereco);

        const novoAlunoData = { 
            nome: nomeLimpo, 
            endereco: enderecoLimpo
        };
        await axios.post('http://localhost:5001/alunos', novoAlunoData);
        
        setNome('');
        setCep('');
        setEndereco('');
        alert(`Aluno "${nomeLimpo}" adicionado com sucesso!`);
        fetchAlunos(); // Recarrega a lista de alunos
      } catch (error) {
        console.error("Erro ao adicionar aluno:", error);
        alert(`Erro ao adicionar aluno: ${error.response?.data?.mensagem || 'Verifique o console.'}`);
      }
    }
  };

  const removerAluno = async (id) => {
    if (window.confirm("Tem certeza que deseja remover este aluno?")) {
      try {
        await axios.delete(`http://localhost:5001/alunos/${id}`);
        alert("Aluno removido com sucesso!");
        fetchAlunos(); // Recarrega a lista
      } catch (error) {
        console.error("Erro ao remover aluno:", error);
        alert("Erro ao remover aluno.");
      }
    }
  };

  // As funções de adicionar/remover/editar notas serão passadas para o componente filho
  const handleAction = async () => {
    await fetchAlunos();
  };

  return (
      <div className="app-container">
        <h1>Gestão de Notas</h1>
        <div className="form-container">
          <input 
            value={nome} 
            onChange={(e) => setNome(e.target.value)} 
            placeholder="Nome do aluno"
            aria-label="Nome do aluno"
          />
          <input 
            value={cep} 
            onChange={(e) => setCep(e.target.value)} 
            placeholder="CEP (somente números)" 
            aria-label="CEP do aluno"
            maxLength="8"
          />
          <button onClick={buscarCep}>Buscar Endereço (ViaCEP)</button>
          
          {endereco && (
              <div className="endereco-info">
                  Endereço: <span dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(endereco) }} />
              </div>
          )}

          <button onClick={adicionarAluno} style={{marginTop: '10px'}}>Adicionar Aluno</button>
        </div>
        
        <ul className="lista-alunos">
          {alunos.map((aluno) => (
            <li key={aluno.id} className="aluno-item">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(aluno.nome) }} />
                <button 
                  onClick={() => removerAluno(aluno.id)}
                  className="btn-remover-aluno"
                  aria-label={`Remover aluno ${aluno.nome}`}
                >
                  Excluir Aluno
                </button>
              </div>
              
              {aluno.endereco && <p className="aluno-endereco">📍 <span dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(aluno.endereco) }} /></p>}
              
              <Suspense fallback={<div>Carregando...</div>}>
                <DisciplinasLazy 
                  aluno={aluno} 
                  onAction={handleAction}
                />
              </Suspense>
            </li>
          ))}
        </ul>
      </div>
  );
}

export default App;
