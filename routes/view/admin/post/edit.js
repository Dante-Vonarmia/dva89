const express          = require('express');
const bodyParser       = require('body-parser');
const Promise          = require('bluebird');
const cloudinary       = require('cloudinary').v2;
const m                = require('../../../../models/post.js');
const router           = express.Router();

// create application/json parser 
const jsonParser       = bodyParser.json();

// create application/x-www-form-urlencoded parser 
const urlencodedParser = bodyParser.urlencoded({
	extended: false
});

router.get('/:id', function(req, res, nextd) {
	Promise.all([m.find({
		_id: req.params.id
	})]).spread(function(item) {
		res.render('admin/post/edit', {
			title   : 'Album - Editing: ' + item[0].title,
			user    : req.session.user.name,
			context : item
		});
	});
});

router.post('/:id', urlencodedParser, function(req, res) {
	const id = req.params.id;

	// casting validate
	if (id.match(/^[0-9a-fA-F]{24}$/)) {
		if (id != undefined || id != '') {
			m.findById(id, function(err, doc) {
				if (err) {
					console.error('error, no entry found');
				}
				doc.title       = req.body.title;
				doc.addDate     = req.body.addDate;
				doc.description = req.body.description;
				doc.location    = req.body.location;
				doc.pos         = req.body.pos;

				if (req.body.onPublic != undefined || req.body.onPublic != null) {
					doc.onPublic = true;
				} else {
					doc.onPublic = false;
				}
				if (req.files.picURL) {
					// Get temp file path 
					const imageFile = req.files.picURL.path;
					// Upload file to Cloudinary
					cloudinary.uploader.upload(imageFile, {
							tags: 'banner'
						})
						.then(function(picURL) {
							console.log('** file uploaded to Cloudinary service');
							console.dir(picURL);
							doc.picURL = picURL;
							// Save photo with picURL metadata
							doc.save();
						})
						.finally(function(data) {
							// console.log('** photo saved')
						})
				}
				doc.save();
			})

			res.redirect('/admin/post/add');
		}
	}
});



module.exports = router;