const express          = require('express');
const m                = require('../../../../models/album.js');
const bodyParser       = require('body-parser');

// create application/json parser 
const jsonParser       = bodyParser.json();
 
// create application/x-www-form-urlencoded parser 
const urlencodedParser = bodyParser.urlencoded({ extended: false });
const router           = express.Router();

router.get('/', function(req, res, next) {
	m.find().then(function (album) {
		album: album.map(function (item) {
			return {
				title   : item.title,
				catalog   : item.catalog,
				addDate : item.addDate
			}
		})
		res.render('admin/album/add', {
			title   : 'Add Album - YSRACCOON',
			user    : req.session.user.name,
			context : album
		});
	})
});

router.post('/',urlencodedParser, function(req, res) {
	const id = req.body.id;

	if (id != undefined || id != '') {
		if (req.body.title != undefined || req.body.title != '') {
			const item = {
				title: req.body.title,
				catalog: req.body.catalog,
				addDate: new Date().now,
			}
			const data = new m(item);
			data.save();
			res.redirect('back');
		}
	}
})




module.exports = router;