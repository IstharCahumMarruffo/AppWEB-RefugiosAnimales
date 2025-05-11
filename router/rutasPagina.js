const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('index');
});

router.get('/nosotros', (req, res) => {
    res.render('nosotros');
});

router.get('/donaciones', (req, res) => {
    res.render('donaciones');
});

router.get('/login', (req, res) => {
    res.render('login');
});

router.get('/formulario', (req, res) => {
    res.render('formulario');
});

router.get('/refugios', (req, res) => {
    res.render('refugios');
});

router.get('/cuidados', (req, res) => {
    res.render('cuidados');
});

// Página 404
router.use((req, res) => {
    res.status(404).render('404');
});

// Exportar el router
module.exports = router;