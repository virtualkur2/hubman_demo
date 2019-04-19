const users = require('./users');

const routes = (router) => {
  users(router);
  return router;
}

module.exports = routes;
