const mongoose = require('mongoose');

const datosSchema = new mongoose.Schema({
  nombre: String,
  apellidos: String,
  edad: {
    type: Number,
    validate: {
      validator: Number.isInteger, 
      message: 'La edad debe ser un número entero.'
    }
  },
  identificacion: String,
  nacionalidad: String,
  email: String
});

const Datos = mongoose.model('Datos', datosSchema);

module.exports = Datos;
