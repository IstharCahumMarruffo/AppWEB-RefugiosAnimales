const express = require('express');
const router = express.Router();
const FormularioAdopcion = require('../models/formularioAdopcion');
const Usuario = require('../models/usuario');


router.get('/verformulario/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const formulario = await FormularioAdopcion.findById(id);

        if (!formulario) {
            return res.status(404).send('Formulario no encontrado');
        }

        res.render('verFormulario', { formulario }); 
    } catch (error) {
        console.error('Error al obtener el formulario:', error);
        res.status(500).send('Error al obtener el formulario');
    }
});


router.post('/eliminarform/:id', async (req, res) => {
  const { id } = req.params;

  try {
      const formularioEliminado = await FormularioAdopcion.findByIdAndDelete(id);

      if (!formularioEliminado) {
          return res.status(404).send('Formulario no encontrado');
      }

      res.redirect('/filtroPerro'); 
  } catch (error) {
      console.error("Error al eliminar formulario:", error);
      res.status(500).send("Error al eliminar formulario");
  }
});

module.exports = router;