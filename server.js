'use strict'

const express =require('express');
require('dotenv').config();

const app = express();

const PORT = process.env.PORT || 3003



app.listen(PORT, () => console.log ('app is listening on ${PORT}'));
