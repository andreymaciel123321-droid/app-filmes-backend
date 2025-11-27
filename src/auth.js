// src/auth.js
const bcrypt = require('bcryptjs');

function auth(req, res, next) {
  const header = req.headers.authorization || '';
  const token = header.split(' ')[1]; // formato esperado: "Bearer <token>"
  
  if (!token) {
    return res.status(401).json({ erro: 'Token não enviado.' });
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.usuario = payload; // payload contém { id, email, nome }
    next();
  } catch (err) {
    return res.status(401).json({ erro: 'Token inválido.' });
  }
}

module.exports = auth;
