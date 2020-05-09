module.exports = function(sequelize, DataTypes) {
  const Resource = sequelize.define("Resource", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 100],
      },
    },
    description: {
      type: DataTypes.TEXT,
      validate: {
        len: [1, 250],
      },
    },
    link: {
      type: DataTypes.STRING,
      validate: {
        isUrl: true,
      },
    },
    saved: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    featured: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  });

  Resource.associate = function(models) {
    Resource.hasMany(models.Tag);
  };

  return Resource;
};
