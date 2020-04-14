const mongoose = require("mongoose");

const ContributorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    min: 6,
    max: 255
  },
  title: {
    type: String,
    required: true,
    max: 255,
    min: 6,
  }
});

module.exports = mongoose.model("Contributor", ContributorSchema);