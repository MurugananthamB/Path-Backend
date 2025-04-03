const mongoose = require("mongoose");

const PrefixSchema = new mongoose.Schema(
  {
    prefix: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    status: { type: String, default: "Active" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Prefix", PrefixSchema);