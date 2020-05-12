// *********************************************************************************
// users-api-routes.js - Routes for displaying and saving data to the users table
// *********************************************************************************

// https://stackoverflow.com/questions/16434893/node-express-passport-req-user-undefined

// Dependencies
// =============================================================
const db = require("../models");
const passport = require("../config/passport");

// Routes
// =============================================================
module.exports = function (app) {
  // Login user
  app.post("/api/login", passport.authenticate("local"), function (req, res) {
    res.json(req.user);
    // res.render("index");
  });

  // Create new user
  app.post("/api/signup", function (req, res) {
    db.Users.create({
      username: req.body.username,
      password: req.body.password
    })
      .then(function () {
        res.render("login");
      })
      .catch(function (err) {
        res.status(401).json(err);
      });
  });

  // Logout user
  app.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/");
  });
};
