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
  // SIGNUP PAGE
  // Route to home page if logged in
  app.get("/signup", function (req, res) {
    if(req.user) {
      res.redirect("/");
    }
    // Route to signup if logged out
    res.render("signup", {
      title: "Sign Up",
      btnId: "signup-btn",
      btnName: "Sign Up",
      routeMsg: "Already have a username?",
      route: "/login",
      routeName: "Login",
    });
  });

  // LOGIN PAGE
  // Route to home page if logged in
  app.get("/login", function (req, res) {
    if(req.user) {
      res.redirect("/");
    }
    // Route to signup if logged out
    res.render("login", {
      title: "Login",
      btnId: "login-btn",
      btnName: "Login",
      routeMsg: "Don't have a username?",
      route: "/signup",
      routeName: "Sign up",
    });
  });

  // HOME PAGE
  app.get("/", authenticate, function (req, res) {
    // Get and display all resources
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

  // USER SAVED RESOURCES PAGE
  app.get("/saved", authenticate, async function(req, res) {
    try {
      let [result] = await db.Users.findAll({
        where: {
          id: req.user.id,
        },
        include: [
          {
            model: db.Resources,
            require: true,
          },
        ],
      });
      let resources = result.Resources.map(
        (resource) => resource.dataValues
      );
      res.render("index", {
        resources: resources,
      });
    } catch(err) {
      res.status(500).send(err);
    }
  });


  // CREATE RESOURCE PAGE
  app.get("/create", authenticate, function (req, res) {
      res.render("create");
  });

  // SEARCH RESOURCES PAGE
  app.get("/search", authenticate, function (req, res) {
    db.Tags.findAll()
    .then(function(data) {
      let tags = data.map(tag => tag.dataValues);
      res.render("search", {
        tags: tags
      });
    })
    .catch(function(err) {
      res.status(500).send(err);
    });
  });


};
