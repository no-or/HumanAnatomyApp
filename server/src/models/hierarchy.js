const mongoose = require('mongoose');

const subSubRegionSchema = new mongoose.Schema({
    subSubRegion:{
        type:String,
        required:true
    }
},{_id: false});

const subRegionSchema = new mongoose.Schema({
    subRegion:{
        type:String,
        required:true
    },
    subSubRegions:[subSubRegionSchema],
},{_id: false});

const regionSchema = new mongoose.Schema({
    region:{
        type:String,
        required:true
    },
    subRegions:[subRegionSchema],
},{_id: false});

const HierarchySchema = new mongoose.Schema({
    regions: [regionSchema]
});

module.exports = mongoose.model('Hierarchy', HierarchySchema);