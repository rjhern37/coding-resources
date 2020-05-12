// *****************************************************************************
// Server.js - This file is the initial starting point for the Node/Express server.
// ******************************************************************************

// Dependencies
// =============================================================
const express = require("express");
const session = require("express-session");
const passport = require("./config/passport");
const exphbs = require("express-handlebars");
const db = require("./models");

// Setup Express
// =============================================================
const app = express();
const PORT = process.env.PORT || 8080;

// Express - data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Express - static directory
app.use(express.static("public"));

// Express - enable sessions
app.use(session({ secret: "cat", resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

// Express - config Handlebars.
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Routes
// =============================================================
require("./controllers/html-routes.js")(app);
require("./controllers/resources-api-routes.js")(app);
require("./controllers/tags-api-routes.js")(app);
require("./controllers/users-api-routes.js")(app);

// Syncing our sequelize models and then starting our Express app
// =============================================================
db.sequelize.sync({ }).then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});
