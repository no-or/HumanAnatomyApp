const mongoose = require("mongoose");

const CodeSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
    min: 8,
    max: 1024
  },
  date: {
    type: Date,
    default: Date.now
  },
  createdBy: {
    type: String,
    required: true,
    unique: true
  }
});

module.exports = mongoose.model("Code", CodeSchema);
