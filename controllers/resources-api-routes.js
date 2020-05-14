// *********************************************************************************
// resources-api-routes.js - Routes for displaying and saving data to the resources table
// *********************************************************************************

// https://medium.com/@the_ozmic/how-to-create-many-to-many-relationship-using-sequelize-orm-postgres-on-express-677753a3edb5

// Dependencies
// =============================================================
const db = require("../models");
const passport = require("../config/passport");
const authenticate = require("../config/authenticate");



// db.Resources.findAll({})
//       .then(function (data) {
//         let resources = data.map((resource) => resource.dataValues);
//         console.log(resources);
//       })

// db.Resources.findAll({}).then(function (data) {
//   let resources = data.map((resource) => resource.dataValues);
//   console.log(resources);
// });

// (async function () {
//   let [result] = await db.Users.findAll({
//     where: {
//       id: 4,
//     },
//     include: [
//       {
//         model: db.Resources,
//         required: true,
//       },
//     ],
//   });
//   let resourcesData = await result.Resources.map(
//     (resource) => resource.dataValues
//   );
//   console.log(resourcesData);
// })();

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
  app.get("/api/findSaved", authenticate, async function(req, res) {
    console.log(req.user);
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
      // console.log(resources);
  
      res.render("index", {
        resources: resources,
      });
    } catch(err) {
      res.status(500).send(err);
    }
    
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
