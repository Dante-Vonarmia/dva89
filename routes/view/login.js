'use strict';
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const Admin = require('../../models/user.js');

// Create application/json parser
// const jsonParser = bodyParser.json()

// Create application/x-www-form-urlencoded parser
const urlencodedParser = bodyParser.urlencoded({ extended: false });

/* GET login page. */
router.get('/', function(req, res) {
  res.render('login', {
    title: 'DVA89\'s - Access Secret Gate',
    user: req.session.user,
  });
});

router.post('/', urlencodedParser, function(req, res) {
  const username = req.body.username;
  const password = req.body.password;
  Admin.findOne({ name: username }, function(err, user) {
    if (err) {
      console.error(err);
      return res.redirect('/login');
    }
    if (!user) {
      return res.redirect('/login');
    }
    if (user.password !== password) {
      return res.redirect('/login');
    }
    req.session.user = user;
    res.redirect('/admin');
  });
});

module.exports = router;
