/**
 * Created by Ben on 4/11/2015.
 */
var express = require('express');
var router = express.Router();
var cookieParser = require('cookie-parser');
var MongoClient = require('mongodb').MongoClient
    , assert = require('assert');
var db_url = 'mongodb://localhost:27017/Bitcamp';

/* POST for data */
router.post('/', function(req, res) {

    var user = new Buffer(req.cookies.id, 'base64').toString('ascii');

    var lookupUser = function (db, callback) {
        // Get the documents collection
        console.log("PENIS");
        var collection = db.collection('users');

        var jsonObj = {};
        jsonObj[user] = true;
        collection.find( jsonObj, function(err, result) {
            if (result.length > 0) {
                //User has a group, proceed to show group
                res.location('./showGroup');
            } else {
                res.location('./setGroup');
            }

        });

        collection.remove({ id : calendarList.items[0].id }, function(err, result) {
            // Insert some documents
            console.log("removed anal virginity");
            console.log(err);
            collection.insert(calendar, function (err, result) {
                console.log("Doin it live");
                callback(result, db);
            });
        });
    }

    MongoClient.connect(db_url, function (err, db) {
        assert.equal(null, err);
        console.log("Connected correctly to server");

        insertDocuments(db, function (err, db) {
            console.log(err);
            db.close();
            res.location('./setGroup');
            res.end();
        });
    });

});

module.exports = router;