const Staff = require('../models/staff');

const getStaffs = async (req, res) => {
  try {
    const staffs = await Staff.findAll();
    res.json(staffs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const addStaff = async (req, res) => {
  try {
    const staff = await Staff.create(req.body);
    res.status(201).json({ message: "Staff added", staff });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getStaffs, addStaff };
