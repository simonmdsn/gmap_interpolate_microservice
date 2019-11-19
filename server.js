var express = require('express'),
  app = express(),
  port = process.env.PORT || 3000;

app.listen(port);

var geometry = require('spherical-geometry-js');

app.get('/calculate/:startLat/:startLng/:endLat/:endLng',(req,res,next) => {

  //Take params from the url and uses them as params for LatLng objects
  let start = new geometry.LatLng(req.params.startLat,req.params.startLng);
  let end = new geometry.LatLng(req.params.endLat,req.params.endLng);
  
  //Returns distance between points in meters
  let distance = geometry.computeDistanceBetween(start,end);

  //Duration of the flight in seconds
  let seconds = distance / 14;

  //Array of coordinates
  let coordinates = [];
  
  //Creates coordinate for each second.
  for (let i = 0; i < seconds; i++) {
    var coordinate = geometry.interpolate(start,end,i/seconds);
    var lat = coordinate.lat();
    var lng = coordinate.lng();
    coordinates.push([lat,lng]);
  }
  
  //Sends requests
  res.send(coordinates);
})

console.log('Server started on: ' + port);