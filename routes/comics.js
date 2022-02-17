const express = require("express");
const router = express.Router();
const { default: axios } = require("axios");

const apikey = process.env.API_KEY;

router.get("/comics", async (req, res) => {
  try {
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/comics?apiKey=${apikey}`
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
