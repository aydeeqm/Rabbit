const express = require('express');
const bodyParser = require('body-parser');
const User = require('./models/user').User;
const session = require('express-session');
const router_app = require('./routes_app');
const session_middleware = require('./middlewares/session');

const app = express();

// Collecciones => tablas
// Documentos => filas

app.use('/public',express.static('public'));
app.use(bodyParser.json()); // para peticiones aplicacion/json
app.use(bodyParser.urlencoded({extended: false}));
app.use(session({
  secret: '123sdjhs1677',
  resave: false,
  saveUninitialized: false,
}));

app.set('view engine', 'pug')

app.get('/', (request, response) => {
  response.render('index', { message: 'Hello there!' })
});

app.get('/signup', (request, response) => {
  User.find((err, doc) => {
    console.log(doc);
    response.render('signup');
  });
});

app.get('/login', (request, response) => {
  response.render('login');
});

app.post('/users', (request, response) => {
  const user = new User({
    email: request.body.email,
    password: request.body.password,
    password_confirmation: request.body.password_confirmation,
    username: request.body.username
  });
  
  user.save().then((us) => {
    response.send('Recibimos tus datos');
  }).catch((err) => {
    console.log(String(err));
    response.send('Hubo un error :(')
  })

});

app.post('/sessions', (request, response) => {
  // params: query, fields, callback
  User.findOne({
    email: request.body.email,
    password: request.body.password,
  }, function(err, user){
    console.log(user);
    request.session.user_id = user._id;
    response.redirect('/app')
  }) 
});

app.use('/app', session_middleware);
app.use('/app', router_app);

app.listen('8080', () => {
  console.log('servidor prendido');
});
