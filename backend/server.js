require('dotenv').config();
const express = require("express");
const cors = require("cors");
const sequelize = require("./config/database");

const patientRoutes = require("./routes/patientroutes");
const appointmentRoutes = require("./routes/appointmentRoutes");
const doctorRoutes = require("./routes/doctorRoutes");
const billingRoutes = require("./routes/billingRoutes");
const equipmentRoutes = require("./routes/equipmentRoutes");
const laboratoryRoutes = require("./routes/laboratoryRoutes");
const medicalRecordRoutes = require("./routes/medicalRecordRoutes");
const medicationRoutes = require("./routes/medicationRoutes");
const staffRoutes = require("./routes/staffRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/patients", patientRoutes);
app.use("/appointments", appointmentRoutes);
app.use("/doctors", doctorRoutes);
app.use("/billings", billingRoutes);
app.use("/equipments", equipmentRoutes);
app.use("/laboratories", laboratoryRoutes);
app.use("/medicalrecords", medicalRecordRoutes);
app.use("/medications", medicationRoutes);
app.use("/staff", staffRoutes);
app.use("/dashboard", dashboardRoutes);

sequelize.sync({ alter: true, logging: console.log }).then(() => {
  app.listen(5000, () => {
    console.log("Server running on port 5000");
  });
}).catch((error) => {
  console.error("Unable to connect to the database:", error);
});
