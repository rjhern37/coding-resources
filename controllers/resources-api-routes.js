// *********************************************************************************
// resources-api-routes.js - Routes for displaying and saving data to the resources table
// *********************************************************************************

// Dependencies
// =============================================================
const db = require("../models");
const passport = require("../config/passport");
const authenticate = require("../config/authenticate");

// Routes
// =============================================================
module.exports = function (app) {

  // Create new resource
  app.post("/api/resources/create", function (req, res) {
    db.Resources.create(req.body)
      .then(function (data) {
        res.json(data);
      })
      .catch(function (err) {
        res.status(500).send(err);
      });
  });

  // Create new User-Resource relation (Save resource to user)
  app.post("/api/save", authenticate, function (req, res) {
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

  // Delete resource (server-side only)
  app.delete("/api/resources/delete", function (req, res) {
    db.Resources.destroy({
      where: {
        id: ""
      }
    });
  });

};
