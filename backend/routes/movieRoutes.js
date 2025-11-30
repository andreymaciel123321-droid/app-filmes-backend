const express = require("express");
const router = express.Router();

// Lista de filmes (por enquanto manual, depois o ADM vai editar isso)
const movies = [
  {
    id: 1,
    title: "Vingadores: Ultimato",
    description: "Os heróis restantes tentam reverter o estalo de Thanos.",
    thumbnail: "https://i.imgur.com/6Iej2c3.jpeg",
    video: "https://cdn.jwplayer.com/videos/HkauGhRi-640.mp4"
  },
  {
    id: 2,
    title: "Interestelar",
    description: "Um grupo de astronautas viaja através de um buraco negro.",
    thumbnail: "https://i.imgur.com/8pQeZ7G.jpeg",
    video: "https://cdn.jwplayer.com/videos/tkM1z9gV-640.mp4"
  }
];

router.get("/", (req, res) => {
  res.json(movies);
});

module.exports = router;
