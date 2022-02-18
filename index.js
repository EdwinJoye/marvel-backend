require("dotenv").config();
const express = require("express");
const formidable = require("express-formidable");
const mongoose = require("mongoose");
const cors = require("cors");
const router = express.Router();
const app = express();
app.use(formidable());
app.use(cors());

mongoose.connect(process.env.MONGODB_URI);
// le back va chercher les informations sur l'API du Réacteur qui lui va chercher dans la base de donnée Marvel
const userRoutes = require("./routes/user");
app.use(userRoutes);

const comicsRoutes = require("./routes/comics");
app.use(comicsRoutes);
const charactersRoutes = require("./routes/characters");
app.use(charactersRoutes);
app.all("*", (req, res) => {
  res.json("page not found");
});
app.get("/", (req, res) => {
  res.status(200).json("Welcome to the signup project");
});

app.listen(3001, () => {
  console.log("server started");
});
