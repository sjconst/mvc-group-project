const { SurveyResults } = require("../models");

module.exports = function(app) {
  // Get all tests
  app.get("/api/tests", (req, res) => {
    SurveyResults.findAll({
      where: {
        results: {
          [Op.ne]: null
        }
      }
    }).then(data => res.json(data));
  });
  //Get tests by type  
  app.get("/api/type/:type", (req, res) => {
    SurveyResults.findAll({
      where: {       
        test_type: req.params.type
      }
    }).then( data => res.json(data))
  });
  //Get groups
  app.get("/api/groups", (req, res) => {
    SurveyResults.findAll({ attributes: ["group_"]}).then( data => res.json(data))
  });
  // Create a new test
  app.post("/api/tests", (req, res) => { 
    console.log(req.body);
    let name = req.body.name;
    let email = req.body.email;
    let group = req.body.group;
    SurveyResults.create({
      name_: name,
      email: email,
      group: group
    }).then(data => res.json(data));
  });
  // Delete an example by id
  app.delete("/api/tests/:id", (req, res) => {
    SurveyResults.destroy({ where: { id: req.params.id } }).then(data => res.json(data));
  });
};
