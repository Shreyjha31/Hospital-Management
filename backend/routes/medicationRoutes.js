const express = require("express");
const router = express.Router();
const { getMedications, addMedication } = require("../controllers/medicationController");

router.get("/", getMedications);
router.post("/", addMedication);

module.exports = router;
