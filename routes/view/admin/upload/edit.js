const express          = require('express');
const bodyParser       = require('body-parser');
const Promise          = require('bluebird');
const cloudinary       = require('cloudinary').v2;
const upload           = require('../../../../models/photo.js');
const album            = require('../../../../models/album.js');
const router           = express.Router();

// create application/json parser 
const jsonParser       = bodyParser.json();

// create application/x-www-form-urlencoded parser 
const urlencodedParser = bodyParser.urlencoded({
	extended: false
});

router.get('/:id', function(req, res, next) {
	Promise.all([album.find(), upload.find({_id: req.params.id})]).spread(function(album, upload) {
		const albumData = album.map(function (item) {
			return {
				id      : item._id,
				title   : item.title,
				catalog : item.catalog,
			}
		})
		res.render('admin/upload/edit', {
			title       : 'Photo - Editing: ' + upload[0].title,
			user        : req.session.user.name,
			chooseAlbum : albumData,
			context     : upload,
			curl        : req.originalUrl
		});
	});
});

router.post('/:id', urlencodedParser, function(req, res) {
	const id = req.params.id;

	// casting validate
	if (id.match(/^[0-9a-fA-F]{24}$/)) {
		if (id != undefined || id != '') {
			upload.findById(id, function(err, doc) {
				if (err) {
					console.error('error, no entry found');
				}
				
				const albumData = JSON.parse(req.body.album);

				const desData   = {
					brief         : req.body.brief,
					camera        : req.body.camera,
					focalLength  : req.body.focalLength,
					aperture      : req.body.aperture,
					exposureTime : req.body.exposureTime,
					iso           : req.body.iso,
				}
				
				doc.title       = req.body.title;
				doc.addDate     = req.body.addDate;
				doc.description = desData;
				doc.location    = req.body.location;
				doc.heroImg     = req.body.heroImg;
				doc.album       = albumData;
				doc.pos         = req.body.pos;

				if (req.body.heroImg != undefined || req.body.heroImg != null) {
					doc.heroImg = true;
				} else {
					doc.heroImg = false;
				}
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
							tags: 'upload'
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

			res.redirect('/admin/upload/add');
		}
	}
});

module.exports = router;