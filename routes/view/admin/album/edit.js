const express          = require('express');
const Promise          = require('bluebird');
const album            = require('../../../../models/album.js');
const photo            = require('../../../../models/photo.js');
const bodyParser       = require('body-parser');

// create application/json parser 
const jsonParser       = bodyParser.json();
 
// create application/x-www-form-urlencoded parser 
const urlencodedParser = bodyParser.urlencoded({ extended: false });
const router           = express.Router();

router.get('/:id', function(req, res, nextd) {
	Promise.all([album.find({_id: req.params.id})]).spread(function(item) {
		res.render('admin/album/edit', {
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
			// Submit modified album
			album.findById(id, function(err, doc) {
				// // Update related(existed) record with old album info
				// photo.find({"album.catalog": doc.catalog}, function(err, doc, next) {
				// 	// Update each record with new album info
				// 	doc: doc.map(function(item) {
				// 		item.album.title = req.body.title;
				// 		item.album.catalog = req.body.catalog;
				// 		item.save(function (err, res) {
				// 			console.log(res)
				// 		})
				// 	})
				// })
				
				photo.update({
						"album.catalog": doc.catalog
					}, {
						$set: {
							"album.title": req.body.title,
							"album.catalog": req.body.catalog
						}
					}, {
						multi: true
					},
					function(err, result) {
						console.log(result);
					}
				);

				if (err) {
					console.error('error, no entry found');
				}
				doc.title   = req.body.title;
				doc.catalog = req.body.catalog;
				doc.save();
			})
			// photo.find({})
			res.redirect('/admin/album/add');
		}
	}
});

// Modify All photos after changing an album


module.exports = router;