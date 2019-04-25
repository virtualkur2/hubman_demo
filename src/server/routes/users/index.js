const usrCtrl = require('../../controllers/user.controller');
const authCtrl = require('../../controllers/auth.controller');

const users = (router) => {
  // router.route('/api/users/list')
  //   .get(authCtrl.requireSignIn, authCtrl.hasAdminRol, usrCtrl.list);

  router.route('/api/users/signin')
    .post(authCtrl.signin);

  router.route('/api/users/signup')
    .post(usrCtrl.create);

  router.route('/api/users/:userId')
    .get(authCtrl.requireSignIn, auhtCtrl.hasAuthorization, usrCtrl.read)
  //   .put(authCtrl.requireSignIn, authCtrl.hasAuthorization, usrCtrl.update)
  //   .delete(authCtrl.requireSignIn, authCtrl.hasAuthorization, usrCtrl.remove);
  //
  router.param('userId', usrCtrl.userById);

  return router;
}

module.exports = users;
