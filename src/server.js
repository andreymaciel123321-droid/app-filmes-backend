import express from "express";

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API de filmes funcionando!");
});

app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});
