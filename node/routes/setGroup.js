/**
 * Created by Ben on 4/11/2015.
 */
var express = require('express');
var router = express.Router();
var cookieParser = require('cookie-parser');
var MongoClient = require('mongodb').MongoClient
    , assert = require('assert');
var db_url = 'mongodb://localhost:27017/Bitcamp';

router.get('/', function(req, res) {
    // Push Front End Form
});

/* POST for data */
router.post('/', function(req, res) {
    //console.log(req);
    var emails = req.body.emails;
    var users = {};
    //console.log(emails);
    emails = emails.toString().split("\n");
    //console.log(emails);
    for (var e in emails) {
        //console.log(e);
        //console.log(emails[e]);
        users[new Buffer(emails[e]).toString('base64')] = true;
    }
    //console.log(users);
    users[req.cookies.id] = true;
    //console.log(users);

    MongoClient.connect(db_url, function (err, db) {
        assert.equal(null, err);
        console.log("Connected correctly to server");

        // Get the documents collection
        console.log("PENIS");
        var collection = db.collection('users');
        console.log(users);
        collection.insert(users, function(err, result) {
            console.log(err);
            db.close();
            res.writeHead(302, {
                'Location': './checkGroup'
            });
            res.end();
        });
    });
});

module.exports = router;
