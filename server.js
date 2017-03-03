var express = require('express');
var path = require('path');
var app = express();

// Define the port to run on
app.set('port', 3000);

app.use('/modules', express.static(__dirname + '/node_modules/'));



app.use(express.static(path.join(__dirname, 'app')));

app.use('/controllers', express.static(__dirname + '/app/presentation/controllers/'));

app.use('/services', express.static(__dirname + '/app/appServices/'));

app.use('/directives', express.static(__dirname + '/app/presentation/directives/'));

app.use('/templates', express.static(__dirname + '/app/presentation/templates/'));

// Listen for requests
var server = app.listen(app.get('port'), function() {
  var port = server.address().port;
  console.log('Magic happens on port ' + port);
});