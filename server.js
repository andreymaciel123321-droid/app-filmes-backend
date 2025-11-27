import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pkg from "pg";

dotenv.config();
const { Pool } = pkg;

const app = express();
app.use(cors());
app.use(express.json());

// Banco de dados
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

// Teste de rota
app.get("/", (req, res) => {
    res.send("Backend do app de filmes está funcionando!");
});

// Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log("Servidor rodando na porta " + PORT);
});
