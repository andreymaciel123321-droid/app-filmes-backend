const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Rota simples só para testar se o servidor funciona
app.get("/", (req, res) => {
  res.send("API do app de filmes está rodando!");
});

// Porta usada pelo Render
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Servidor rodando na porta " + PORT));
