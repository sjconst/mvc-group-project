var Sequelize = require("sequalize");
var sequelize = require("../config/config");

// module.exports = function(sequelize, DataTypes) {
  

  var Test = sequelize.define("test", {
    name: Sequelize.STRING,
    email: Sequelize.STRING,
    test_type: Sequelize.STRING,
    results: Sequelize.TEXT
  });
  // return Example;
// };

Test.sync();

module.exports = Test;