const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/user");

const router = express.Router();

// Get All Users
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: "Error fetching users" });
  }
});

// Get User by Employee ID
router.get("/:employeeId", async (req, res) => {
  const { employeeId } = req.params;
  try {
    const user = await User.findOne({ employeeId });
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Error fetching user" });
  }
});

// Update User Info
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { firstName, employeeId, password } = req.body;

  try {
    const updates = {};
    if (firstName) updates.firstName = firstName;
    if (employeeId) updates.employeeId = employeeId;

    if (password) updates.password = await bcrypt.hash(password, 10);

    const user = await User.findByIdAndUpdate(id, updates, { new: true });

    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: "Error updating user" });
  }
});

// Reset Password
router.put("/:id/reset-password", async (req, res) => {
  const { id } = req.params;
  const { password } = req.body;

  if (!password)
    return res.status(400).json({ message: "Password is required." });

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.findByIdAndUpdate(
      id,
      { password: hashedPassword },
      { new: true }
    );

    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json({ message: "Password reset successfully." });
  } catch (err) {
    res.status(500).json({ message: "Error resetting password" });
  }
});

// Update User Status
router.put("/:id/status", async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const user = await User.findByIdAndUpdate(id, { status }, { new: true });

    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json({ message: `User status updated to ${status}` });
  } catch (err) {
    res.status(500).json({ message: "Error updating status" });
  }
});

module.exports = router;
