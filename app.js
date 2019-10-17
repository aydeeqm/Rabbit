const express = require('express');
const bodyParser = require('body-parser');
const User = require('./models/user').User;
const session = require('express-session'); // express-session
const router_app = require('./routes_app');
const session_middleware = require('./middlewares/session');
const formidable = require('express-formidable');
const redis = require('redis');
const RedisStore = require('connect-redis')(session);
const http = require('http');
const realtime = require('./realtime');


const methodOverride = require('method-override');

let redisClient = redis.createClient()

const app = express();
const server = http.Server(app);

const sessionMiddleware = session({
  store: new RedisStore({ client: redisClient }), // hash de options,
  secret: "super ultra secret word",
  resave: false,
});

realtime(server, sessionMiddleware); // compartir sessiones socket.io y express

// Collecciones => tablas
// Documentos => filas

app.use('/public',express.static('public'));
app.use(bodyParser.json()); // para peticiones aplicacion/json
app.use(bodyParser.urlencoded({extended: false}));

app.use(methodOverride("_method"));

app.use(sessionMiddleware);

/* app.use(cookieSession({
  name: 'session',
  keys: ['llave-1', 'llave-2']
})); */

app.use(formidable({ keepExtensions: true }));

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
    email: request.fields.email,
    password: request.fields.password,
  }, function(err, user){
    console.log(user);
    request.session.user_id = user._id;
    response.redirect('/app')
  }) 
});

app.use('/app', session_middleware);
app.use('/app', router_app);

server.listen('8080', () => {
  console.log('servidor prendido');
});
