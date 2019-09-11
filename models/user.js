const mongoose = require("mongoose");
const Schema = mongoose.Schema;

/*  MODELO */

mongoose.connect("mongodb://localhost:27017/fotos",  {useNewUrlParser: true })
.then(() => console.log('MongoDB Connected'))
.catch((err) => console.log(err));

const posibles_valores = ['M', 'F'];
const email_match = [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Coloca un email válido']

const user_schema = new Schema({
  name: String,
  username: {type:String, required: true, maxlength:[50, 'Username muy grande']},
  password: {type:String, minlength: [8, "el password es muy corto"]},
  age: {type: Number, min: [5, 'La edad no puede ser menor qie 5'], max: [100, 'la edad no puede ser mayor que 100']},
  email: {type: String, required: "Correo obligatorio", match: email_match},
  date_of_birth: Date,
  sex: {type: String, enum: {values: posibles_valores, message: "Opción no válida"}}
});

// solo verifica en el sistema, no guarda en la bd
user_schema.virtual("password_confirmation").get(() => {
  return this.p_c;
}).set(password => {
  this.p_c = password;
});

// Users (Plural)
const User = mongoose.model('User', user_schema);

module.exports.User = User;
