require("dotenv").config();
const express = require("express");
const router = express.Router();
const cors = require("cors");
const app = express();
app.use(cors());

//21cQUyWBxS7LlSYK

// le back va chercher les informations sur l'API du Réacteur qui lui va chercher dans la base de donnée Marvel
const comicsRoutes = require("./routes/comics");
app.use(comicsRoutes);
const charactersRoutes = require("./routes/characters");
app.use(charactersRoutes);
app.all("*", (req, res) => {
  res.json("page not found");
});

app.listen(3001, () => {
  console.log("server started");
});
