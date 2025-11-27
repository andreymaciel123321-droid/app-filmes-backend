// src/auth.js
const jwt = require('jsonwebtoken');

function auth(req, res, next) {
    const header = req.headers.authorization;

    if (!header) {
        return res.status(401).json({ erro: 'Token não enviado' });
    }

    const token = header.split(' ')[1];

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET || 'segredo123');
        req.usuario = payload;
        next();
    } catch (err) {
        return res.status(401).json({ erro: 'Token inválido' });
    }
}

module.exports = auth;
