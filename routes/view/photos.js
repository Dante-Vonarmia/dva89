var express = require('express');
var router = express.Router();

/* GET photos page. */
router.get('/:id', function(req, res, next) {
	res.render('photos', {
		title: 'Photos',
		curl: req.originalUrl
	});
});

module.exports = router;