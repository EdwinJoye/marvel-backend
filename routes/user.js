const express = require("express");
const router = express.Router();
const uid2 = require("uid2");
const SHA256 = require("crypto-js/sha256");
const encBase64 = require("crypto-js/enc-base64");
// require("dotenv").config();

const User = require("../models/User");

router.post("/signup", async (req, res) => {
  try {
    const { email, username, password } = req.fields;
    console.log(req.fields);
    console.log("pass1");
    const emailUsed = await User.findOne({ email: email });
    console.log("pass2");
    console.log(emailUsed);
    const usernameUsed = await User.findOne({ username: username });
    console.log(7);
    if (!usernameUsed) {
      if (!emailUsed) {
        if (email && username && password) {
          const token = uid2(16);
          const salt = uid2(16);
          console.log(SHA256(password + salt));
          const hash = SHA256(password + salt).toString(encBase64);

          const newUser = new User({
            email,
            username,
            password,
            token,
            salt,
            hash,
          });
          await newUser.save();
          res.status(200).json({
            _id: newUser._id,
            email: newUser.email,
            description: newUser.description,
            username: newUser.username,
            token: newUser.token,
          });
        } else {
          res.status(400).json({ error: "missing parameters" });
        }
      } else {
        res.status(400).json({ error: "This email has already been used" });
      }
    } else {
      res.status(400).json({ error: "This username has already been used" });
    }
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ error: error.message });
  }
});
module.exports = router;
