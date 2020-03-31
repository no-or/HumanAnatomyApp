const mongoose = require("mongoose");

const VersionSchema = new mongoose.Schema({
  subRegion: {
    type: String,
    required: true
  },
  module: {
    type: String,
    required: true
  },
  updatedOn: {
    type: Date,
    default: Date.now()
  }
});

module.exports = mongoose.model("Version", VersionSchema);
