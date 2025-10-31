const Appointment = require('../models/appointment');

const getAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.findAll();
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const addAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.create(req.body);
    res.status(201).json({ message: "Appointment added", appointment });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getAppointments, addAppointment };
