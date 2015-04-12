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
router.get('/', function(req, res) {

    var user = req.cookies.id;
    var users = [];

    var lookupUser = function (db, callback) {
        // Get the documents collection
        console.log("PENIS");
        var collection = db.collection('users');

        var jsonObj = {};
        jsonObj[user] = true;
        collection.find( jsonObj ).toArray( function(err, result) {
		//console.log(result[0]);
            Object.keys(result[0]).forEach(function(key) {
			//console.log(key);
			users.push(new Buffer(key, 'base64').toString('ascii'));
		});
		users.shift();
		callback({},db,users);
        });

    };

    MongoClient.connect(db_url, function (err, db) {
        assert.equal(null, err);
        console.log("Connected correctly to server");

        var buildCalendars = function (db, users, callback) {
            var collection = db.collection('calendars');
            var calendars = [];
            for(var i = 0, len = users.length; i < len; i++) {
		var jsoni = {};
		jsoni['id'] = users[i];
                collection.find(jsoni).toArray(function (err, result) {
			//console.log(err);
			//console.log(result);
                    	calendars.push(result[0]);
			if(i >= users.length) {
				callback(calendars, db);
			}
                });
            }
        };

        var getFreeTime = function(calendars, callback) {
            //TODO This is the free time comparison function
            //Calendars is an array of JSON calendar objects (1 per user in group)
            //These objects are of the format in sampleCalendarJSON.txt

            //PUT CODE BELOW HERE **********************





            //var result = {};  // PUT RESULT OUTPUT HERE (in your chosen JSON format)

            //TESTING
            var result = calendars;

            //PUT CODE ABOVE HERE **********************

            //don't touch anything else (tm)
            callback(result);
        };

        lookupUser(db, function (err, db, users) {
           //console.log(users);
            buildCalendars(db, users, function(calendars, db) {
                getFreeTime(calendars, function(output) {
			//console.log(output)
                    res.send(JSON.stringify(output));
                    res.end();
                });
		db.close();
            });
        });
    });

});



module.exports = router;
