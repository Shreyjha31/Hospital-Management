const Billing = require('../models/billing');

const getBillings = async (req, res) => {
  try {
    const billings = await Billing.findAll();
    res.json(billings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const addBilling = async (req, res) => {
  try {
    const billing = await Billing.create(req.body);
    res.status(201).json({ message: "Billing added", billing });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getBillings, addBilling };
