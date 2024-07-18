const mongoose = require("mongoose");

const absenceScheme = new mongoose.Schema(
  {
    workerId: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
  },
  { timestamps: true, collection: "absences" }
);

module.exports = mongoose.model("Absence", absenceScheme);
