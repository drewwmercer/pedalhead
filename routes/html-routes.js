// *********************************************************************************
// html-routes.js - this file offers a set of routes for sending users to the various html pages
// *********************************************************************************

// Dependencies
// =============================================================
var path = require('path');
var db = require('../models');

// Routes
// =============================================================
module.exports = function(app) {
  // Each of the below routes just handles the HTML page that the user gets sent to.

  // index route loads app.html
  app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '../public/app.html'));
  });

  // app route loads app.html
  app.get('/app', function(req, res) {
    res.sendFile(path.join(__dirname, '../public/app.html'));
  });

  // owners route loads owner-manager.html
  app.get('/owners', function(req, res) {
    res.sendFile(path.join(__dirname, '../public/owner-list.html'));
  });

  // adds a new bike to the database
  app.get('/new-bike', function(req, res) {
    // res.sendFile(path.join(__dirname, '../public/newBike.html'));
    res.render('newbike');
  });

  // my-garage views your current bikes
  app.get('/my-garage', function(req, res) {
    db.Bike.findAll({}).then(function(bikeres) {
      res.render('mygarage', { bikes: bikeres });
    });
  });

  // api/tables views all of the data as json
  app.get('/api/tables', function(req, res) {
    db.Bike.findAll({}).then(function(bikedata) {
      res.json(bikedata);
      
    });
    db.Owner.findAll({}).then(function(ownerdata) {
      res.json(ownerdata);
    });
  });
    // authors route loads owner-manager.html
    app.get('/service-manager', function(req, res) {
      res.sendFile(path.join(__dirname, '../public/ServMngr.html'));
    });
  

  // POST route for adding a new bike
  app.post('/api/addnewbike', function(req, res) {
    console.log(req.body);
    db.Bikes
      .create({
        bike_name: req.body.bike_name,
        bike_type: req.body.bike_type,
        purchase_date: purchase_date,
        OwnerId: auth2.currentUser
          .get()
          .getBasicProfile()
          .profile.getId()
      })
      .then(function(dbBikeAdd) {
        // We have access to the new burger as an argument inside of the callback function
        res.json(dbBikeAdd);
      });
  });
};

