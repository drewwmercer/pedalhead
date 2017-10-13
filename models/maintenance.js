module.exports = function(sequelize, DataTypes) {
  var Maintenance = sequelize.define('Maintenance', {
    repair_item: {
      type: DataTypes.STRING,
      allowNull: false
    },
    repair_type: {
      type: DataTypes.STRING,
      allowNull: false
    },
    interval_miles: {
      type: DataTypes.INTEGER
    }
  });

  Maintenance.associate = function(models) {
    // We're saying that a Bike should belong to an Owner
    // A Bike can't be created without an Owner due to the foreign key constraint
    Maintenance.belongsTo(models.Bike, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Maintenance;
};
