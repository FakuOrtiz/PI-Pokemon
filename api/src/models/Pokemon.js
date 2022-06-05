const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  sequelize.define('pokemon', {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    nombre: { //data.name
      type: DataTypes.STRING,
      allowNull: false,
    },
    hp: { //data.stats[0]
      type: DataTypes.INTEGER
    },
    ataque: { //data.stats[1]
      type: DataTypes.INTEGER
    },
    defensa: {  //data.stats[2]
      type: DataTypes.INTEGER
    },
    velocidad: { //data.stats[3]
      type: DataTypes.INTEGER
    },
    altura: { //data.height
      type: DataTypes.INTEGER
    },
    peso: { //data.weight
      type: DataTypes.INTEGER
    },
    imagen: {
      type: DataTypes.STRING
    }
  }, {
    timestamps: false
  });
};
