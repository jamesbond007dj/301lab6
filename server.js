'use strict'

const express =require('express');
require('dotenv').config();

const cors = require('cors');

const app = express();
app.use(cors());

const PORT = process.env.PORT || 3003

app.get('/location', (request, response)=> {
  const city = request.querry.data;

  const locationData =searchLatToLong(city);
  console.log(locationData);
  response.send(locationData);
});



// {
//   "search_query": "seattle",
//   "formatted_query": "Seattle, WA, USA",
//   "latitude": "47.606210",
//   "longitude": "-122.332071"
// }


function locationData(location) {
  const geoData = require('./data/geo.json');
  console.log(geoData);
  const locationObject = new Location (location, geoData);
  return locationObject;

}

function location (city, geoData) {
  this.search_querry = city;
  this.formatted_querry = geoData.results[0].formatted_address;
  this.latitude = geoData.results[0].geometry.location.lat;
  this.longitude = geoData.results[0].geometry.location.lng;
}

app.get('*' , (request , response ) => {
  response.status(404);
  response.send('problem');
}),


app.listen(PORT, () => console.log (`app is listening on ${PORT}`));
