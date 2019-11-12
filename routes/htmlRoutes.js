const { SurveyResults } = require("../models");

module.exports = function(app) {
  app.get("/Profiles", (req, res) => {
    SurveyResults.findAll({   
      attributes: ["group_"],
      group: "group_" 
    }).then(data => {     
      res.render("profiles", {
        data: data
      })
    })
  });
  app.get("/", (req, res) => {
    SurveyResults.findAll({   
      attributes: ["group_"],
      group: "group_"  
    }).then(data => {     
      res.render("index", {
        msg: "Discover and Match Personality Types",
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
