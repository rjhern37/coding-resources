// *********************************************************************************
// users-api-routes.js - Routes for displaying and saving data to the users table
// *********************************************************************************

// Dependencies
// =============================================================
const db = require("../models");
const passport = require("../config/passport");

// Routes
// =============================================================
module.exports = function (app) {
  // Login user
  app.post("/api/login", function (req, res) {
    res.render("index");
  });

  // Create new user
  app.post("/api/signup", function (req, res) {
    db.Users.create(req.body)
      .then(function () {
        res.render("login");
      })
      .catch(function (err) {
        res.status(401).json(err);
      });
  });
};
