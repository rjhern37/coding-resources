// *********************************************************************************
// resources-api-routes.js - Routes for displaying and saving data to the resources table
// *********************************************************************************

// Dependencies
// =============================================================
var db = require("../models");

// Routes
// =============================================================
module.exports = function(app) {
  // Find all resources
  app.get("/api/resources", function(req, res) {
    db.Resources.findAll({})
      .then(function(data) {
        res.json(data);
      })
      .catch(function(err) {
        res.status(500).send(err);
      });
  });

  // Find resource by name
  app.get("/api/resources/:name", function(req, res) {
    db.Resources.findOne({
      where: {
        resourceName: req.params.name,
      },
    })
      .then(function(data) {
        res.json(data);
      })
      .catch(function(err) {
        res.status(500).send(err);
      });
  });

  // Find resources by tag name
  app.get("/api/resources/:tagName", function(req, res) {
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
        }],
    })
      .then(function(data) {
        res.json(data);
      })
      .catch(function(err) {
        res.status(500).send(err);
      });
  });

  // Create new resource
  app.post("/api/resources", function(req, res) {
    db.Resources.create(req.body)
      .then(function(data) {
        res.json(data);
      })
      .catch(function(err) {
        res.status(500).send(err);
      });
  });

  // Update a resource
  app.put("/api/resources", function(req, res) {
    db.Resources.update(
      req.body,
      {
        where: {
          id: req.body.id
        }
      })
      .then(function(dbPost) {
      res.json(dbPost);
      })
      .catch(function(err) {
        res.status(500).send(err);
      });
  });

};
