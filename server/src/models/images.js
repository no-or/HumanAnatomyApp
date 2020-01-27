const mongoose = require('mongoose');

const ImageSchema = new mongoose.Schema({
    url:{
        type: String
    },
    region:{
        type: String
    },
    subRegion:{
        type: String
    },
    highlighted: {
        type: Boolean
    }
});

module.exports =  mongoose.model('Images', ImageSchema);