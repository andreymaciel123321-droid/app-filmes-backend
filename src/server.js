const express = require('express');
const db = require('./db');
const authRoutes = require('./authRoutes');
const auth = require('./auth');
const criarTabelaUsuarios = require('./criarTabela'); // ADICIONADO

const app = express();
app.use(express.json());

app.get('/', async (req, res) => {
  try {
    const { rows } = await db.query("SELECT id, titulo, ano FROM movies LIMIT 50");
    return res.json(rows);
  } catch (err) {
    return res.json({
      msg: 'servidor ativo',
      detalhe: 'tabela movies não encontrada',
      erro: err.message
    });
  }
});

app.use('/', authRoutes);

app.get('/perfil', auth, (req, res) => {
  res.json({ usuario: req.usuario });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));

criarTabelaUsuarios(); // <-- cria a tabela ao iniciar
