const mongoose = require("mongoose");

const PatientSchema = new mongoose.Schema({
  pathId: { type: String, required: true },
  uhid: { type: Number, required: true },
  patientName: { type: String, required: true },
  age: { type: Number, required: true },
  gender: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  barcode: { type: String },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // ✅ Corrected reference
});

module.exports = mongoose.model("Patient", PatientSchema);
