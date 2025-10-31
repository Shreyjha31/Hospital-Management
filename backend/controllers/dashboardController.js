const { Patient, Appointment, Billing, Room, Doctor } = require('../models'); // Assuming models are defined and exported

// Get total patients count
exports.getPatientsCount = async (req, res) => {
  try {
    const count = await Patient.count();
    res.json({ count });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get today's appointments count
exports.getAppointmentsTodayCount = async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const count = await Appointment.count({
      where: {
        date: {
          $gte: today,
          $lt: tomorrow,
        },
      },
    });
    res.json({ count });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get revenue this month
exports.getRevenueThisMonth = async (req, res) => {
  try {
    const now = new Date();
    const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
    const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0);

    const revenue = await Billing.sum('amount', {
      where: {
        date: {
          $gte: firstDay,
          $lte: lastDay,
        },
      },
    });
    res.json({ revenue: revenue || 0 });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get available rooms count
exports.getAvailableRoomsCount = async (req, res) => {
  try {
    const count = await Room.count({
      where: {
        status: 'available',
      },
    });
    res.json({ count });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get recent appointments
exports.getRecentAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.findAll({
      order: [['date', 'DESC'], ['time', 'DESC']],
      limit: 5,
      include: [
        { model: Patient, attributes: ['name'] },
        { model: Doctor, attributes: ['name', 'specialization'] },
      ],
    });

    const formatted = appointments.map((appt) => ({
      id: appt.id,
      patientName: appt.Patient.name,
      doctorName: appt.Doctor.name,
      doctorSpecialization: appt.Doctor.specialization,
      time: appt.time,
    }));

    res.json(formatted);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get available doctors
exports.getAvailableDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.findAll({
      where: { status: 'available' },
      attributes: ['id', 'name', 'specialization', 'photoUrl'],
    });
    res.json(doctors);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
