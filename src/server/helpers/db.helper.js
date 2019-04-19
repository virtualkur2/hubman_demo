const Sequelize = require('sequelize');
const config = require('../../config');

const sequelize = new Sequelize(
  config.MYSQL.database,
  config.MYSQL.user,
  config.MYSQL.password,
  config.MYSQL.options
);

const db = {
  connect: () => {
    return sequelize.authenticate();
  },
  close: () => {
    return sequelize.close();
  }
}

module.exports = db;
