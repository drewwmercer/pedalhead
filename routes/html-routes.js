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
    const verifyToken = new Promise(function(resolve, reject){
      client.verifyIdToken(
          token,
          GOOGLE_CLIENT_ID,
          function (e, login){
             if (login) {
                 var payload = login.getPayload();
                 var googleId = payload['sub'];
                 resolve(googleId);
             } else {
              reject("invalid token");
             }
          }
      )
  }).then(function(googleId){
      //use googleId here
  }).catch(function(err){
      //error
  })
  }

  // index route loads app.html
  app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '../public/app.html'));
  });

  // app route loads app.html
  app.get('/app', function(req, res) {
    res.sendFile(path.join(__dirname, '../public/app.html'));
  });

  // new-bike adds a page for adding a new bike to the database
  app.get('/new-bike', function(req, res) {
    // res.sendFile(path.join(__dirname, '../public/newBike.html'));
    res.render('newbike');
  });

  // my-garage views your current bikes
  app.get('/my-garage', function(req, res) {
    googleAuth(req, res, function(req, res, err, login) {
      db.Bike
        .findAll({
          where: {
            owner_token:
              'eyJhbGciOiJSUzI1NiIsImtpZCI6IjJiM2UyOGVmOWNhY2JkZTUyZjQzOTFiNDgxNjc4ZmE2ZGRiYzM3YjEifQ.eyJhenAiOiIzNDkwOTExODA3MTgtc2N2dWpibjU5dGhybDFmbzBxODVhdTI2MmVsNzhvMWcuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiIzNDkwOTExODA3MTgtc2N2dWpibjU5dGhybDFmbzBxODVhdTI2'
          }
        })
        .then(function(bikeres) {
          res.render('mygarage', { bikes: bikeres });
        });
      //   res.json(bikedata);

      // res.render(
      //   'mygarage',
      //   db.Bike.findAll({
      //     where: { user_token: req.id_token }
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
