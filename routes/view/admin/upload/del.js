const express          = require('express');
const Promise          = require('bluebird');
const m                = require('../../../../models/photo.js');
const bodyParser       = require('body-parser');

// create application/json parser 
const jsonParser       = bodyParser.json();
 
// create application/x-www-form-urlencoded parser 
const urlencodedParser = bodyParser.urlencoded({ extended: false });
const router           = express.Router();

router.get('/:id', function(req, res, next) {
	Promise.all([m.find({_id: req.params.id})]).spread(function(item) {
		res.render('admin/upload/del', {
			title   : 'Photos - Delete Record: ' + item[0].title,
			user    : req.session.user.name,
			curl    : req.originalUrl,
			context : item
		});
	});
});

router.post('/:id', urlencodedParser, function(req, res) {
	const id = req.params.id;

	// casting validate
	if (id.match(/^[0-9a-fA-F]{24}$/)) {
		if (id != undefined || id != '') {
			m.findByIdAndRemove(id).exec();
			res.redirect('/admin/upload/add');
		}
	}
});

module.exports = router;