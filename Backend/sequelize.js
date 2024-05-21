// sequelize.js
const { Sequelize, DataTypes } = require('sequelize');
const dotenv = require('dotenv');

dotenv.config();

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'mysql'
});

const FuelRecord = sequelize.define('FuelRecord', {
  usuario: {
    type: DataTypes.STRING
  },
  estacion: {
    type: DataTypes.STRING
  },
  fecha: {
    type: DataTypes.DATE
  },
  litros: {
    type: DataTypes.INTEGER
  },
  pesos: {
    type: DataTypes.INTEGER
  },
  kilometraje: {
    type: DataTypes.INTEGER
  },
  kmsRecorrido: {
    type: DataTypes.INTEGER
  },
  kmsPorLitro: {
    type: DataTypes.INTEGER
  }
});

// Exportar sequelize y el modelo
module.exports = { sequelize, FuelRecord };
