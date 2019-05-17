const bcrypt = require('bcrypt');
const config = require('../../config');

const User = (sequelize, DataTypes) => {
  const model = sequelize.define('user', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      isEmail: true
    },
    hashed_password: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
    password: {
      type: DataTypes.VIRTUAL,
      allowNull: false,
      get: function() {
        return this.getDataValue('password');
      },
      set: function(val) {
        this.setDataValue('password', val);
      },
      validate: {
        isLongEnough: function(val) {
          if(val.length < config.passwordLength) {
            throw new Error(`Password must be at least ${config.passwordLength} characters long.`);
          }
        }
      },
    }
  });

  model.prototype.authenticate = async function(password) {
    try {
      return await bcrypt.compare(password, this.getDataValue('hashed_password'));
    }
    catch(error) {
      throw error;
    }
  }

  model.prototype.hashPassword = async function(password) {
    try {
      const hash = await bcrypt.hash(password, config.token.saltingRounds);
      return hash;
    }
    catch (error) {
      throw error;
    }
  }

  model.addHook('beforeSave', async (user, options) => {
    if(user._options.isNewRecord || user._changed.password) {
      let hash = await user.hashPassword(user.password);
      user.hashed_password = hash;
    }
  });

  return model;
}

module.exports = User;
