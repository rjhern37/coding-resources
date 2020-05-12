// *********************************************************************************
// html-routes.js - this file offers a set of routes for sending users to the various html pages
// *********************************************************************************

// Dependencies
// =============================================================
var path = require("path");

// Routes
// =============================================================
module.exports = function(app) {

  app.get("/", function(req, res) {
    res.render("index");
  });
};

app.get("/", function(req, res) {
  res.sendFile(path.join(_dirname, "..public/script.html"));
});

app.get("/line", function(req, res) {
  res.sendFile(path.join(_dirname, "../public/line-manager.html"))
});
