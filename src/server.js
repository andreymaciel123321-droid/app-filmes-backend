// src/server.js
const express = require('express');
const db = require('./db');
const authRoutes = require('./authRoutes');
const auth = require('./auth');

const app = express();
app.use(express.json());

// Rota raiz — segura, não quebra mesmo sem tabela
app.get('/', async (req, res) => {
  try {
    const { rows } = await db.query("SELECT id, titulo, ano FROM movies LIMIT 50");
    return res.json(rows);
  } catch (err) {
    // Apenas mostra mensagem amigável, sem causar crash
    return res.json({
      msg: 'servidor ativo',
      detalhe: 'tabela movies não encontrada (normal se você ainda não criou)',
      erro: err.message
    });
  }
});

// Rotas de cadastro e login
app.use('/', authRoutes);

// Rota protegida
app.get('/perfil', auth, (req, res) => {
  res.json({ usuario: req.usuario });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
