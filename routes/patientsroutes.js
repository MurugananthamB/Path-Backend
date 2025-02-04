const express = require("express");
const Patient = require("../models/Patient");
const router = express.Router();

router.post("/add-patient", async (req, res) => {
  try {
    const { pathId, uhid, patientName, age, gender, date, time, barcode } =
      req.body;

    // ✅ Corrected Validation Check
    if (
      ![pathId, uhid, patientName, age, gender, barcode, date, time].every(
        Boolean
      )
    ) {
      return res.status(400).json({ error: "All fields are required." });
    }

    // ✅ Corrected `pathId` in Database Query
    const existingPatient = await Patient.findOne({ pathId });
    if (existingPatient) {
      return res
        .status(409)
        .json({ error: "Patient already exists with this Path ID." });
    }

    // ✅ Save New Patient
    const newPatient = new Patient({
      pathId,
      uhid,
      patientName,
      age,
      gender,
      date,
      time,
      barcode, // Ensure barcode is stored
    });

    await newPatient.save();
    console.log("✅ Patient data saved successfully:", newPatient);
    res.status(201).json({ message: "Patient data added successfully!" });
  } catch (error) {
    console.error("❌ Error adding patient:", error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
