const Sequelize = require('sequelize');
const config = require('../../config');
const UserModel = require('../models/user.model');

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
  },
  sync: () => {
    return sequelize.sync();
  },
  models: {
    User: UserModel(sequelize, Sequelize)
  }
}

module.exports = db;
