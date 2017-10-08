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
    }
  });

  Bike.associate = function(models) {
    // We're saying that a Post should belong to an Owner
    // A Post can't be created without an Owner due to the foreign key constraint
    Bike.belongsTo(models.Owner, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Bike;
};
