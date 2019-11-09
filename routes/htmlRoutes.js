const { SurveyResults } = require("../models");

module.exports = function(app) {
  app.get("/Profiles", (req, res) => {
    SurveyResults.findAll({   
      attributes: ["group_"]  
    }).then(data => {     
      res.render("profiles", {
        data: data
      })
    })
  });
  app.get("/", (req, res) => {
    SurveyResults.findAll({   
      attributes: ["group_"]  
    }).then(data => {     
      res.render("index", {
        msg: "Discover and Match Personality Types!",
        groups: data
      });
    });
  });
  // Render 404 page for any unmatched routes
  app.get("*", (req, res) => {
    res.render("404");
  });
};
