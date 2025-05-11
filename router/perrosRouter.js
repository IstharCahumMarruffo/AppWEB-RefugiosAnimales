const express = require('express');
const router = express.Router();
const Perro = require('../models/perro');

router.get('/', async (req, res) => {
  const query = {};

  if (req.query.nombre) {
    query.nombre = { $regex: req.query.nombre, $options: 'i' };
  }
  if (req.query.edad) {
    query.edad = { $regex: req.query.edad, $options: 'i' };
  }
  if (req.query.sexo) {
    query.sexo = { $regex: req.query.sexo, $options: 'i' };
  }
  if (req.query.talla) {
    query.talla = { $regex: req.query.talla, $options: 'i' };
  }

  try {
    const perros = await Perro.find(query);
    res.render('filtroPerro', {
      perros,
      search: req.query.nombre || '',
      searchEdad: req.query.edad || '',
      searchSexo: req.query.sexo || '',
      searchTalla: req.query.talla || ''
    });
  } catch (err) {
    res.status(500).send('Error al intentar hacer la búsqueda');
  }
});


module.exports = router;