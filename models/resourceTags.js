module.exports = function(sequelize, DataTypes) {
  const ResourceTags = sequelize.define("ResourceTags", {});
  ResourceTags.associate = function(models) {
    models.Resources.belongsToMany(models.Tags, { through: ResourceTags });
    models.Tags.belongsToMany(models.Resources, { through: ResourceTags });
  };

  return ResourceTags;
};
