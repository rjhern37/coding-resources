module.exports = function(sequelize, DataTypes) {
  const UserResources = sequelize.define("UserResources", {});
  UserResources.associate = function(models) {
    models.Users.belongsToMany(models.Resources, { through: UserResources });
    models.Resources.belongsToMany(models.Users, { through: UserResources });
  };

  return UserResources;
};
