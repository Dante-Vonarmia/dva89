'use strict';
const express = require('express');
const router = express.Router();

/* GET photos page. */
router.get('/:id', function(req, res) {
  res.render('photos', {
    title: 'Photos',
    curl: req.originalUrl,
  });
});

module.exports = router;
