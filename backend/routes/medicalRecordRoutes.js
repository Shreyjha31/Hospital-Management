const express = require("express");
const router = express.Router();
const { getMedicalRecords, addMedicalRecord } = require("../controllers/medicalRecordController");

router.get("/", getMedicalRecords);
router.post("/", addMedicalRecord);

module.exports = router;
