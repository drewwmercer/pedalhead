module.exports = function(sequelize, DataTypes) {
    var Bike = sequelize.define("Bike", {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1]
        }
      },
      body: {
        type: DataTypes.TEXT,
        allowNull: false,
        len: [1]
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
  