'use strict'

const express =require('express');
require('dotenv').config();

const cors = require('cors');

const app = express();
app.use(cors());

const PORT = process.env.PORT || 3003

app.get('/location', (request, response)=> {
 try{
  const city = request.query.data;

  const locationData = location(city);
  console.log(locationData);
  response.send(locationData);
 }
 catch(error) {
   Error (error , response);
 }
   
 
});


function locationData(location) {
  const geoData = require('./data/geo.json');
  console.log(geoData);
  const locationObject = new Location (location, geoData);
  return locationObject;

}

function location (city, geoData) {
  this.search_query = city;
  this.formatted_query = geoData.results[0].formatted_address;
  this.latitude = geoData.results[0].geometry.location.lat;
  this.longitude = geoData.results[0].geometry.location.lng;
}


app.get('/weather', (request, response)=> {
  const darkskyData = require('.data/darksky.json')
  const tempArray = [];

  darkskyData.daily.data.forEach (object => {
    let tempValue = new Weather (object);
    tempArray.push(tempValue);
  }) 
  try{
  response.status(200).send(tempArray);
  }
  catch(error) {
  Error (error , response)
  }
});

function Weather (object) {
  this.forecast = object.situation
  this.time = this.revisedDate(object.time);
}

Weather.prototype.revisedDate = function (time){
let date = new Date(time*1000);
return date.toDateString()
}

function Error (error , response) {
  console.error(error);
  return response.status(500).send('Sorry, there is a temporary problem.Please try it later.');
  
}
app.get('*' , (request , response ) => {
  response.status(404);
  response.send('Server connection problem');
}),

app.listen(PORT, () => console.log (`app is listening on ${PORT}`));
