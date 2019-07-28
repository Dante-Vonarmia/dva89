/**
 * Database Configuration
 */

const mongoose = require('mongoose');
const Promise = require('bluebird');
const _config = require('config-lite')(__dirname);
const Admin = require('../../models/user.js');
const Banner = require('../../models/post.js');
const Album = require('../../models/album.js');

module.exports = function(app) {
	mongoose.Promise = global.Promise;
	const options = {
		useMongoClient: true,
		socketTimeoutMS: 0,
		keepAlive: true,
		reconnectTries: 30
	};

	switch (app.get('env')) {
		case 'development':
			mongoose.connect(_config.mongodb.development.connectionString, options);
			break;
		case 'production':
			mongoose.connect(_config.mongodb.production.connectionString, options);
			break;
		default:
			throw new Error('Unknown execution environment: ' + app.get('env'));
	}

	// Setting: Default Data
	Admin.find(function(err, user) {
		if (user.length) return;
		new Admin({
			name: 'ysraccoon',
			password: "admin123",
			unique: true
		}).save();
	});

	Banner.find(function(err, user) {
		if (user.length) return;
		new Banner({
			title: 'Welcome',
			onPublic: true,
			picURL: {
				url: '/front/assets/images/ys-home.jpg'
			},
			description: 'Stay as who you are.',
			addDate: new Date().now,
			pos: 1,
			location: 'Troy, AL',
		}).save();
	});

}