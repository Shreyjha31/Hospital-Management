const Laboratory = require('../models/laboratory');

const getLaboratories = async (req, res) => {
  try {
    const laboratories = await Laboratory.findAll();
    res.json(laboratories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const addLaboratory = async (req, res) => {
  try {
    const laboratory = await Laboratory.create(req.body);
    res.status(201).json({ message: "Laboratory added", laboratory });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getLaboratories, addLaboratory };
