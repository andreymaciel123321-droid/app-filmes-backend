const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

// Lista de filmes (exemplo)
const filmes = [
  { id: 1, titulo: "Vingadores Ultimato", ano: 2019 },
  { id: 2, titulo: "Homem-Aranha Sem Volta Para Casa", ano: 2021 },
  { id: 3, titulo: "Interestelar", ano: 2014 }
];

// Rota principal
app.get("/", (req, res) => {
  res.send("API de Filmes Funcionando!");
});

// Rota de filmes
app.get("/filmes", (req, res) => {
  res.json(filmes);
});

// Iniciar servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
