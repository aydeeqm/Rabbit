const express = require('express');

const app = express();

app.set('view engine', 'pug')

app.get('/', (request, response) => {
  response.render('index', { message: 'Hello there!' })
});

app.get('/login', (request, response) => {
  response.render('login')
});

app.listen('8080', () => {
  console.log('servidor prendido');
});