const express = require('express');
const m       = require('../../models/post.js');
const router  = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	m.find({onPublic: true}).sort({
		pos: 1
	}).then(function(post) {
		post: post.map(function(item) {
			return {
				title: item.title,
				addDate: item.addDate,
				picURL: item.picURL,
				description: item.description,
				location: item.location,
				pos: item.pos,
			}
		})
		res.render('index', {
			title: 'Home - YSRACCOON',
			curl: req.originalUrl,
			context: post
		});
	})

});

module.exports = router;