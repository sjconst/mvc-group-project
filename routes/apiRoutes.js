const { SurveyResults } = require("../models");

module.exports = function(app) {
  // Get all tests
  app.get("/api/tests", (req, res) => {
    SurveyResults.findAll({}).then(data => res.json(data));
  });
  //Get tests by type  
  app.get("/api/type/:type", (req, res) => {
    SurveyResults.findAll({
      where: {       
        type: req.params.type
      }
    }).then( data => res.json(data))
  });
  // Create a new test
  app.post("/api/tests", (req, res) => {
    let result = req.body.personalities.myers_briggs_type;
    let name = req.body.first_name;
    let overview = req.body.content.overview;
    SurveyResults.create(req.body).then(data => res.json(data));
  });
  // Delete an example by id
  app.delete("/api/tests/:id", (req, res) => {
    SurveyResults.destroy({ where: { id: req.params.id } }).then(data => res.json(data));
  });
};
