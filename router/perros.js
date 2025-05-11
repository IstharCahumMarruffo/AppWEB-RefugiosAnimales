const express = require('express');
const router = express.Router();
const Perro = require('../models/perro');

//CRUD:  READ  de los perros
router.get('/', async (req, res) => {
  const query = {};

  // Filtro de nombre opcional
  if (req.query.nombre) {
    query.nombre = { $regex: req.query.nombre, $options: 'i' }; // Case-insensitive
  }

  // Filtro de edad opcional
  if (req.query.edad) {
    query.edad = { $regex: req.query.edad, $options: 'i' };
  }

  // Filtro de sexo opcional
  if (req.query.sexo) {
    query.sexo = { $regex: req.query.sexo, $options: 'i' };
  }

   // Filtro de talla opcional
   if (req.query.talla) {
    query.talla = { $regex: req.query.talla, $options: 'i' };
  }

  try {
    const perros = await Perro.find(query);
    res.render('filtroPerro', { 
      perros, 
        search: req.query.nombre || '' ,
        searchEdad: req.query.edad || '',
        searchSexo: req.query.sexo || '',
        searchTalla: req.query.talla || ''   
      });
  } catch (err) {
    res.status(500).send('Error al intentar hacer la busqueda');
  } 
});


//CRUD:  CREATE  de los perros. lleva a un form
router.get('/new', (req, res) => {
  res.render('new');
});

// CRUD:  CREATE. da de alta a nuevo perro
router.post('/', async (req, res) => {
  const { nombre, edad, sexo, talla } = req.body;
  await Perro.create({ nombre, edad, sexo, talla });
  res.redirect('/filtroPerro');
});


router.get('/:id/edit', async (req, res) => {
  const perro = await Perro.findById(req.params.id);
  res.render('edit', { perro });
});

router.post('/:id', async (req, res) => {
  const { nombre, edad, sexo, talla } = req.body;
  await Perro.findByIdAndUpdate(req.params.id, { nombre, edad, sexo, talla });
  res.redirect('/filtroPerro');
});

router.post('/:id/delete', async (req, res) => {
  await Perro.findByIdAndDelete(req.params.id);
  res.redirect('/filtroPerro');
});

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
        search: req.query.nombre || '' ,
        searchEdad: req.query.edad || '',
        searchSexo: req.query.sexo || '',
        searchTalla: req.query.talla || ''   
      });
  } catch (err) {
    res.status(500).send('Error al intentar hacer la busqueda');
  } 
});


router.get('/new', (req, res) => {
  res.render('new');
});

router.post('/', async (req, res) => {
  const { nombre, edad, sexo, talla } = req.body;
  await Perro.create({ nombre, edad, sexo, talla });
  res.redirect('/filtroPerro');
});


router.get('/:id/edit', async (req, res) => {
  const perro = await Perro.findById(req.params.id);
  res.render('edit', { perro });
});

router.post('/:id', async (req, res) => {
  const { nombre, edad, sexo, talla } = req.body;
  await Perro.findByIdAndUpdate(req.params.id, { nombre, edad, sexo, talla });
  res.redirect('/filtroPerro');
});

router.post('/:id/delete', async (req, res) => {
  await Perro.findByIdAndDelete(req.params.id);
  res.redirect('/filtroPerro');
});

router.get('/', async (req, res) => {
  const query = {};
  
  if (req.query.nombre) {
    query.nombre = { $regex: req.query.nombre, $options: 'i' };
  }

  try {
    const perros = await Perro.find(query);
    res.render('filtroPerro', { perros, search: req.query.nombre || '' });
  } catch (err) {
    res.status(500).send('Error retrieving dogs');
  }
});

module.exports = router;
