const express = require("express");
const Patient = require("../models/Patient");
const router = express.Router();

router.post("/add-patient", async (req, res) => {
  try {
    let {
      prefix,
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
        prefix,
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
    const existingPatient = await Patient.findOne({
      prefix: req.body.prefix,
      pathId: req.body.pathId,
    });
    if (existingPatient) {
      return res
        .status(409)
        .json({ error: "Patient already exists with this Path ID against Prefix." });
    }

    // ✅ Save New Patient
    const newPatient = new Patient({
      prefix,
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


router.get("/get-patient/:pathId", async (req, res) => {
  try {
    const { pathId } = req.params;
    const patient = await Patient.findOne({ pathId });

    if (!patient) {
      return res.status(404).json({ error: "Patient not found" });
    }

    res.json(patient);
  } catch (error) {
    console.error("Error fetching patient data:", error);
    res.status(500).json({ error: "Server error. Please try again later." });
  }
});

// ✅ Get all unique prefixes for a given pathId
router.get("/get-prefixes-for-pathid/:pathId", async (req, res) => {
  try {
    const { pathId } = req.params;

    // Find all matching records with this pathId
    const records = await Patient.find({ pathId }).select("prefix -_id");

    if (!records || records.length === 0) {
      return res.status(404).json([]);
    }

    // Extract unique prefixes
    const uniquePrefixes = [...new Set(records.map((rec) => rec.prefix))];

    res.json(uniquePrefixes);
  } catch (error) {
    console.error("Error fetching prefixes:", error);
    res.status(500).json({ error: "Server error. Please try again later." });
  }
});

// ✅ Get patient record by pathId + prefix (for reprint screen)
router.get("/get-patient/:prefix/:pathId", async (req, res) => {
  try {
    const { prefix, pathId } = req.params;

    const patient = await Patient.findOne({ prefix, pathId });

    if (!patient) {
      return res.status(404).json({ error: "Patient not found" });
    }

    res.json(patient);
  } catch (error) {
    console.error("Error fetching patient:", error);
    res.status(500).json({ error: "Server error. Please try again later." });
  }
});

// ✅ API to Fetch All Patients (With Optional Filters)
router.get("/get-all", async (req, res) => {
  try {
    const { pathId, uhid, fromDate, toDate } = req.query;
    let filter = {};

    if (pathId) filter.pathId = pathId;
    if (uhid) filter.uhid = uhid;
    if (fromDate && toDate) {
      filter.date = { $gte: new Date(fromDate), $lte: new Date(toDate) };
    }

    const patients = await Patient.find(filter)
      .sort({ date: -1 })
      .select("date time pathId uhid patientName age gender userId prefix")
      .populate("userId", "firstName employeeId"); // ✅ Populate user details!

    res.status(200).json(patients);
  } catch (error) {
    console.error("Error fetching patients:", error);
    res.status(500).json({ error: "Failed to fetch patient data" });
  }
});


module.exports = router;
