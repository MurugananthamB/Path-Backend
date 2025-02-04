const express = require("express");
const Patient = require("../models/Patient");
const router = express.Router();

router.post("/add-patient", async (req, res) => {
  try {
    let {
      pathId,
      uhid,
      patientName,
      age,
      gender,
      date,
      time,
      barcode,
      userId,
    } = req.body;

    // ✅ Convert `userId` to a string if necessary
    const storedUserId = userId ? String(userId) : null;

    // ✅ Validate input (Ensure all fields are received)
    if (
      ![
        pathId,
        uhid,
        patientName,
        age,
        gender,
        barcode,
        date,
        time,
        storedUserId,
      ].every(Boolean)
    ) {
      return res
        .status(400)
        .json({ error: "All fields, including user ID, are required." });
    }

    // ✅ Check if the patient already exists
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
      barcode,
      userId: storedUserId, // ✅ Store user ID correctly
    });

    await newPatient.save();
    console.log("✅ Patient data saved successfully:", newPatient);
    res
      .status(201)
      .json({ message: "Patient data added successfully!", data: newPatient });
  } catch (error) {
    console.error("❌ Error adding patient:", error);
    res.status(500).json({ error: "Server error. Please try again later." });
  }
});

module.exports = router;
