var express = require("express");
var app = express();
var port = process.env.PORT || 8000;

// Allow access to static content for the app from the current directory 
app.use(express.static(__dirname));
app.set("view engine", "ejs");

// Send the main application embedded JS page with initial number of lives/round
app.get('*', function(req, res){
	res.render("index", {initialLives: 5});
});

// Start server
app.listen(port, function(err){
	if(err) {
		console.log(err);
	} else {
		console.log("Connected to server.");
	}
});