
let config = {
  development: {
    username: "root",
    password: process.env.DB_PASS,
    database: "personality_test",
    host: "localhost",
    dialect: "mysql",
    driver: "mysql"
  },
  test: {
    username: "root",
    password: process.removeListener.DB_PASS,
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