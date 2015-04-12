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

            //console.log(calendars);
            //console.log('divier');
            var freeTime = [];
            // the :00--4:00 is zero seconds and then -4 b/c new york is -4 timezone form utc
            var currentDate = new Date();
            var start;
            if ((Number(currentDate.getMonth()) + 1) < 10) {
                start = currentDate.getFullYear() + "-" + "0" + (currentDate.getMonth() + 1) + "-" + currentDate.getDate() + "T" + currentDate.getHours() + ":" + currentDate.getMinutes() + ":00:-0400:";
            } else {
                start = currentDate.getFullYear() + "-" + (currentDate.getMonth() + 1) + "-" + currentDate.getDate() + "T" + currentDate.getHours() + ":" + currentDate.getMinutes() + ":00:-0400:";
            }
            //console.log(start);

            var items = calendars[0].items;
            for (var event in items) {

                if (items[event].start != null && items[event].start.dateTime != null && items[event].end.dateTime != null) {
                    freeTime.push({event: {startTime: start, endTime: items[event].start.dateTime}});
                    start = items[event].end.dateTime;
                }
            }
            console.log(freeTime);

            var result = freeTime;


            //var result = {};  // PUT RESULT OUTPUT HERE (in your chosen JSON format)

            //TESTING
            //var result = calendars;

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
