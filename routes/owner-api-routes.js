var db = require("../models");

module.exports = function(app) {
  app.get("/api/owners", function(req, res) {
    // 1. Add a join to include all of each Owner's Bikes
    db.Owner.findAll({}).then(function(dbAuthor) {
      res.json(dbOwner);
    });
  });

  app.get("/api/owners/:id", function(req, res) {
    // 2; Add a join to include all of the Owner's Bikes here
    db.Owner.findOne({
      where: {
        id: req.params.id
      }
    }).then(function(dbOwner) {
      res.json(dbOwner);
    });
  });

  app.post("/api/owners", function(req, res) {
    db.Owner.create(req.body).then(function(dbOwner) {
      res.json(dbOwner);
    });
  });

  app.delete("/api/authors/:id", function(req, res) {
    db.Owner.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbOwner) {
      res.json(dbOwner);
    });
  });

};
