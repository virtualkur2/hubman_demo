const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const path = require('path');

const router = express.Router();

const server = () => {
  const app = express();
  app.use(helmet());
  app.use(express.json());
  app.use(express.urlencoded({extended: true}));
  app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); // <= inseguro, sólo se usa en desarrollo
    res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
  });
  app.set('views', path.join(__dirname, 'views'));
  app.set('view engine', 'ejs');
  return app;
}

module.exports = server;
