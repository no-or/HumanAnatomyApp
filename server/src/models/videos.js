const mongoose = require("mongoose");

const VideoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true
  },
  link: {
    type: String,
    required: true
  },
  region: {
    type: String,
    min: 6,
    max: 255
  }
});

module.exports = mongoose.model("Video", VideoSchema);
