const express = require("express");
const router = express.Router();
const { getPatientByUHID } = require("../auth/mssqlConnect");

router.get("/uhid/:uhid", async (req, res) => {
  const data = await getPatientByUHID(req.params.uhid);
  if (data) {
    res.json(data);
  } else {
    res.status(404).json({ message: "UHID not found" });
  }
});

module.exports = router;
