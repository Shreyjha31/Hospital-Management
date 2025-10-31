const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Patient = sequelize.define('Patient', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  dateOfBirth: {
    type: DataTypes.DATE,
  },
  status: {
    type: DataTypes.STRING,
  },
  contact: {
    type: DataTypes.STRING,
  },
}, {
  timestamps: false,
});

module.exports = Patient;
