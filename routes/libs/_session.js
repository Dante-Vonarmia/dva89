'use strict';
/**
 * Middleware session
 */
const session = require('express-session');
const _config = require('config-lite')(__dirname);

module.exports = function(app) {
  app.use(session({
    name: _config.session.key,
    secret: _config.session.cookieSecret,
    resave: true,
    saveUninitialized: false,
    cookie: {
      maxAge: _config.session.maxAge,
    },
  }));
};
