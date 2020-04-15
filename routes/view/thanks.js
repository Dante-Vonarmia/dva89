'use strict';
const express = require('express');
const router = express.Router();

/* GET thanks page. */
router.get('/', function(req, res) {
  res.render('thanks', {
    title: 'Thanks - DVA89',
  });
});

module.exports = router;
