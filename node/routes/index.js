var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
    //User has now been authed through google
    //TODO If they have a group output status, otherwise prompt to create group

  res.render('index', { title: 'Express' });
});

module.exports = router;
