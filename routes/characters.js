const express = require("express");
const router = express.Router();
const { default: axios } = require("axios");
const req = require("express/lib/request");
const { query } = require("express");
const apikey = process.env.API_KEY;

router.get("/characters", async (req, res) => {
  const searchBar = req.query;
  const limit = req.query.limit;
  const page = req.query.page ? Number(req.query.page) : 1;
  const skip = limit * (page - 1);
  console.log(skip);
  console.log(page);
  console.log(req.query);

  try {
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/characters?name=${searchBar}&limit=${limit}&page=${page}&apiKey=${apikey}`
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
      `https://lereacteur-marvel-api.herokuapp.com/comics/${characterId}?apiKey=${apikey}`
    );
    const data = response.data;
    console.log(response.data);
    res.json(data);
  } catch (error) {
    res.status(400).json({ error: { message: error.message } });
  }
});

module.exports = router;
