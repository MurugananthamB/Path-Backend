const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/user");

const router = express.Router();

// Signup Route
router.post("/signup", async (req, res) => {
  const { firstName, employeeId, password, passwordConfirmation } = req.body;

  if (!firstName || !employeeId || !password || !passwordConfirmation) {
    return res.status(400).json({ message: "All fields are required" });
  }

  if (password !== passwordConfirmation) {
    return res.status(400).json({ message: "Passwords do not match" });
  }

  const existingUser = await User.findOne({ employeeId });
  if (existingUser) {
    return res.status(400).json({ message: "Employee ID already in use" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new User({ firstName, employeeId, password: hashedPassword });

  try {
    await newUser.save();
    res.status(200).json({ message: "User created successfully" });
  } catch (error) {
    console.error("Error creating user:", error);
    res
      .status(500)
      .json({ message: "An error occurred while creating the user" });
  }
});

// Login Route
router.post("/login", async (req, res) => {
  const { employeeId, password } = req.body;

  try {
    const user = await User.findOne({ employeeId });

    if (!user) return res.status(404).json({ message: "User not found" });

    if (user.status === "inactive") {
      return res.status(403).json({ message: "Account is inactive." });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch)
      return res.status(400).json({ message: "Incorrect password" });

    res.status(200).json({ message: "Login successful" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
