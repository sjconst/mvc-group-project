require("dotenv").config();
const config = {
  development: {
    username: "root",
    password: process.env.DB_PASS,
    database: "personality_test",
    host: "localhost",
    dialect: "mysql"
  },
  test: {
    username: "root",
    password: null,
    database: "testdb",
    host: "localhost",
    dialect: "mysql",
    logging: false
  },
  production: {
    use_env_variable: "JAWSDB_URL",
    dialect: "mysql"
  }
}
module.exports = config;