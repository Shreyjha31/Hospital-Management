const express = require("express");
const router = express.Router();
const { getEquipments, addEquipment } = require("../controllers/equipmentController");

router.get("/", getEquipments);
router.post("/", addEquipment);

module.exports = router;
