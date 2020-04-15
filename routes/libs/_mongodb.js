'use strict';

/**
 * Database Configuration
 */

const mongoose = require('mongoose');
// Const Promise = require('bluebird');
const _config = require('config-lite')(__dirname);
const Admin = require('../../models/user.js');
const Banner = require('../../models/post.js');
// Const Album = require('../../models/album.js');

module.exports = function(app) {
  mongoose.Promise = global.Promise;
  const options = {
    useMongoClient: true,
    socketTimeoutMS: 0,
    keepAlive: true,
    reconnectTries: 30,
  };

  switch (app.get('env')) {
    case 'development': {
      mongoose.connect(_config.mongodb.development.connectionString, options);
      break;
    }
    case 'production': {
      mongoose.connect(_config.mongodb.production.connectionString, options);
      break;
    }
    default: {
      throw new Error('Unknown execution environment: ' + app.get('env'));
    }
  }

  // Setting: Default Data
  Admin.find(function(err, user) {
    if (user.length) {
      return;
    }
    new Admin({
      name: 'dva89',
      password: 'admin123',
      unique: true,
    }).save();
  });

  Banner.find(function(err, user) {
    if (user.length) {
      return;
    }
    new Banner({
      title: 'Welcome',
      onPublic: true,
      picURL: {
        url: '/front/assets/images/home.jpg',
      },
      description: 'Author: Dante Von Alcatraz',
      addDate: '08-03-2019',
      pos: 1,
      location: 'Austin, TX',
    }).save();
  });
};
