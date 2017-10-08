module.exports = function(sequelize, DataTypes) {
    var Owner = sequelize.define("Owner", {
      // Giving the Owner model a name of type STRING
      name: DataTypes.STRING
    });
  
    Owner.associate = function(models) {
      // Associating Owner with Bikes
      // When an Owner is deleted, also delete any associated Bikes
      Owner.hasMany(models.Bike, {
        onDelete: "cascade"
      });
    };
  
    return Owner;
  };
  