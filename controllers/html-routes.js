// *********************************************************************************
// html-routes.js - Routes for sending users to the various html pages
// *********************************************************************************

// Dependencies
// =============================================================
const path = require("path");
const db = require("../models");
const authenticate = require("../config/authenticate");


// Routes
// =============================================================
module.exports = function (app) {
  app.get("/", function (req, res) {
    // If the user already has an account send them to the members page
    if(req.user) {
      res.render("index");
    }
    res.render("signup");
  });

  app.get("/login", function (req, res) {
    if(req.user) {
      res.render("index");
    }
    res.render("login");
  });

  app.get("/home", function (req, res) {
    db.Resources.findAll({})
    .then(function(data) {
      let resources = data.map(resource => resource.dataValues);
      res.render("index", {
        resources: resources
      });
    })
    .catch(function(err) {
      res.status(500).send(err);
    });
  });

  app.get("/cms", function (req, res) {
      res.render("cms");
  });


};
