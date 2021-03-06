const User = require('../helpers/db.helper').models.User;

const create = (req, res, next) => {
  if (!req.body) {
    return res.status(400).json({
      error: 'No data received'
    });
  }
  User.findOrCreate({
    where: {
      email: req.body.email
    },
    attributes: [
      'id',
      'firstName',
      'lastName',
      'email',
      'createdAt',
      'updatedAt'
    ],
    defaults: req.body
  })
    .then(([user, created]) => {
      if(created) {
        user.hashed_password = undefined;
        user.password = undefined;
        return res.status(200).json(user);
      }
      return res.status(400).json({
        error: 'User already exists',
        user: user
      });
    })
    .catch((err) => {
      return res.status(500).json({
        error: err.message
      });
    });
}

const read = (req, res, next) => {
  req.profile.hashed_password = undefined;
  req.profile.password = undefined;
  return res.status(200).json(req.profile);
}

const update = (req, res, next) => {
  let user = Object.assign(req.profile, req.body);
  user.save()
    .then((result) => {
      return res.status(200).json(result);
    })
    .catch((err) => {
      console.error(err.message);
      return res.status(400).json({
        error: err.message
      });
    });
}

const remove = (req, res, next) => {
  let user = req.profile;
  user.destroy()
    .then((result) => {
      console.log(result);
      return res.status(200).json({
        result: result
      });
    })
    .catch((err) => {
      console.error(err.message);
      return res.status(400).json({
        error: err.message
      })
    });
}

const userById = (req, res, next, id) => {
  User.findByPk(id)
    .then((user) => {
      if(!user) {
        return res.status(400).json({
          error: 'No user found with id: ' + id
        });
      }
      req.profile = user;
      next();
    })
    .catch((err) => {
      return res.status(500).json({
        error: err.message
      });
    });
}


module.exports = { create, read, update, remove, userById }
