// $ npm install --save express request ejs
var express = require("express");
var app = express();
var request = require("request");
app.set("view engine", "ejs");

//================
// ROUTES
//================

app.get("/", function(req, res){
    res.render("search");
})

//API init
app.get("/results", function(req, res){
    var query = req.query.search;
    var url = "http://www.omdbapi.com/?s=" + query +"&apikey=thewdb"
    request(url, function(error, response, body){
        if(!error && response.statusCode == 200) {
            //parsed body to get an object is needed
            var data = JSON.parse(body);
            //{data: data} is a way of sending data to webpage
            res.render("results", {data: data});
        }
    });
});

app.listen(process.env.PORT, process.env.IP, function (){
    console.log("Movie App has started");
})