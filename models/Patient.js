const mongoose = require("mongoose");

const PatientSchema = new mongoose.Schema({
  pathId: { type: String, required: true },
  uhid: { type: String, required: true },
  patientName: { type: String, required: true },
  age: { type: Number, required: true },
  gender: { type: String, required: true },
  date: { type: String, required: true }, // Ensure the frontend sends this
  time: { type: String, required: true }, // Ensure the frontend sends this
});

module.exports = mongoose.model("Patient", PatientSchema);
