const bcrypt = require("bcryptjs");

module.exports = function(sequelize, DataTypes) {
  const Users = sequelize.define("Users", {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  // Check unhashed password against hashed password in db
  Users.prototype.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
  };

  // Automatically hashes user password
  Users.addHook("beforeCreate", function(user) {
    user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
  });

  return Users;
};
