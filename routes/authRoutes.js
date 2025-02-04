const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
require("dotenv").config;

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
  try {
    const { employeeId, password } = req.body;

    // ✅ Check if the user exists
    const user = await User.findOne({ employeeId });
    if (!user) {
      return res
        .status(401)
        .json({ message: "Invalid Employee ID or Password." });
    }

    // ✅ Verify Password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ message: "Invalid Employee ID or Password." });
    }

    // ✅ Generate JWT Token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    // ✅ Send Response with Correct Data
    res.status(200).json({
      message: "Login successful",
      userId: user._id, // ✅ Ensure this is returned
      token, // Optional: Include a JWT Token for authentication
    });
  } catch (error) {
    console.error("❌ Error logging in:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
});

module.exports = router;