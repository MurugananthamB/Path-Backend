const express = require("express");
const Patient = require("../models/Patient");
const router = express.Router();

router.post("/add-patient", async (req, res) => {
  try {
    console.log("Received Patient Data:", req.body); // Debugging line

    const newPatient = new Patient(req.body);
    await newPatient.save();

    res.status(201).json({ message: "Patient data added successfully!" });
  } catch (error) {
    console.error("Error adding patient:", error); // Log error details

    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
