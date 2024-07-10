const mongoose = require('mongoose');




const workerSchema = new mongoose.Schema({
    firstName :{
        type: String,
        required: true
    },
    lastName :{
        type: String,
        required: true
    },
    cin:{
        type: String,
        minlength: 8,
        maxlength: 8,
    },
    fonction:{
        type: String,
        required:true
    }
},{timestamps:true , collection:'workers'})


module.exports = mongoose.model('Worker',workerSchema)