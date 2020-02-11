const mongoose = require('mongoose');

const subSubRegionSchema = new mongoose.Schema({
    subSubRegion:{type:String, required:true},
    title:{type:String, required:true},
    image:{type:String}
});

const subRegionSchema = new mongoose.Schema({
    subRegion:{type:String, required:true},
    title:{type:String, required:true},
    image:{type:String},
    subSubRegions:[subSubRegionSchema],
});

const ExplorelabSchema = new mongoose.Schema({
    region:{
        type: String,
        required: true
    },
    image:{
        type: String
    },
    subRegionNames: {
        type: Array
    },
    subSubRegionNames: {
        type: Array
    },
    subRegions: [subRegionSchema]
});

module.exports = mongoose.model('Explorelab', ExplorelabSchema);