const mongoose = require('mongoose');

const AdminSchema = new mongoose.Schema({
    name:{
        type: String
    },
    email:{
        type: String
    },
    authToken:{
        type: String
    }
});

module.exports = mongoose.model('Admins', AdminSchema);