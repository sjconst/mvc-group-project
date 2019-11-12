const { SurveyResults } = require("../models");

module.exports = function(app) {
  // Load index page
  //Note: what are we going to render from the database on the index page? Maybe not all the data, no? Maybe carousel of most recent tests?
  app.get("/", function(req, res) {
    SurveyResults.findAll({}).then(data => {
      res.render("index", {
        msg: "Free Personality Test",
        groups: data
      });
    });
  });

  app.get('/DISC', (req, res) => {
    res.render('disc')
  })
  app.get('/ennegram', (req, res) => {
    res.render('ennegram')
  })
  app.get('/myersbriggs', (req, res) => {
    res.render('myersbriggs')
  })
  
  // Render 404 page for any unmatched routes
  app.get("*", (req, res) => {
    res.render("404");
  });

};
