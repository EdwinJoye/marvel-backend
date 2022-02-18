const express = require("express");
const router = express.Router();
const { default: axios } = require("axios");
const apikey = process.env.API_KEY;

router.get("/comics", async (req, res) => {
  console.log(req.query);
  const searchBar = req.query.title;
  const page = req.query.page ? Number(req.query.page) : 1;
  const limit = req.query.limit;
  const skip = limit * (page - 1);

  try {
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/comics?title=${searchBar}&limit=${limit}&skip=${skip}&apiKey=${apikey}`
    );

    const data = response.data;
    res.json(data);
  } catch (error) {
    res.status(400).json({ error: { message: error.message } });
  }
});

router.get("/comics/:characterId", async (req, res) => {
  try {
    const characterId = req.params.characterId;
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/comics/5fc8ba1fdc33470f788f88b3${characterId}?apiKey=${apikey}`
    );

    const data = response.data;
    res.json(data);
  } catch (error) {
    res.status(400).json({ error: { message: error.message } });
  }
});

module.exports = router;
