/**
 * Created by Brent on 4/12/2015.
 */

var fs = require('fs');

fs.readFile('./sampleCalendarJSON.txt', function(err, result) {
    var calendar = JSON.parse(result);

    var freeTime = [];
    // the :00--4:00 is zero seconds and then -4 b/c new york is -4 timezone form utc
    var currentDate = new Date();
    var start;
    if (parseInt(("4", 10) + 1) < 10) {
        start = currentDate.getFullYear() + "-" + "0" + (currentDate.getMonth() + 1) + "-" + currentDate.getDate() + "T" + currentDate.getHours() + ":" + currentDate.getMinutes() + ":00:-0400:";
    } else {
        start = currentDate.getFullYear() + "-" + (currentDate.getMonth() + 1) + "-" + currentDate.getDate() + "T" + currentDate.getHours() + ":" + currentDate.getMinutes() + ":00:-0400:";
    }
    console.log(start);

    var items = calendar.items;
    for (var event in items) {

        if (items[event].start != null && items[event].start.dateTime != null && items[event].end.dateTime != null) {
            freeTime.push({event: {startTime: start, endTime: items[event].start.dateTime}});
            start = items[event].end.dateTime;
        }
    }



    // do stuff with calendars
    console.log(freeTime);

    console.log('print the output to console');

    // When writing a JSON, use JSON.stringify(jsonObj)
    fs.writeFile('./output.txt', 'ouptut data here');
});