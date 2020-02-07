const mongoose = require('mongoose');

const ExplorelabSchema = new mongoose.Schema({
    section:{
        type: String,
        required: true
    },
    title:{
        type: String,
        required: true,
        unique: true
    },
    children:{
        type: Array
    },
    image:{
        type: String
    }
});

module.exports = mongoose.model('Explorelab', ExplorelabSchema);