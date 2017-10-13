module.exports = function(sequelize, DataTypes) {
  var Bike = sequelize.define('Bike', {
    bike_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    bike_type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    bike_miles: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    purchase_date: {
      type: DataTypes.DATEONLY,
    }
  });

  Bike.associate = function(models) {
    // We're saying that a Bike should belong to an Owner
    // A Bike can't be created without an Owner due to the foreign key constraint
    Bike.belongsTo(models.Owner, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Bike;
};
