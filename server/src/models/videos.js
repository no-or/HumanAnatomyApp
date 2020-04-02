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
    type: String
  }
});

module.exports = mongoose.model("Video", VideoSchema);
