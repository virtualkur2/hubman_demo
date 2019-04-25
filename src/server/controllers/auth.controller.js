const jwt = require('jsonwebtoken');
const config = require('../../config');
const User = require('../helpers/db.helper').models.User;

const signin = (req, res, next) => {
  User.findOne({where: {email: req.body.email}})
    .then(async (user) => {
      if(!user) {
        return res.status(400).json({
          message: 'No user found with email: ' + req.body.email
        });
      }
      try {
        const authenticated = await user.authenticate(req.body.password);
        if(!authenticated) {
          return res.status(400).json({
            error: 'Credentials mismatch',
            credentials: req.body
          });
        }
        user.hashed_password = undefined;
        user.password = undefined;
        const token = jwt.sign({id: user.id, exp: config.token.expireTime}, config.token.secret);
        return res.status(200).json({
          token: token,
          user: user
        });
      }
      catch(error) {
        console.log(error.message);
        return res.status(500).json({
          error: error.message
        });
      }
    })
    .catch((error) => {
      return res.status(500).json({
        error: error.message
      });
    });
}

const signout = (req, res, next) => {

}

const requireSignIn = (req, res, next) => {

}

const getToken = (req) => {

}

module.exports = { signin }
