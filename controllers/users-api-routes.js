// *********************************************************************************
// users-api-routes.js - Routes for displaying and saving data to the users table
// *********************************************************************************

// Dependencies
// =============================================================
const db = require("../models");
const passport = require("../config/passport");
const authenticate = require("../config/authenticate");

// Routes
// =============================================================
module.exports = function (app) {
  // Logout user
  app.get("/logout", function(req, res) {
    req.logout('user');
    res.redirect("/login");
  });

  // Login user
  app.post("/api/users/login", passport.authenticate("local"), function (req, res) {
    res.json(req.user);
    // res.render("index");
  });

  // Create new user
  app.post("/api/users/signup", function (req, res) {
    db.Users.create({
      username: req.body.username,
      password: req.body.password
    })
      .then(function (data) {
        res.json(data);
      })
      .catch(function (err) {
        res.status(401).json(err);
      });
  });

  // Create new User-Resource relationship (Save resource to user)
  app.post("/api/users/save", authenticate, function (req, res) {
    db.UserResources.create({
      UserId: req.user.id,
      ResourceId: req.body.ResourceId,
    })
      .then(function (data) {
        res.json(data);
      })
      .catch(function (err) {
        res.status(500).send(err);
      });
  });

  // Delete User-Resource relationship (Delete resource from user saved resources list)
  app.post("/api/users/remove-resource", authenticate, function (req, res) {
    db.UserResources.destroy({
      where: {
        UserId: req.user.id,
        ResourceId: req.body.ResourceId,
      }
    })
      .then(function (data) {
        res.json(data);
      })
      .catch(function (err) {
        res.status(500).send(err);
      });
  });

  // Delete user (server-side only)
  app.delete("/api/users/delete", function (req, res) {
    db.Users.destroy({
      where: {
        id: ""
      }
    });
  });
};
