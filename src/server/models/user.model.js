const Sequelize = require('sequelize');
const sequelize = require('../helpers/db.helper').sequelize;

const Model = Sequelize.Model;

class User extends Model {}

User.init({
  firstName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  lastName: {
    type: Sequelize.STRING,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  hashed_password: {
    type: Sequelize.STRING,
    allowNull: false
  }
}, { sequelize, modelName: 'user'});
