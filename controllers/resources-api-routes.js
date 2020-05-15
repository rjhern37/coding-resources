// *********************************************************************************
// resources-api-routes.js - Routes for displaying and saving data to the resources table
// *********************************************************************************

// Dependencies
// =============================================================
const db = require("../models");
const passport = require("../config/passport");
const authenticate = require("../config/authenticate");

// db.Resources.destroy({
//   where: {
//     id: 44,
//   },
// });

// Routes
// =============================================================
module.exports = function (app) {
  // Find resource by name
  app.get("/api/resources/:name", function (req, res) {
    db.Resources.findOne({
      where: {
        resourceName: req.params.name,
      },
    })
      .then(function (data) {
        res.json(data);
      })
      .catch(function (err) {
        res.status(500).send(err);
      });
  });

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

  // Create new Resource-Tag relation (Tag a new resource)
  app.post("/api/resource/tags", function (req, res) {
    let resourceId = +req.body.resourceId;
    let tags = req.body.tags;
    // console.log("Resource ID", resourceId);
    // console.log("Tag IDs", tags);
    tags.forEach(tag => {
      db.ResourceTags.create({
        ResourceId: resourceId,
        TagId: +tag
      })
        .then(function (data) {
          res.json(data);
        })
        .catch(function (err) {
          res.status(500).send(err);
        });
    });
  });

  // Delete resource (server-side only)
  app.delete("/api/resources/delete", function (req, res) {
    db.Resources.destroy({
      where: {
        id: "",
      },
    });
  });
};
