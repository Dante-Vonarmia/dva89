const express = require('express');
const router = express.Router();

/* GET thanks page. */
router.get('/', function(req, res, next) {
	res.render('thanks', {
		title: 'Thanks - DVA89',
	});
});

module.exports = router;