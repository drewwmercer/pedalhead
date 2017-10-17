// *********************************************************************************
// html-routes.js - this file offers a set of routes for sending users to the various html pages
// *********************************************************************************

// Dependencies
// =============================================================
var path = require('path');
var db = require('../models');
const GoogleAuth = require('google-auth-library');

// Routes
// =============================================================
module.exports = function(app) {
  function googleAuth(req, res, callback) {
    console.log('Attempting to auth');
    const GOOGLE_CLIENT_ID =
      '349091180718-scvujbn59thrl1fo0q85au262el78o1g.apps.googleusercontent.com';
    const auth = new GoogleAuth();
    const client = new auth.OAuth2(GOOGLE_CLIENT_ID, '', '');
    client.verifyIdToken(req.query.token, GOOGLE_CLIENT_ID, function(
      err,
      login
    ) {
      callback(req, res, err, login);
    });
  }

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
    googleAuth(req, res, function(req, res, err, login) {
      res.render(
        'mygarage',
        db.Bike.findAll({
          where: { user_token: user.id_token }
        })
      );
    });
  });

  // api/tables views all of the data as json
  app.get('/api/tables', function(req, res) {
    db.Bike.findAll({}).then(function(bikedata) {
      res.json(bikedata);
    });
  });

  // authors route loads owner-manager.html
  app.get('/service-manager', function(req, res) {
    res.render('servicemanager');
  });

  // POST route for adding a new bike
  app.post('/api/addnewbike', function(req, res) {
    console.log(req.body);
    db.Bike
      .create({
        bike_name: req.body.bike_name,
        bike_type: req.body.bike_type,
        bike_miles: req.body.bike_miles,
        purchase_date: req.body.purchase_date
        // OwnerId: auth2.currentUser
        //   .get()
        //   .getBasicProfile()
        //   .profile.getId()
      })
      .then(function(result) {
        var responseObj = {
          Id: result.dataValues.id
        };
        res.status(200).json(responseObj);
      })
      .catch(function(err) {
        res.status(500).json(err);
      });
  });
};
