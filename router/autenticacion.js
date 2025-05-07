const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();
const Usuario = require('../models/usuario');

router.get('/autenticacion', (req, res) => {
    res.render('autenticacion'); 
});

router.post('/register', async (req, res) => {
    const { nombre, correo, contrasena, edad, tipo_vivienda, motivos } = req.body;

    try {
        const existe = await Usuario.findOne({ correo });
        if (existe) return res.status(400).send('Correo ya registrado');

        const hashedPassword = await bcrypt.hash(contrasena, 10);

        const nuevoUsuario = new Usuario({
            nombre,
            correo,
            contrasena: hashedPassword,  
            edad,
            tipo_vivienda,
            motivos
        });

        await nuevoUsuario.save();
        
        res.redirect('/filtro');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error al registrar usuario');
    }
});

router.post('/login', async (req, res) => {
    const { correo, contrasena } = req.body;
    try {
        const usuario = await Usuario.findOne({ correo });
        if (!usuario) {
            return res.status(400).send('Credenciales incorrectas');
        }

        const match = await bcrypt.compare(contrasena, usuario.contrasena);
        if (!match) {
            return res.status(400).send('Credenciales incorrectas');
        }

        req.session.usuario = {
            nombre: usuario.nombre,
            correo: usuario.correo,
            id: usuario._id
        };

        res.redirect('/filtro');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error al iniciar sesión');
    }
});

router.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            console.error('Error al cerrar sesión', err);
        }
        res.redirect('/');
    });
});

router.get('/filtro', (req, res) => {
    if (!req.session.usuario) {
        return res.redirect('/autenticacion'); // Si no hay sesión, redirigir a autenticación
    }
    
    res.render('filtroPerro', { usuario: req.session.usuario });
});



module.exports = router;
