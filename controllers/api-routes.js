// *********************************************************************************
// api-routes.js - Routes for signup and login
// *********************************************************************************

// Dependencies
// =============================================================
const path = require("path");
const passport = require("../config/passport");


// Routes
// =============================================================
module.exports = function (app) {
    app.post("/api/login", function(req, res) {
        res.json(req.user);
      });

  app.get("/login", function (req, res) {
    if (req.user) {
      res.render("index");
    }
    res.render("login");
  });

  app.get("/home", function (req, res) {
      res.render("index");
  });

};