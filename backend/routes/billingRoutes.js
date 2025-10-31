const express = require("express");
const router = express.Router();
const { getBillings, addBilling } = require("../controllers/billingController");

router.get("/", getBillings);
router.post("/", addBilling);

module.exports = router;
