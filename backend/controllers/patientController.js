const Patient = require('../models/patient');

const getPatients = async (req, res) => {
  try {
    const patients = await Patient.findAll();
    res.json(patients);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const addPatient = async (req, res) => {
  try {
    const patient = await Patient.create(req.body);
    res.status(201).json({ message: "Patient added", patient });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getPatients, addPatient };
