const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Laboratory = sequelize.define('Laboratory', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  testName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  patientId: {
    type: DataTypes.INTEGER,
  },
  result: {
    type: DataTypes.TEXT,
  },
  date: {
    type: DataTypes.DATEONLY,
  },
}, {
  timestamps: false,
});

module.exports = Laboratory;
