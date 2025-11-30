// routes/movieRoutes.js
const express = require("express");
const router = express.Router();
const Movie = require("../models/Movie");

// Criar filme
router.post("/create", async (req, res) => {
  try {
    const movie = await Movie.create(req.body);
    res.json(movie);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Listar todos os filmes
router.get("/", async (req, res) => {
  const movies = await Movie.find().sort({ createdAt: -1 });
  res.json(movies);
});

// Buscar filme por ID
router.get("/:id", async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    res.json(movie);
  } catch (error) {
    res.status(404).json({ error: "Filme não encontrado" });
  }
});

// Deletar filme
router.delete("/:id", async (req, res) => {
  await Movie.findByIdAndDelete(req.params.id);
  res.json({ message: "Filme removido" });
});

// Atualizar filme
router.put("/:id", async (req, res) => {
  const movie = await Movie.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(movie);
});

module.exports = router;
