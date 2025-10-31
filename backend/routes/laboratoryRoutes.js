const express = require("express");
const router = express.Router();
const { getLaboratories, addLaboratory } = require("../controllers/laboratoryController");

router.get("/", getLaboratories);
router.post("/", addLaboratory);

module.exports = router;
