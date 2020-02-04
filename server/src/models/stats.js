const mongoose = require('mongoose');

const StatSchema = new mongoose.Schema({
    university:{
        type: String
    },
    degree:{
        type: String
    },
    educationLevel:{
        type: String
    },
    year:{
        type: Number
    }
});

module.exports = mongoose.model('Stats', StatSchema);