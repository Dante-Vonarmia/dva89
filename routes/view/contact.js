const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const Enq = require('../../models/enquiries.js');

// Create application/json parser
const jsonParser = bodyParser.json();

// Create application/x-www-form-urlencoded parser
const urlencodedParser = bodyParser.urlencoded({
  extended: false,
});

/* GET contact page. */
router.get('/', function(req, res, next) {
  res.render('contact', {
    title: 'Contact Me',
    curl: req.originalUrl,
  });
});

router.post('/', urlencodedParser, function(req, res) {
  const item = {
    addDate: Date.now(),
    fname: req.body.fname,
    lname: req.body.lname,
    mail: req.body.mail,
    content: req.body.message,
  };
  const data = new Enq(item);

  data.save();
  res.redirect('/thanks');
});

module.exports = router;
