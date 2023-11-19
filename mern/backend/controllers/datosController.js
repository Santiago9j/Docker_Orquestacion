const Datos = require('../models/datos'); 

exports.guardarDatos = async (req, res) => {
  try {
    const nuevoDato = new Datos({
      nombre: req.body.nombre,
      apellidos: req.body.apellidos,
      edad: req.body.edad,
      identificacion: req.body.identificacion,
      nacionalidad: req.body.nacionalidad,
      email: req.body.email
    });

    await nuevoDato.save();

    res.status(200).send('Datos guardados en la base de datos correctamente');
  } catch (error) {
    console.error('Error al guardar los datos en la base de datos:');
    res.status(500).send('Hubo un error al guardar los datos en la base de datos');
  }
};

exports.obtenerListado = async (req, res) => {
  try {
    const listadoDatos = await Datos.find({});
    res.status(200).json(listadoDatos);
  } catch (error) {
    console.error('Error al obtener el listado de datos:');
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
};

exports.editarDatos = async (req, res) => {
  try {
    const datoId = req.params.id; 
    const datosActualizados = {
      nombre: req.body.nombre,
      apellidos: req.body.apellidos,
      edad: req.body.edad,
      identificacion: req.body.identificacion,
      nacionalidad: req.body.nacionalidad,
      email: req.body.email
    };

    const resultado = await Datos.findByIdAndUpdate(datoId, datosActualizados, {
      new: true 
    });

    if (!resultado) {
      return res.status(404).json({ mensaje: 'Registro no encontrado' });
    }

    res.status(200).json(resultado);
  } catch (error) {
    console.error('Error al editar los datos:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
};

exports.eliminarDatos = async (req, res) => {
  try {
    const datoId = req.params.id; 

    const resultado = await Datos.findByIdAndDelete(datoId);

    if (!resultado) {
      return res.status(404).json({ mensaje: 'Registro no encontrado' });
    }

    res.status(200).json({ mensaje: 'Registro eliminado correctamente' });
  } catch (error) {
    console.error('Error al eliminar el registro:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
};
