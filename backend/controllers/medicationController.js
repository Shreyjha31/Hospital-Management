const Medication = require('../models/medication');

const getMedications = async (req, res) => {
  try {
    const medications = await Medication.findAll();
    res.json(medications);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const addMedication = async (req, res) => {
  try {
    const medication = await Medication.create(req.body);
    res.status(201).json({ message: "Medication added", medication });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getMedications, addMedication };
