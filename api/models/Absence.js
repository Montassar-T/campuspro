const mongoose = require("mongoose");

const absenceScheme = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  workerId: {
    type: String,
    required: true,
  },
},{timestamps:true , collection:'absences'});



module.exports = mongoose.model('Absence', absenceScheme);