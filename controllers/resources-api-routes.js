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

  // Find resources by tag name
  app.get("/api/resources/:tagName", function (req, res) {
    db.Resources.findAll({
      where: {
        tagName: req.params.tagName,
      },
      include: [
        {
          model: db.Tags,
          as: "Tags",
        },
        {
          model: db.ResourceTags,
        },
      ],
    })
      .then(function (data) {
        res.json(data);
      })
      .catch(function (err) {
        res.status(500).send(err);
      });
  });

  // Create new resource
  app.post("/api/create", function (req, res) {
    db.Resources.create(req.body)
      .then(function (data) {
        res.json(data);
      })
      .catch(function (err) {
        res.status(500).send(err);
      });
  });

  // Save resource
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

};
