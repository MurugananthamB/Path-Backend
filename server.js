const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config(); // Load .env variables

const patientRoutes = require("./routes/patientsroutes");

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  console.error("❌ MONGO_URI is not set in environment variables!");
  process.exit(1);
}

// Middleware
app.use(bodyParser.json());
app.use(cors());

// MongoDB Connection (Fixed)
mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000, // Fail fast if MongoDB is unavailable
    connectTimeoutMS: 10000, // Retry connecting for 10 seconds
  })
  .then(() => console.log("✅ MongoDB Connected Successfully"))
  .catch((err) => {
    console.error("❌ MongoDB Connection Error:", err.message);
    process.exit(1); // Exit process if MongoDB fails to connect
  });

// Routes
app.use("/api/patients", patientRoutes);

// Start Server
app.listen(PORT, () => {
  console.log(
    `✅ Server running on ${
      process.env.RENDER_EXTERNAL_URL || `http://localhost:${PORT}`
    }`
  );
});

// Default Route
app.get("/", (req, res) => {
  res.send("Welcome to Pathology Lab Report API");
});
