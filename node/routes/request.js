var express = require('express');
var router = express.Router();

/* POST for data */
router.post('/', function(req, res) {
  //console.log(req.body);
  var jsonObj = req.body;

  // Parse into format here

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
  });

  //res.contentType('application/json');
  //res.send(JSON.stringify(jsonBuilder));
});

module.exports = router;
