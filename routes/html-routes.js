// *********************************************************************************
// html-routes.js - this file offers a set of routes for sending users to the various html pages
// *********************************************************************************

// Dependencies
// =============================================================
var path = require("path");

// Routes
// =============================================================
module.exports = function(app) {

  // Each of the below routes just handles the HTML page that the user gets sent to.

  // index route loads app.html
  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/app.html"));
  });

  // manage route loads manage.html
  app.get("/manage", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/manage.html"));
  });

  // app route loads app.html
  app.get("/app", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/app.html"));
  });

  // authors route loads owner-manager.html
  app.get("/owners", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/owner-list.html"));
  });

};
