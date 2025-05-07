const express = require('express');
const router = express.Router();
const Usuario = require('../models/usuario');
const bcrypt = require('bcryptjs');

router.get('/usuarios', async (req, res) => {
    try {
        const arregloUsuariosDB = await Usuario.find();
        res.render('usuarios', {
            arregloUsuarios: arregloUsuariosDB
        });
    } catch (error) {
        console.log(error);
        res.status(500).send('Error al obtener usuarios');
    }
});


router.post('/actualizar/:id', async (req, res) => {
    const { id } = req.params;
    const { nombre, correo, contrasena } = req.body; // Asegúrate de incluir 'nombre'

    try {
        let updateData = { nombre, correo }; // Agregando el nombre

        // Si el usuario ingresó una nueva contraseña, cifrarla antes de actualizar
        if (contrasena) {
            const hashedPassword = await bcrypt.hash(contrasena, 10);
            updateData.contrasena = hashedPassword;
        }

        await Usuario.findByIdAndUpdate(id, updateData, { new: true });

        res.redirect('/filtro'); // Redirige a la vista después de la actualización
    } catch (error) {
        console.error("Error al actualizar usuario:", error);
        res.status(500).send("Error al actualizar el usuario");
    }
});





module.exports = router;
