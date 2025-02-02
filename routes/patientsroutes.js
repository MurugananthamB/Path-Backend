const express = require("express");
const Patient = require("../models/Patient");
const router = express.Router();

router.post("/add-patient", async (req, res) => {
  try {
    const { pathId, uhid, patientName, age, gender, date, time, barcode } =
      req.body;



    if (!barcode) {
      console.error("🚨 Error: Barcode is missing!");
      return res.status(400).json({ error: "Barcode is missing!" });
    }

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
