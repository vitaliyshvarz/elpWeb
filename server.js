var express 	  = require('express');
var app 		    = express();
var path 		    = require('path');
var bodyParser 	= require('body-parser');
var port 		    = process.env.PORT || 3000;
var environment = app.settings.env;

app.set('views', path.join(__dirname, './dist'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/dist'));

app.listen(port, function(){
	console.log('app is runnin on port ' + port);
	console.log('environment: ' + environment);
});
