// src/authRoutes.js
const express = require('express');
const router = express.Router();
const db = require('./db');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// ROTA DE CADASTRO
router.post('/cadastro', async (req, res) => {
    const { nome, email, senha } = req.body;

    if (!nome || !email || !senha) {
        return res.status(400).json({ erro: 'Preencha todos os campos' });
    }

    try {
        const hashed = await bcrypt.hash(senha, 10);

        const query = `
            INSERT INTO usuarios (nome, email, senha)
            VALUES ($1, $2, $3)
            RETURNING id, nome, email
        `;

        const values = [nome, email, hashed];

        const result = await db.query(query, values);

        res.status(201).json({
            mensagem: "Usuário cadastrado com sucesso",
            usuario: result.rows[0]
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ erro: 'Erro interno no servidor' });
    }
});


// ROTA DE LOGIN
router.post('/login', async (req, res) => {
    const { email, senha } = req.body;

    try {
        const result = await db.query(
            "SELECT * FROM usuarios WHERE email = $1",
            [email]
        );

        if (result.rows.length === 0) {
            return res.status(400).json({ erro: "Usuário não encontrado" });
        }

        const usuario = result.rows[0];

        const senhaOk = await bcrypt.compare(senha, usuario.senha);

        if (!senhaOk) {
            return res.status(401).json({ erro: "Senha incorreta" });
        }

        const token = jwt.sign(
            { id: usuario.id, email: usuario.email },
            process.env.JWT_SECRET || "segredo123",
            { expiresIn: "2h" }
        );

        res.json({ mensagem: "Login realizado", token });

    } catch (err) {
        console.error(err);
        res.status(500).json({ erro: 'Erro interno no servidor' });
    }
});


module.exports = router;
