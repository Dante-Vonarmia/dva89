'use strict';
var express   = require('express');
var router    = express.Router();

/* GET portfolio page. */
router.get('/', function(req, res) {
  res.render('portfolio', {
    title: 'Portfolio - DVA89',
  });
});

module.exports = router;
