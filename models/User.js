const mongoose = require("mongoose");

const User = mongoose.model("User", {
  username: String,
  email: String,
  surnom: String,
  password: String,
  confirmpassword: String,
  token: String,
  hash: String,
  salt: String,
});

module.exports = User;
