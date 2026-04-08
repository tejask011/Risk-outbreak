//Defines database structure for raw data

const mongoose = require("mongoose");

const caseSchema = new mongoose.Schema({
  city: String,
  disease: String,
  cases: Number,
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Case", caseSchema);