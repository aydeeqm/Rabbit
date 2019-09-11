const express = require('express');
const bodyParser = require('body-parser');
const User = require('./models/user').User;
const app = express();

// Collecciones => tablas
// Documentos => filas

app.use('/public',express.static('public'));
app.use(bodyParser.json()); // para peticiones aplicacion/json
app.use(bodyParser.urlencoded({extended: false}));

app.set('view engine', 'pug')

app.get('/', (request, response) => {
  response.render('index', { message: 'Hello there!' })
});

app.get('/login', (request, response) => {
  User.find((err, doc) => {
    console.log(doc);
    response.render('login');
  });
});

app.post('/users', (request, response) => {
  const user = new User({
    email: request.body.email,
    password: request.body.password,
    password_confirmation: request.body.password_confirmation
  });
  console.log('pass', user.password_confirmation);
  user.save(err => {
    if(err) {
      console.log(String(err));
    }
    response.send('Recibimos tus datos');
  });
});

app.listen('8080', () => {
  console.log('servidor prendido');
});
