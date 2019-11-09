const { SurveyResults } = require("../models");

module.exports = function(app) {
  // Load index page
  //Note: what are we going to render from the database on the index page? Maybe not all the data, no? Maybe carousel of most recent tests?
  app.get("/", function(req, res) {
    SurveyResults.findAll({}).then(data => {
      res.render("index", {
        examples: data
      });
    });
  });
  app.get("/Profiles", (req, res) => {
    SurveyResults.findAll({   
      attributes: ["group_"]  
    }).then(data => {     
      res.render("profiles", {
        data: data
      })
    })
  })

  // Render 404 page for any unmatched routes
  app.get("*", (req, res) => {
    res.render("404");
  });
};
