var express   = require('express');
const upload  = require('../../models/photo.js');
const Promise = require('bluebird');
var router    = express.Router();

/* GET portfolio page. */
router.get('/', function(req, res, next) {
	Promise.all([upload.find({heroImg: true})]).spread(function(upload) {
		var album = upload.map(function(item, i) {
			return item.album.catalog
		});
		
		res.render('portfolio', {
			title       : 'Portfolio',
			curl        : req.originalUrl,
			chooseAlbum : uniqueArray(album),
			context     : upload,
		});
	});
});

router.get('/:id', function(req, res, next) {
	Promise.all([upload.find({'album.id': req.params.id})]).spread(function (upload) {

		var heroImgData = upload.map(function(item) {
			if (item.heroImg === true)
				return item.picURL.url
		})

		res.render('photos', {
			title   : 'Portfolio: ' + req.params.title,
			curl    : req.originalUrl,
			heroImg : heroImgData,
			context : upload
		})
	})
})

function uniqueArray(array) {
	var n = [];
	for (var i = 0; i < array.length; i++) {
		if (n.indexOf(array[i]) == -1) n.push(array[i]);
	}
	return n;
}


module.exports = router;