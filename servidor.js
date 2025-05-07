const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session'); // Para manejo de sesiones

const aplicacion = express();
const puerto = 3000;

// Conexión a MongoDB
const usuario = 'DigitalSource';
const password = '12345';
const nombreBD = 'Prueba';
const uri = `mongodb+srv://${usuario}:${password}@tallerweb.hb19m0o.mongodb.net/${nombreBD}?retryWrites=true&w=majority&appName=TallerWeb`;

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('✅ Conexión exitosa a MongoDB'))
  .catch(e => console.log('❌ Error de conexión', e));

// Configuración de Express
aplicacion.use(bodyParser.urlencoded({ extended: false }));
aplicacion.use(bodyParser.json());

// Configuración de sesiones
aplicacion.use(session({
  secret: 'miClaveSecreta',
  resave: false,
  saveUninitialized: true
}));

aplicacion.use((req, res, next) => {
    res.locals.usuario = req.session.usuario;
    next();
  });
  
aplicacion.set('view engine', 'ejs');
aplicacion.set('views', __dirname + '/views');
aplicacion.use(express.static(__dirname + '/public'));

// Rutas de autenticación
aplicacion.use('/', require('./router/autenticacion'));

// Rutas adicionales de usuarios
aplicacion.use('/usuarios', require('./router/usuarios'));

// Páginas estáticas
aplicacion.get('/', (req, resp) => {
  resp.render('index');
});

aplicacion.get('/contacto', (req, resp) => {
  resp.render('contacto');
});

aplicacion.get('/donaciones', (req, res) => {
  res.render('donaciones');
});

aplicacion.get('/cuidados', (req, res) => {
  res.render('cuidados');
});

// Ruta 404
aplicacion.use((req, resp, next) => {
  resp.status(404).render('404');
});

// Iniciar servidor
aplicacion.listen(puerto, () => {
  console.log(`🚀 Escuchando las peticiones desde el puerto ${puerto}`);
});
