const { DataTypes } = require('sequelize');
const sequelize = require('./db');
const Paciente = sequelize.define('paciente', {
  CPF: {type: DataTypes.STRING(14), primaryKey: true,
    autoIncrement: false,
  },
  Nome: {type: DataTypes.STRING(40),allowNull: false,
  },
  Idade: { type: DataTypes.INTEGER(11),allowNull: false,
  },
  DiaMarcado: { type: DataTypes.DATE,allowNull: false,
  },
  HoraMarcada: { type: DataTypes.TIME,allowNull: false,
  },
}, {tableName: 'paciente',timestamps: false, 
});
module.exports = Paciente;