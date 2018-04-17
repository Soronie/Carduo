var express = require("express");
var app = express();
var port = process.env.PORT || 8000;
var path = require("path");

// Allow access to static content for the app from the public directory 
app.use(express.static(path.join(__dirname, 'public')));
app.set("view engine", "ejs");

// Send the main application embedded JS page with initial number of lives/round
app.get('*', function(req, res){
	res.sendFile(path.join(__dirname+ '/public/index.html'));
});

// Start server
app.listen(port, function(err){
	if(err) {
		console.log(err);
	} else {
		console.log("Connected to server.");
	}
});