const MedicalRecord = require('../models/medicalRecord');

const getMedicalRecords = async (req, res) => {
  try {
    const medicalRecords = await MedicalRecord.findAll();
    res.json(medicalRecords);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const addMedicalRecord = async (req, res) => {
  try {
    const medicalRecord = await MedicalRecord.create(req.body);
    res.status(201).json({ message: "Medical record added", medicalRecord });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getMedicalRecords, addMedicalRecord };
