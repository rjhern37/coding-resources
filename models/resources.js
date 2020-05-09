module.exports = function(sequelize, DataTypes) {
  const Resources = sequelize.define("Resources", {
    resourceName: {
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
    featured: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  });

  return Resources;
};
