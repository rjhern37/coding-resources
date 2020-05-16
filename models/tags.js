// https://github.com/sequelize/sequelize/issues/4524
module.exports = function(sequelize, DataTypes) {
  const Tags = sequelize.define("Tags", {
    tagName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    }
  });

  return Tags;
};

