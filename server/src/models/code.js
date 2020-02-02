const mongoose = require('mongoose');

const CodeSchema = new mongoose.Schema({
    code:{
        type: String,
        required: true,
        min: 8,
        max: 1024
    }
});

module.exports = mongoose.model('Code', CodeSchema);