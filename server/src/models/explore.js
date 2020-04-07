const mongoose = require("mongoose");

const ExplorelabSchema = new mongoose.Schema({
  region: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  explanation: {
    type: String,
  },
});

module.exports = mongoose.model("Explorelab", ExplorelabSchema);
