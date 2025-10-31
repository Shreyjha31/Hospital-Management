const Equipment = require('../models/equipment');

const getEquipments = async (req, res) => {
  try {
    const equipments = await Equipment.findAll();
    res.json(equipments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const addEquipment = async (req, res) => {
  try {
    const equipment = await Equipment.create(req.body);
    res.status(201).json({ message: "Equipment added", equipment });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getEquipments, addEquipment };
