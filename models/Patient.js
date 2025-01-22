const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema({
  pathId: { type: String, required: true },
  uhid: { type: String, required: true },
  patientName: { type: String, required: true },
  age: { type: Number, required: true },
  gender: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
});

module.exports = mongoose.model("Patient", patientSchema);
