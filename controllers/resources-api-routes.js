// *********************************************************************************
// resources-api-routes.js - Routes for displaying and saving data to the resources table
// *********************************************************************************

// https://medium.com/@the_ozmic/how-to-create-many-to-many-relationship-using-sequelize-orm-postgres-on-express-677753a3edb5

// Dependencies
// =============================================================
const db = require("../models");

// Routes
// =============================================================
module.exports = function (app) {
  // Find all resources
  app.get("/api/resources", function (req, res) {
    db.Resources.findAll({})
      .then(function (data) {
        let resources = data.map((resource) => resource.dataValues);
        res.render("index", {
          resources: resources,
        });
      })
      .catch(function (err) {
        res.status(500).send(err);
      });
  });

  // Find resource by username
  app.get("/api/saved", function (req, res) {
    db.Users.findAll({
      where: {
        id: req.headers["x-user-id"]
      },
    })
      .then(function (data) {
        res.json(data);
      })
      .catch(function (err) {
        res.status(500).send(err);
      });
  });

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
  app.post("/api/resources", function (req, res) {
    db.Resources.create(req.body)
      .then(function (data) {
        res.json(data);
      })
      .catch(function (err) {
        res.status(500).send(err);
      });
  });

  // Save resource
  app.post("/api/save", function (req, res) {
    db.UserResources.create({
      UserId: req.headers["x-user-id"],
      ResourceId: req.body.ResourceId,
    })
      .then(function (data) {
        res.json(data);
      })
      .catch(function (err) {
        res.status(500).send(err);
      });
  });

  // Update a resource
  // app.put("/api/resources", function(req, res) {
  //   db.Resources.update(
  //     req.body,
  //     {
  //       where: {
  //         id: req.body.id
  //       }
  //     })
  //     .then(function(dbPost) {
  //     res.json(dbPost);
  //     })
  //     .catch(function(err) {
  //       res.status(500).send(err);
  //     });
  // });
};
