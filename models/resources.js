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
      defaultValue: "No description"
    },
    link: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isUrl: true,
      },
    }
  });

  return Resources;
};
