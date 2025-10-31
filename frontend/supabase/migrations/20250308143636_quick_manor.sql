/*
  # Hospital Management System Schema
  # Fully aligned with current backend models and frontend usage
  # All tables use INTEGER autoIncrement primary keys
  # Fields match backend models and frontend expectations
  # Timestamps are excluded as backend models have timestamps: false
*/

-- Patients table
CREATE TABLE IF NOT EXISTS patients (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  age INTEGER,
  gender TEXT,
  contact TEXT
);

-- Doctors table
CREATE TABLE IF NOT EXISTS doctors (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  specialization TEXT
);

-- Nurses table
CREATE TABLE IF NOT EXISTS nurses (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  department TEXT NOT NULL,
  contact_number TEXT,
  email TEXT
);

-- Appointments table
CREATE TABLE IF NOT EXISTS appointments (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  patientId INTEGER NOT NULL,
  doctorId INTEGER NOT NULL,
  date DATE,
  time TIME,
  reason TEXT,
  status TEXT
);

-- Medical Records table
CREATE TABLE IF NOT EXISTS medical_records (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  patientId INTEGER,
  doctorId INTEGER,
  diagnosis TEXT NOT NULL,
  treatment_plan TEXT,
  prescription TEXT,
  notes TEXT
);

-- Billing table
CREATE TABLE IF NOT EXISTS billing (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  patientId INTEGER NOT NULL,
  amount FLOAT NOT NULL,
  date DATE,
  description TEXT
);

-- Equipment table
CREATE TABLE IF NOT EXISTS equipment (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  type TEXT NOT NULL,
  status TEXT NOT NULL,
  last_maintenance_date TIMESTAMP,
  next_maintenance_date TIMESTAMP,
  notes TEXT
);

-- Laboratory table
CREATE TABLE IF NOT EXISTS laboratory (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  test_name TEXT NOT NULL,
  test_date TIMESTAMP NOT NULL,
  results TEXT,
  status TEXT NOT NULL,
  notes TEXT
);

-- Medications table
CREATE TABLE IF NOT EXISTS medications (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  patientId INTEGER,
  medication_name TEXT NOT NULL,
  dosage TEXT NOT NULL,
  frequency TEXT NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE,
  prescribed_by INTEGER
);

-- Staff table
CREATE TABLE IF NOT EXISTS staff (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  contact TEXT
);
