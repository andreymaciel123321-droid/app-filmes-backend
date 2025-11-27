// src/criarTabela.js
const db = require('./db');

async function criarTabelaUsers() {
  const query = `
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      nome VARCHAR(100),
      email VARCHAR(150) UNIQUE NOT NULL,
      senha VARCHAR(200) NOT NULL
    );
  `;

  try {
    await db.query(query);
    console.log("Tabela USERS criada com sucesso!");
  } catch (err) {
    console.error("Erro ao criar tabela:", err);
  } finally {
    process.exit();
  }
}

criarTabelaUsers();
  
