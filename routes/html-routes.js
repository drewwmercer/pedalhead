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

  // authors route loads owner-manager.html
  app.get('/owners', function(req, res) {
    res.sendFile(path.join(__dirname, '../public/owner-list.html'));
  });

  // adds a new bike to the database
  app.get('/new-bike', function(req, res) {
    res.sendFile(path.join(__dirname, '../public/newBike.html'));
  });

  // my-garage views your current bikes
  app.get('/my-garage', function(req, res) {
    db.Bike.findAll({}).then(function(bikeres) {
      res.render('mygarage', { bikes: bikeres });

      // projects will be an array of Bike instances with the specified id
    });
    //where: { id: '1' } }).then(bikes => {
    // console.log(req.params);

    // projects will be an array of Bike instances with the specified id
  });
  // });
  // var data = [
  //   { owner_name: 'Bob Smith' },
  //   {
  //     bike_name: 'test bike 1',
  //     bike_type: 'test bike type',
  //     bike_miles: '3453'
  //   },
  //   {
  //     bike_name: 'test bike 2',
  //     bike_type: 'test bike type',
  //     bike_miles: '33'
  //   }
  // ];

  // db.query('SELECT * FROM bikes where id = ?', [1], function(err, data) {
  //   if (err) {
  //     return res.status(500).end();
  //   }

  //   console.log(data);
  //   res.render('mygarage', { bikes: data });
  // });
  // (function(err, data) {
  //   if (err) {
  //     return res.status(500).end();
  //   }

  // res.render('mygarage', { bikes: data });
  //     });
  //});

  // authors route loads owner-manager.html
  app.get('/service-manager', function(req, res) {
    res.sendFile(path.join(__dirname, '../public/ServMngr.html'));
  });
};
