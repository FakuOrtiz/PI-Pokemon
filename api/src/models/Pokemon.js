const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  sequelize.define('pokemon', {
    id: { //data.id
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    name: { //data.name
      type: DataTypes.STRING,
      allowNull: false,
    },
    hp: { //data.stats[0].base_stat
      type: DataTypes.INTEGER
    },
    attack: { //data.stats[1].base_stat
      type: DataTypes.INTEGER
    },
    defense: {  //data.stats[2].base_stat
      type: DataTypes.INTEGER
    },
    speed: { //data.stats[5].base_stat
      type: DataTypes.INTEGER
    },
    height: { //data.height
      type: DataTypes.INTEGER
    },
    weight: { //data.weight
      type: DataTypes.INTEGER
    },
    image: { //data.sprites.front_default
      type: DataTypes.STRING
    }
  }, {
    timestamps: false
  });
};
