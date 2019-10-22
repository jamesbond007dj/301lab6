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

  response.send(cityData);
});

function locationData(location) {
  const geoData = require('./data/geo.json');

}

app.get('*' , (request , response ) => {
  response.status(404);
  response.send('problem');
}),


app.listen(PORT, () => console.log (`app is listening on ${PORT}`));
