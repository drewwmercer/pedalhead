module.exports = function(sequelize, DataTypes) {
    var Owner = sequelize.define("Owner", {
      // Giving the Owner model a name of type STRING
      owner_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      owner_token: {
        type: DataTypes.STRING,
        allowNull: false,
      }
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
  