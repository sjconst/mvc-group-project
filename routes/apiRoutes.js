var db = require("../models");
//Notes: need to change "example" to name of table in models (need to change the name of the file there from example.js and the tables inside to something else too)
module.exports = function(app) {
  // Get all tests
  app.get("/api/tests", (req, res) => {
    db.Example.findAll({}).then(data => res.json(data));
  });
  //Get tests by type
  //need to make sure table has type column and need to figure out how to relate that its own result, if multiple tests captured. Also, this assumes we decide to capture several different test
  app.get("/api/posts/:type/:result", (req, res) => {
    db.Example.findAll({
      where: {
        type: req.params.type,
        result: req.params.result
      }
    }).then( data => res.json(data))
  });
  // Create a new test
  app.post("/api/tests", (req, res) => {
    db.Example.create(req.body).then(data => res.json(data));
  });
  // Delete an example by id
  app.delete("/api/tests/:id", (req, res) => {
    db.Example.destroy({ where: { id: req.params.id } }).then(data => res.json(data));
  });
};
