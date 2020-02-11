const mongoose = require('mongoose');

const subSubRegionSchema = new mongoose.Schema({
    subSubRegion:{type:String, required:true},
    title:{type:String, required:true},
    image:{type:String}
},{_id: false});

const subRegionSchema = new mongoose.Schema({
    subRegion:{type:String, required:true},
    title:{type:String, required:true},
    image:{type:String},
    subSubRegions:[subSubRegionSchema],
},{_id: false});

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
    subRegions: [subRegionSchema]
});

module.exports = mongoose.model('Explorelab', ExplorelabSchema);