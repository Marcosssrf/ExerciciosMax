const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(bodyParser.json());

const users = [
    { id: 1, username: 'aluno1', password: 'senha123' },
    { id: 2, username: 'aluno2', password: 'senha456' }
];

app.post('/login', (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: 'Usuário e senha são obrigatórios' });
    }

    if (!username || !password || username.includes(';') || password.includes(';')) {
        return res.status(400).json({ error: 'Entrada inválida detectada' });
    }


    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
        res.status(200).json({ message: 'Login bem-sucedido', user: { id: user.id, username: user.username } });
    } else {
        res.status(401).json({ error: 'Credenciais inválidas' });
    }
});

app.listen(3001, () => console.log('Servidor rodando em http://localhost:3001'));
