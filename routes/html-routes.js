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

  // app route loads app.html
  app.get("/app", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/app.html"));
  });

  // authors route loads owner-manager.html
  app.get("/owners", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/owner-list.html"));
  });

  // adds a new bike to the database
  app.get("/new-bike", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/newBike.html"));
  });

  // views your current bikes
  app.get("/my-garage", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/MyGarage.html"));
  });

    // authors route loads owner-manager.html
  app.get("/service-manager", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/ServMngr.html"));
  });

};
