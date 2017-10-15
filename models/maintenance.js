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

  return Maintenance;
};
