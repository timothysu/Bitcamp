var express = require('express');
var fs = require('fs');
var MongoClient = require('mongodb').MongoClient
    , assert = require('assert');
var db_url = 'mongodb://localhost:27017/Bitcamp';
var router = express.Router();
var google = require('googleapis');
var OAuth2 = google.auth.OAuth2;
var gcal = require('google-calendar');
var cookieParser = require('cookie-parser');
var plus = google.plus('v1');
var CLIENT_ID = '541057803748-kbh3vjrs4mlvlrcd09t4lomfc171ulra.apps.googleusercontent.com';
var CLIENT_SECRET = 'forMWLuaj90Ary0OZPSbddz_';
var REDIRECT_URL = 'http://localhost/oauth2callback';


var oauth2Client = new OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URL);

router.get('/', function(req, res) {
    //console.log(req.body);
    var code = req.query.code;

    oauth2Client.getToken(code, function(err, tokens) {
        // set tokens to the client
        // TODO: tokens should be set by OAuth2 client.
        oauth2Client.setCredentials(tokens);
        console.log(err);

        if (!err) {
            console.log(tokens);
            var calendar = new gcal.GoogleCalendar(tokens.access_token);
            calendar.calendarList.list(function (err, calendarList) {
                console.log(err);
                console.log(calendarList);
                //fs.writeFile('./sampleCalendarListJSON.txt', JSON.stringify(calendarList));

                //TODO For all calendars with id that doesn't end in 'google.com' AND access_role = 'owner'
                calendar.events.list(calendarList.items[0].id, function (err, calendar) {
                    console.log(err);
                    console.log(calendar);
                    //fs.writeFile('./sampleCalendarJSON.txt', JSON.stringify(calendarList));

                    //req.cookies.authed = true;
                    //req.cookies.id = calendarList.items[0].id;

                    //res.cookie('authed', true, { maxAge: 90000000, httpOnly: true });
                    res.cookie('id', new Buffer(calendarList.items[0].id).toString('base64'), { maxAge: 90000000, httpOnly: true });

                    calendar["id"] = calendarList.items[0].id;

                    //TODO Dump to Mongo
                    var insertDocuments = function (db, callback) {
                        // Get the documents collection
                        console.log("PENIS");
                        var collection = db.collection('calendars');

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
                            res.location('./checkGroup');
                            res.end();
                        });
                    });

                });
            });
        }
        else {
            res.end();
        }
    });


    //res.contentType('application/json');
    //res.send(JSON.stringify(jsonBuilder));
});

module.exports = router;
