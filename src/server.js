// src/server.js
const express = require('express');
const db = require('./db');
const authRoutes = require('./authRoutes');
const auth = require('./auth');

const app = express();
app.use(express.json());

// Rota de teste — retorna filmes se existir tabela movies
app.get('/', async (req, res) => {
  try {
    const { rows } = await db.query("SELECT id, titulo, ano FROM movies LIMIT 50");
    return res.json(rows);
  } catch (err) {
    return res.status(200).json({ msg: 'server up', error: err.message });
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
