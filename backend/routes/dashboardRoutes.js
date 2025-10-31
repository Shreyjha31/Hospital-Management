const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');

router.get('/patients/count', dashboardController.getPatientsCount);
router.get('/appointments/today/count', dashboardController.getAppointmentsTodayCount);
router.get('/billings/revenue/month', dashboardController.getRevenueThisMonth);
router.get('/rooms/available/count', dashboardController.getAvailableRoomsCount);
router.get('/appointments/recent', dashboardController.getRecentAppointments);
router.get('/doctors/available', dashboardController.getAvailableDoctors);

module.exports = router;
