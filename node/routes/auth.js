/**
 * Created by Ben on 4/11/2015.
 */
var express = require('express');
var router = express.Router();
var google = require('googleapis');
var OAuth2 = google.auth.OAuth2;
var plus = google.plus('v1');
var CLIENT_ID = '541057803748-kbh3vjrs4mlvlrcd09t4lomfc171ulra.apps.googleusercontent.com';
var CLIENT_SECRET = 'forMWLuaj90Ary0OZPSbddz_';
var REDIRECT_URL = 'http://localhost/oauth2callback';


var oauth2Client = new OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URL);

router.get('/', function(req, res) {
    //console.log(req.body);
    //var jsonObj = req.body;

    // Parse into format here
/*
    var exec = require('child_process').exec;
    var command = 'java -cp ourjar.jar Main "' + JSON.stringify(jsonObj) + '"';
    console.log(command);
    exec(command, function (error, stdout, stderr) {
        //if(error) console.log(error);
        //if(stderr) console.log(stderr);
        //if(stdout) console.log(stdout);
        res.setHeader('Connection', 'close');
        res.contentType('application/json');
        if(stdout) {
            res.send(JSON.stringify(JSON.parse(stdout)));
        }
        else {
            res.send('');
        }
    });*/

    var url = oauth2Client.generateAuthUrl({
        access_type: 'offline', // will return a refresh token
        scope: 'https://www.googleapis.com/auth/calendar.readonly' // can be a space-delimited string or an array of scopes
    });

    res.send(url);
    res.close();

    //res.contentType('application/json');
    //res.send(JSON.stringify(jsonBuilder));
});

module.exports = router;