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
        const token = jwt.sign({id: user.id, exp: Math.floor(Date.now() / 1000) + config.token.expireTime}, config.token.secret);
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

const requireSignIn = (req, res, next) => {
  const token = getToken(req);
  if(!token) {
    return res.status(400).json({
      error: 'Missing credentials, please login'
    });
  }
  jwt.verify(token, config.token.secret, (err, decoded) => {
    if(err) {
      console.log(err.message);
      return res.status(500).json({
        error: err.message
      });
    }
    req.auth = decoded;
    next();
  });
}

const hasAuthorization = (req, res, next) => {
  const authorized = req.profile && req.auth && (req.profile.id == req.auth.id);
  if(!authorized) {
    return res.status(400).json({
      error: 'User is not authorized'
    });
  }
  next();
}

const getToken = (req) => {
  let token = undefined;
  if(req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
    token = req.headers.authorization.split(' ')[1];
  } else {
    if(req.query && req.query.token) {
      token = req.query.token;
    }
  }
  return token;
}

module.exports = { signin, requireSignIn, hasAuthorization }
