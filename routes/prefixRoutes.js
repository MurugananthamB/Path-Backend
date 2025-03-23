const express = require("express");
const router = express.Router();
const Prefix = require("../models/prefix");


// Add Prefix API
router.post("/add-prefix", async (req, res) => {
  try {
    const { prefix, description } = req.body;

    const newPrefix = new Prefix({
      prefix,
      description,
    });

    await newPrefix.save();
    res
      .status(201)
      .json({ message: "Prefix Added Successfully", data: newPrefix });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error", error: err.message });
  }
});

// Get Prefixes API
router.get("/get-prefixes", async (req, res) => {
  try {
    const prefixes = await Prefix.find();
    res.status(200).json(prefixes);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error", error: err.message });
  }
});

// You can also add GET, DELETE, etc., if needed.
router.put("/update-prefix/:id", async (req, res) => {
  try {
    const { prefix, description } = req.body;
    const updated = await Prefix.findByIdAndUpdate(
      req.params.id,
      { prefix, description },
      { new: true }
    );
    res.status(200).json({ message: "Updated Successfully", data: updated });
  } catch (err) {
    res.status(500).json({ message: "Update Failed", error: err.message });
  }
});

router.put("/inactive-prefix/:id", async (req, res) => {
  try {
    const updated = await Prefix.findByIdAndUpdate(
      req.params.id,
      { status: "Inactive" }, // Add a status field to schema if not added already
      { new: true }
    );
    res.status(200).json({ message: "Prefix Inactivated", data: updated });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to Inactivate", error: err.message });
  }
});

router.put("/activate-prefix/:id", async (req, res) => {
  try {
    const updated = await Prefix.findByIdAndUpdate(
      req.params.id,
      { status: "Active" },
      { new: true }
    );
    res.status(200).json({ message: "Prefix Activated", data: updated });
  } catch (err) {
    res.status(500).json({ message: "Failed to Activate", error: err.message });
  }
});



module.exports = router;
