const mongoose = require('mongoose');

const ImageSchema = new mongoose.Schema({
    source:{
        type: Array
    },
    label:{
        type: String
    },
    system:{
        type: Array
    },
    region:{
        type: Array
    },
    subRegion:{
        type: String
    }
});

module.exports =  mongoose.model('Images', ImageSchema);