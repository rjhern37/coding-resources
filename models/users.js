module.exports = function(sequelize, DataTypes) {
  const Users = sequelize.define("Users", {
    username: DataTypes.STRING,
  });

  return Users;
};
