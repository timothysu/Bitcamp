/**
 * Created by Brent on 4/11/2015.
 */
var request = new XMLHttpRequest();
request.open("GET", "../sampleCalendarJSON.txt", false);
request.send(null);
var my_JSON_object = JSON.parse(request.responseText);
alert(my_JSON_object.result[0]);


