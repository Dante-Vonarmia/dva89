'use strict';
const express = require('express');
const Promise = require('bluebird');
const post    = require('../../../models/post.js');
const album   = require('../../../models/album.js');
const upload  = require('../../../models/photo.js');
const router  = express.Router();


router.get('/', function(req, res) {
  Promise.all([post.find(), album.find(), upload.find()]).spread(function(post, album, upload) {
    res.render('admin/admin', {
      title: 'CMS - DVA89',
      curl: req.originalUrl,
      user: req.session.user.name,
      contextPost: post,
      contextAlbum: album,
      contextUpload: upload,
    });
  });
});


module.exports = router;
