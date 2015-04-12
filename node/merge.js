/**
 * Created by Brent on 4/12/2015.
 */

/**
 * Created by Brent on 4/12/2015.
 */

var fs = require('fs');

fs.readFile('./sampleCalendarJSON.txt', function(err, result) {
    var calendars = [];
    calendars[0] = JSON.parse(result);
    fs.readFile('./timcalendar.txt', function(err, result) {
            calendars[1] = JSON.parse(result);

            var i = 0;
            var freeTimeList = [];
            for ( i; i < calendars.length; i++)
            {
                var freeTime = [];
                // the :00--4:00 is zero seconds and then -4 b/c new york is -4 timezone form utc
                var currentDate = new Date();
                var start;
                if ((Number(currentDate.getMonth()) + 1) < 10) {
                    start = currentDate.getFullYear() + "-" + "0" + (currentDate.getMonth() + 1) + "-" + currentDate.getDate() + "T" + currentDate.getHours() + ":" + currentDate.getMinutes() + ":00:-0400:";
                } else {
                    start = currentDate.getFullYear() + "-" + (currentDate.getMonth() + 1) + "-" + currentDate.getDate() + "T" + currentDate.getHours() + ":" + currentDate.getMinutes() + ":00:-0400:";
                }

                var items = calendars[i].items;
                for (var event in items) {

                    if (items[event].start != null && items[event].start.dateTime != null && items[event].end.dateTime != null) {
                        freeTime.push({event: {startTime: start, endTime: items[event].start.dateTime}});
                        start = items[event].end.dateTime;
                    }
                }
                freeTimeList.push(freeTime);
            }


            // do stuff with calendars

            while (freeTimeList.length > 1) {
                var freeTime1 = freeTimeList[0];
                var freeTime2 = freeTimeList[1];
                freeTimeList.remove(1); //make sure that is the index

                var iter1 = freeTime1.iterateNext();
                var iter2 = freeTime2.iterateNext();
                var newFreeTime = {};
                while (iter1 != null && iter2 != null) {
                    var newStart;
                    var newEnd;
                    if (iter1.start > iter2.end){
                        iter1 = freeTime1.iterateNext();
                    }else if (iter2.start > iter1.end) {
                        iter2 = freeTime2.iterateNext();
                    }
                    else {
                        if (iter1.start >= iter2.start) {
                            newStart = iter1.start;
                        } else {
                            newStart = iter2.start;
                        }
                        if (iter1.end <= iter2.end) {
                            newEnd = iter1.end;
                        } else {
                            newEnd = iter2.end;
                        }
                        iter1 = freeTime1.iterateNext();
                        iter2 = freeTime2.iterateNext();
                    }
                    // not sure how to actually add a new field to the existing JSON
                    newFreeTime.add({event: {startTime: newStart, endTime: newEnd}});
                }


                freeTimeList[0] = newFreeTime;
            }

            console.log(freeTimeList[0]);

            console.log('print the output to console');

            // When writing a JSON, use JSON.stringify(jsonObj)
            fs.writeFile('./output.txt', 'output data here');
        }
    );
});
