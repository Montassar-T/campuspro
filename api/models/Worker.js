const mongoose = require('mongoose');




const workerSchema = new mongoose.Schema({
    lastName :{
        type: String,
        required: true
    },
    firstName :{
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
    },
    userId:{
        type: String,
        required:true
    }
},{timestamps:true , collection:'workers'})


module.exports = mongoose.model('Worker',workerSchema)