const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/index.html")

   
});

app.post("/",  function(req, res){
 
    const query =req.body.cityName;
    const apikey = "0c93b9a1e09d8a89b33a9a635bb87add"
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+ query +"&APPID="+ apikey +"&units=metric#";

https.get(url, function(response){

    console.log(response.statusCode);

    response.on("data", function(data){
    const weatherData = JSON.parse(data)
    const temprature = weatherData.main.temp;
    const weatherDiscription = weatherData.weather[0].description;
    const icon = weatherData.weather[0].icon;
    const imgUrl = "http://openweathermap.org/img/wn/" + icon +"@2x.png"
    res.write(" <br><h2>The Weather discription is " +  weatherDiscription + "</h2>" );

    res.write("<h1>The temprature in "+ query + " is " + temprature + "degrees Celcius.</h1>" );
    res.write("<img src="+imgUrl+ ">");
    res.send()

});
});

});























app.listen(8080, function(){
    console.log("sb ok hain");
    
})