module.exports = function(sequelize, DataTypes) {
  var Bike = sequelize.define('Bike', {
    bike_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    bike_type: {
      type: DataTypes.STRING,
      allowNull: false
    },
    bike_miles: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    purchase_date: {
      type: DataTypes.DATEONLY
    },
    owner_name: {
      type: DataTypes.STRING
    },
    owner_token: {
      type: DataTypes.STRING
    }
  });

  return Bike;
};
