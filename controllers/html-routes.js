// *********************************************************************************
// html-routes.js - this file offers a set of routes for sending users to the various html pages
// *********************************************************************************

// Dependencies
// =============================================================
const path = require("path");
const authenitcate = require("../config/authenticate");


// Routes
// =============================================================
module.exports = function (app) {
  app.get("/", function (req, res) {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.render("index");
    }
    res.render("signup");
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
