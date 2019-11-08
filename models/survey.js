// var Sequelize = require("sequelize");
// var sequelize = require("../config/config");

module.exports = function(sequelize, DataTypes) {
  var SurveyResults = sequelize.define("SurveyResults", {
    name_: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isAlpha: true, 
        notEmpty: true,
        len: [1, 30]
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
        notEmpty: true,
        len: [1, 30]
      }
    },
    group: {
      type: DataTypes.STRING,
      allowNull: false,     
    },
    disc_type: {
      type: DataTypes.STRING
    },
    discResults: {
      type: DataTypes.TEXT
    },
    myers: {
      type: DataTypes.STRING
    },
    myersResults: {
      type: DataTypes.TEXT
    },
    enneagram_type: {
      type: DataTypes.STRING
    },
    enneagramResults: {
      type: DataTypes.TEXT
    }
  });
  return SurveyResults;
};

// Table.sync();

// module.exports = Table;

