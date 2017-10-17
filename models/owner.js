module.exports = function(sequelize, DataTypes) {
  var Owner = sequelize.define('Owner', {
    // Giving the Owner model a name of type STRING
    owner_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    owner_token: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  return Owner;
};
