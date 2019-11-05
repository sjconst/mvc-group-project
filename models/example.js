var Sequelize = require("sequalize");
var sequelize = require("../config/config");

// module.exports = function(sequelize, DataTypes) {
  

  var Table = sequelize.define("test", {
    name: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
        notEmpty: true,
        len: [2]
      }
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        isAlpha: true, 
        notEmpty: true,
        len: [7]
      }
    },
    test_type: {
      type: Sequelize.STRING
    },
    results: {
      type: Sequelize.TEXT
    }
  });
  // return Example;
// };

Table.sync();

module.exports = Table;

