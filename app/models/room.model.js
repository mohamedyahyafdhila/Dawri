const mongoose = require("mongoose");

const Room = mongoose.model(
  "Rooms",
  new mongoose.Schema({
    name: String,
    max_client: Number,
    duration: Number,
    owner: User
  })
);

module.exports = Room;
