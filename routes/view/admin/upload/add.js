const express          = require('express');
const upload           = require('../../../../models/photo.js');
const album            = require('../../../../models/album.js');
const cloudinary       = require('cloudinary').v2;
const Promise          = require('bluebird');
const bodyParser       = require('body-parser');

// create application/json parser 
const jsonParser       = bodyParser.json();
 
// create application/x-www-form-urlencoded parser 
const urlencodedParser = bodyParser.urlencoded({ extended: false });
const router           = express.Router();


router.get('/', function(req, res, next) {
	Promise.all([album.find(), upload.find()]).spread(function(album, upload) {
		const albumData = album.map(function (item) {
			return {
				id      : item._id,
				title   : item.title,
				catalog : item.catalog,
			}
		})

		res.render('admin/upload/add', {
			title       : 'Upload Photos - YSRACCOON',
			curl        : req.originalUrl,
			chooseAlbum : albumData,
			context     : upload,
			user        : req.session.user.name,
		});
	});
});

router.post('/', urlencodedParser, function(req, res) {
	const id = req.body.id;

	if (id != undefined || id != '') {
		if (req.body.title != undefined || req.body.title != '') {

			const albumData = JSON.parse(req.body.album);

			const item = {
				title       : req.body.title,
				onPublic    : req.body.onPublic,
				description : {
					brief         : req.body.brief,
					camera        : req.body.camera,
					focal_length  : req.body.focal_length,
					aperture      : req.body.aperture,
					exposure_time : req.body.exposure_time,
					iso           : req.body.iso,
				},
				heroImg     : req.body.heroImg,
				album       : albumData,
				addDate     : new Date().now,
			}
			const data = new upload(item);
			if (req.files.picURL) {
				// Get temp file path 
				const imageFile = req.files.picURL.path;
				// Upload file to Cloudinary
				cloudinary.uploader.upload(imageFile, {
						tags: 'upload'
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