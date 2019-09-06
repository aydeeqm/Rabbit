const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

mongoose.connect("mongodb://localhost:27017/fotos",  {useNewUrlParser: true })
.then(() => console.log('MongoDB Connected'))
.catch((err) => console.log(err));;

const userSchemaJSON = {
  email: String,
  password: String
};

const user_schema = new Schema(userSchemaJSON);

const User = mongoose.model("User", user_schema);

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
    password: request.body.password
  });
  user.save(() => {
    response.send('Recibimos tus datos');
  });
});

app.listen('8080', () => {
  console.log('servidor prendido');
});
