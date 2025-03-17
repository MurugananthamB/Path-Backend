const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const https = require("https");
const cors = require("cors");
require("dotenv").config(); // Load .env variables

// Import Routes
const patientRoutes = require("./routes/patientsroutes");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");


const app = express();
const PORT = process.env.PORT || 10000;
const MONGO_URI = process.env.MONGO_URI;
const SERVER_URL = process.env.RENDER_EXTERNAL_URL;

if (!MONGO_URI) {
  console.error("❌ MONGO_URI is not set in environment variables!");
  process.exit(1);
}

// Middleware
app.use(bodyParser.json());
app.use(cors());

// MongoDB Connection (Fixed)
mongoose
  .connect(MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected Successfully"))
  .catch((err) => {
    console.error("❌ MongoDB Connection Error:", err.message);
    process.exit(1); // Exit process if MongoDB fails to connect
  });

// Routes
app.use("/api/patients", patientRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/auth/users", userRoutes);

// Keep Server Awake (Only for free-tier Render)
if (SERVER_URL) {
  setInterval(() => {
    https.get(SERVER_URL, (res) => {
      console.log(`🔄 Keep-alive request sent. Status: ${res.statusCode}`);
    }).on("error", (err) => {
      console.error("⚠️ Keep-alive request failed:", err.message);
    });
  }, 30 * 60 * 1000); // Every 5 minutes
}

// Start Server (Ensure it binds to 0.0.0.0)
app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

// Default Route
app.get("/", (req, res) => {
  res.send("Welcome to Pathology Lab Report API");
});

