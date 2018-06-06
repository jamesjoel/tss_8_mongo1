var express = require('express');
var app = express();
var bodyParser = require('body-parser');



/* This is for mongodb connection*/

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017";



app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser());


app.get("/", function(req, res){
	MongoClient.connect(url, function(err, client){
		if(err){
			console.log("Connaction Error", err);
			return;
		}
		var db = client.db("demo");
		db.collection('student').find().toArray(function(err, result){
			if(err){
				console.log("Faching Error", err);
				return;
			}
			console.log(result);
			var obj = {data : result};
			res.render("show", obj);
		});

	});
});

app.listen(3000, function(){
	console.log("Running");
	
});