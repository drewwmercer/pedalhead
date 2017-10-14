// *********************************************************************************
// bike-api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================

// Requiring our models
var db = require('../models');
const GoogleAuth = require('google-auth-library');

// Routes
// =============================================================
module.exports = function(app) {
  // GET route for getting all of the bikes [TODO: for this owner]
  app.get('/api/bikes', function(req, res) {
    var query = {};
    if (req.query.owner_id) {
      query.OwnerId = req.query.owner_id;
    }
    // 1. Add a join here to include all of the Owners to these bikes
    db.bike
      .findAll({
        where: query,
        include: [db.Owner]
      })
      .then(function(dbbike) {
        res.json(dbbike);
      });
  });

  // Get rotue for retrieving a single bike
  app.get('/api/bikes/:id', function(req, res) {
    // 2. Add a join here to include the Owner who owns the bike
    db.bike
      .findOne({
        where: {
          id: req.params.id
        }
      })
      .then(function(dbbike) {
        console.log(dbbike);
        res.json(dbbike);
      });
  });

  // post bike route for saving a new bike
  app.post('/api/bikes', function(req, res) {
    db.bike.create(req.body).then(function(dbbike) {
      res.json(dbbike);
    });
  });

  // DELETE route for deleting bikes
  app.delete('/api/bikes/:id', function(req, res) {
    db.bike
      .destroy({
        where: {
          id: req.params.id
        }
      })
      .then(function(dbbike) {
        res.json(dbbike);
      });
  });

  // PUT route for updating bikes
  app.put('/api/bikes', function(req, res) {
    db.bike
      .update(req.body, {
        where: {
          id: req.body.id
        }
      })
      .then(function(dbbike) {
        res.json(dbbike);
      });
  });


    app.get('/api/auth', (req, res) => {
      console.log('Attempting to auth');
      const GOOGLE_CLIENT_ID = '349091180718-scvujbn59thrl1fo0q85au262el78o1g.apps.googleusercontent.com';
      const auth = new GoogleAuth;
      const client = new auth.OAuth2(GOOGLE_CLIENT_ID, '', '');
      client.verifyIdToken(
        req.query.token,
        GOOGLE_CLIENT_ID,

        function (error, login) {
          if (error) {
            console.error(error);

            res.json({ error: error.message });
            return;
          }

          const payload = login.getPayload();
          payload.valid = true;

          res.json(payload);
        });

    });
};
