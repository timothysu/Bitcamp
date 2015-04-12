var express = require('express');
var router = express.Router();
var google = require('googleapis');
var OAuth2 = google.auth.OAuth2;
var gcal = require('google-calendar');
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

        console.log(tokens);
        var calendar = new gcal.GoogleCalendar(tokens.access_token);
        calendar.calendarList.list(function(err, calendarList) {
            console.log(err);
            console.log(calendarList);

            //TODO For all calendars with id that doesn't end in 'google.com' AND access_role = 'owner'
            calendar.events.list('ben.overholts@gmail.com', function(err, calendarList) {
                console.log(err);
                console.log(calendarList);

                //TODO Dump to Mongo

                res.close();
            });
        });
    });


    //res.contentType('application/json');
    //res.send(JSON.stringify(jsonBuilder));
});

module.exports = router;
