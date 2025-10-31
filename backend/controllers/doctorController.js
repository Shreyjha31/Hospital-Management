const Doctor = require('../models/doctor');

const getDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.findAll();
    res.json(doctors);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const addDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.create(req.body);
    res.status(201).json({ message: "Doctor added", doctor });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getDoctors, addDoctor };
