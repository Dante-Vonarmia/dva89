const express          = require('express');
const m                = require('../../../../models/post.js');
const cloudinary       = require('cloudinary').v2;
const bodyParser       = require('body-parser');

// create application/json parser 
const jsonParser       = bodyParser.json();
 
// create application/x-www-form-urlencoded parser 
const urlencodedParser = bodyParser.urlencoded({ extended: false });
const router           = express.Router();

router.get('/', function(req, res, next) {
	m.find().then(function (post) {
		post: post.map(function (item) {
			return {
				title       : item.title,
				addDate     : item.addDate,
				onPublic    : item.onPublic,
				picURL      : item.picURL,
				description : item.description,
				location    : item.location,
				pos         : item.pos,
			}
		})
		res.render('admin/post/add', {
			title   : 'Add Banner - DVA89',
			curl    : req.originalUrl,
			user    : req.session.user.name,
			context : post
		});
	})
});

router.post('/', urlencodedParser, function(req, res) {
	const id = req.body.id;

	if (id != undefined || id != '') {
		if (req.body.title != undefined || req.body.title != '') {

			const item = {
				title       : req.body.title,
				onPublic    : req.body.onPublic,
				description : req.body.description,
				location    : req.body.location,
				pos         : parseInt(req.body.pos),
				addDate     : Date.now(),
			}
			const data = new m(item);

			if (req.files.picURL) {
				// Get temp file path 
				const imageFile = req.files.picURL.path;
				// Upload file to Cloudinary
				cloudinary.uploader.upload(imageFile, {
						tags: 'portfolio'
					})
					.then(function(picURL) {
						// console.log('** file uploaded to Cloudinary service');
						console.dir(picURL);
						data.picURL = picURL;
						// Save photo with picURL metadata
						data.save();
						res.redirect('back');
					})
					.finally(function(data) {
						// console.log('** photo saved')
					})
			} else {
				data.save();
				res.redirect('back');
			}
		}
	}
})

module.exports = router;