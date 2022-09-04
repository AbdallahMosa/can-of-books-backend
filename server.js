'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
const mongoose = require('mongoose');
let seedData = require('./book')
let booksHandler = require("./book")
const PORT = process.env.PORT || 3001;
mongoose.connect('mongodb://localhost:27017/Book', {useNewUrlParser: true, useUnifiedTopology: true});


// seedData();

app.get('/', (request, response) => {

  response.send('Home  request received')

})

app.get('/test', (request, response) => {

  response.send('test request received')

})
// http://localhost:3000/books
app.get('/books', booksHandler)


app.listen(PORT, () => console.log(`listening on ${PORT}`));
