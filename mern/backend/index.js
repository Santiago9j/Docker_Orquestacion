const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors'); 
const port = 3006;
const datosController = require('./controllers/datosController'); 
mongoose.connect('mongodb://baseDatos:27017/bd', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json())

app.get('/listado', datosController.obtenerListado);
app.post('/enviar-datos', datosController.guardarDatos);
app.put('/actualizar/:id', datosController.editarDatos)
app.delete('/eliminar/:id', datosController.eliminarDatos)

app.get('/', (req, res) => {
  res.send('¡Hola desde el contenedor backend!');
});

app.listen(port, () => {
  console.log(`El contenedor backend está en ejecución`);
});
