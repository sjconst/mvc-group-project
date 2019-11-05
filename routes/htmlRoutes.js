var db = require("../models");

module.exports = function(app) {
  // Load index page
  //Note: what are we going to render from the database on the index page? Maybe not all the data, no? Maybe carousel of most recent tests?
  app.get("/", function(req, res) {
    db.Example.findAll({}).then(function(dbExamples) {
      res.render("index", {
        msg: "Free Personality Test",
        examples: dbExamples
      });
    });
  });

  // Load example page and pass in an example by id
  // Notes: not sure what this is doing, and if we can delete?
  app.get("/example/:id", (req, res) => {
    db.Example.findOne({ where: { id: req.params.id } }).then(data => {
      res.render("example", {
        example: data
      });
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", (req, res) => {
    res.render("404");
  });
};
