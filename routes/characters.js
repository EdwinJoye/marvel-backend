const express = require("express");
const router = express.Router();
const { default: axios } = require("axios");

const apikey = process.env.API_KEY;

router.get("/characters", async (req, res) => {
  console.log("characters", apikey);
  try {
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/characters?name=${searchBar}?apiKey=${apikey}`
    );

    const data = response.data;
    res.json(data);
  } catch (error) {
    res.status(400).json({ error: { message: error.message } });
  }
});

router.get("/character/:characterId", async (req, res) => {
  try {
    const characterId = req.params.characterId;
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/characters/${characterId}?apiKey=${apiKey}`
    );
    const data = response.data;
    console.log(response.data);
    res.json(data);
  } catch (error) {
    res.status(400).json({ error: { message: error.message } });
  }
});

module.exports = router;
