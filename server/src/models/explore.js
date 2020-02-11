const mongoose = require('mongoose');

const ExplorelabSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
        unique: true
    },
    image:{
        type: String
    },
    region:{
        type: String
    }
});

module.exports = mongoose.model('Explorelab', ExplorelabSchema);