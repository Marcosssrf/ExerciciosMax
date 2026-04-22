const express = require('express');
const cors = require('cors');
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const app = express();
const port = 5001;

// Configuração do lowdb
const adapter = new FileSync('db.json');
const db = low(adapter);

// Define os valores padrão se o db.json estiver vazio
db.defaults({ alunos: [] }).write();

app.use(cors()); 
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Servidor Node.js rodando!');
});

app.listen(port, () => {
    console.log(`Servidor na porta ${port}`);
});

// Endpoint para listar todos os alunos
app.get('/alunos', (req, res) => {
    res.json(db.get('alunos').value());
});

// Endpoint para adicionar um novo aluno
app.post('/alunos', (req, res) => {
    const { nome, endereco } = req.body; // Incluindo endereco para consistência

    if (!nome || typeof nome !== 'string' || nome.trim() === '') {
        return res.status(400).json({ mensagem: 'O nome do aluno é obrigatório.' });
    }

    const novoAluno = { 
        id: Date.now().toString(), 
        nome, 
        disciplinas: [], // Aluno começa sem disciplinas
        endereco: endereco || '' // Garante que endereco exista
    };
    
    db.get('alunos').push(novoAluno).write();
    
    res.status(201).json(novoAluno);
});

// Endpoint para deletar um aluno
app.delete('/alunos/:id', (req, res) => {
    const { id } = req.params;
    const alunoRemovido = db.get('alunos').remove({ id }).write();
    
    if (alunoRemovido.length > 0) {
        res.status(200).json({ mensagem: "Aluno removido com sucesso." });
    } else {
        res.status(404).json({ mensagem: "Aluno não encontrado" });
    }
});

// Endpoint para adicionar uma disciplina a um aluno
app.post('/alunos/:id/disciplinas', (req, res) => {
    const { id } = req.params; // ID do aluno é string agora
    const { nome } = req.body;

    if (!nome || typeof nome !== 'string' || nome.trim() === '') {
        return res.status(400).json({ mensagem: 'Nome da disciplina obrigatório.' });
    }

    const aluno = db.get('alunos').find({ id }).value();

    if (!aluno) return res.status(404).send('Aluno não encontrado');

    // Inicializa disciplinas se não existir
    aluno.disciplinas = aluno.disciplinas || []; 
    
    // Verifica se a disciplina já existe
    if (aluno.disciplinas.some(d => d.nome === nome)) {
        return res.status(409).json({ mensagem: 'Disciplina já existe para este aluno.' });
    }

    aluno.disciplinas.push({ nome, notas: [] });
    db.get('alunos').find({ id }).assign(aluno).write(); // Atualiza o aluno no DB
    
    res.status(201).json(aluno);
});

// Endpoint para lançar nota em uma disciplina de um aluno
app.post('/alunos/:id/disciplinas/:disciplinaNome/notas', (req, res) => {
    const { id, disciplinaNome } = req.params;
    const { nota } = req.body;

    if (typeof nota !== 'number') {
        return res.status(400).send('Nota deve ser um número.');
    }

    const aluno = db.get('alunos').find({ id }).value();
    if (!aluno) return res.status(404).send('Aluno não encontrado');

    const disciplina = aluno.disciplinas.find(d => d.nome === disciplinaNome);
    if (!disciplina) return res.status(404).send('Disciplina não encontrada');

    disciplina.notas.push(nota);
    db.get('alunos').find({ id }).assign(aluno).write(); // Atualiza o aluno no DB

    res.status(201).json(disciplina);
});

// Endpoint para alterar uma nota lançada em uma disciplina
app.put('/alunos/:id/disciplinas/:disciplinaNome/notas/:index', (req, res) => {
    const { id, disciplinaNome, index } = req.params;
    const { novaNota } = req.body;

    if (typeof novaNota !== 'number') {
        return res.status(400).send('Nova nota deve ser um número.');
    }

    const aluno = db.get('alunos').find({ id }).value();
    if (!aluno) return res.status(404).send('Aluno não encontrado');

    const disciplina = aluno.disciplinas.find(d => d.nome === disciplinaNome);
    if (!disciplina) return res.status(404).send('Disciplina não encontrada');

    const notaIndex = parseInt(index);
    if (isNaN(notaIndex) || notaIndex < 0 || notaIndex >= disciplina.notas.length) {
        return res.status(404).send('Índice da nota inválido.');
    }

    disciplina.notas[notaIndex] = novaNota;
    db.get('alunos').find({ id }).assign(aluno).write(); // Atualiza o aluno no DB

    res.json(disciplina);
});

// Endpoint para deletar uma nota específica de uma disciplina
app.delete('/alunos/:id/disciplinas/:disciplinaNome/notas/:index', (req, res) => {
    const { id, disciplinaNome, index } = req.params;

    const aluno = db.get('alunos').find({ id }).value();
    if (!aluno) return res.status(404).send('Aluno não encontrado');

    const disciplina = aluno.disciplinas.find(d => d.nome === disciplinaNome);
    if (!disciplina) return res.status(404).send('Disciplina não encontrada');

    const notaIndex = parseInt(index);
    if (isNaN(notaIndex) || notaIndex < 0 || notaIndex >= disciplina.notas.length) {
        return res.status(404).send('Índice da nota inválido.');
    }

    disciplina.notas.splice(notaIndex, 1);
    db.get('alunos').find({ id }).assign(aluno).write(); // Atualiza o aluno no DB

    res.status(200).json(disciplina);
});
