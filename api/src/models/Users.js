const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
    // defino el modelo
    sequelize.define('users', {
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            isEmail:true
        }
      },
      password:{
        type: DataTypes.STRING,
        allowNull: true
      }
    });
  };
  