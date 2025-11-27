// src/authRoutes.js
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('./db');

const router = express.Router();

// Cadastro
router.post('/cadastro', async (req, res) => {
  try {
    const { nome, email, senha } = req.body;

    if (!nome || !email || !senha) {
      return res.status(400).json({ erro: 'nome, email e senha são obrigatórios' });
    }

    const { rows } = await db.query('SELECT id FROM usuarios WHERE email = $1', [email]);
    if (rows.length) {
      return res.status(400).json({ erro: 'Email já cadastrado' });
    }

    const hash = await bcrypt.hash(senha, 10);

    await db.query(
      'INSERT INTO usuarios (nome, email, senha) VALUES ($1, $2, $3)',
      [nome, email, hash]
    );

    res.json({ mensagem: 'Usuário cadastrado com sucesso' });

  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, senha } = req.body;

    if (!email || !senha) {
      return res.status(400).json({ erro: 'email e senha obrigatórios' });
    }

    const { rows } = await db.query('SELECT * FROM usuarios WHERE email = $1', [email]);
    if (rows.length === 0) {
      return res.status(400).json({ erro: 'Usuário não encontrado' });
    }

    const user = rows[0];
    const ok = await bcrypt.compare(senha, user.senha);

    if (!ok) return res.status(400).json({ erro: 'Senha incorreta' });

    const token = jwt.sign(
      { id: user.id, email: user.email, nome: user.nome },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({ mensagem: 'Login realizado', token });

  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
});

module.exports = router;
