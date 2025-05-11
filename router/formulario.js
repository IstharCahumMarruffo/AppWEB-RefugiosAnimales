const express = require('express');
const router = express.Router();
const formularioAdopcion = require('../models/formularioAdopcion'); 

router.get('/', async (req, res) => {
    if (!req.session.usuario) {
        return res.redirect('/autenticacion'); 
    }

    const perroId = req.query.perroId || null;

    try {
        const formulario = await formularioAdopcion.findOne({ usuarioId: req.session.usuario._id });

        res.render('formulario', { formulario, perroId });
    } catch (error) {
        console.error('Error al cargar formulario:', error);
        res.status(500).send('Error al cargar formulario');
    }
});

router.post('/adopcion', async (req, res) => {
    const { nombre_completo, telefono, direccion, ocupacion, otros_animales, motivos, perroId } = req.body;

    try {
        if (!req.session.usuario) {
            return res.redirect('/registro');  
        }

        const formularioExistente = await formularioAdopcion.findOne({ usuarioId: req.session.usuario._id });

        if (formularioExistente) {
            return res.status(400).send('Ya has registrado un formulario de adopción.');
        }

        const nuevoFormulario = new formularioAdopcion({
            usuarioId: req.session.usuario._id, 
            perroId,  
            nombre_completo,
            telefono,
            direccion,
            ocupacion,
            otros_animales,
            motivos
        });

        await nuevoFormulario.save();

        res.redirect('/'); 

    } catch (err) {
        console.error('Error al guardar formulario:', err.message);
        res.status(500).send('Error al registrar formulario');
    }
});


router.get('/filtro', (req, res) => {
    if (!req.session.usuario) {
        return res.redirect('/autenticacion');  // Redirige si no hay sesión
    }
    
    res.render('filtroPerro', { usuario: req.session.usuario });
});

module.exports = router;
