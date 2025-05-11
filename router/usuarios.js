const express = require('express');
const router = express.Router();
const Usuario = require('../models/usuario');
const FormularioAdopcion = require('../models/formularioAdopcion');
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

router.put('/actualizar/:id', async (req, res) => {
    const { id } = req.params;
    const { nombre, correo, contrasena } = req.body;

    try {
        let updateData = { nombre, correo };

        if (contrasena) {
            const hashedPassword = await bcrypt.hash(contrasena, 10);
            updateData.contrasena = hashedPassword;
        }

        const usuarioActualizado = await Usuario.findByIdAndUpdate(id, updateData, { new: true });

        if (!usuarioActualizado) {
            return res.status(404).json({ mensaje: "Usuario no encontrado" });
        }

        res.status(200).json({ mensaje: 'Usuario actualizado correctamente', usuario: usuarioActualizado });

    } catch (error) {
        console.error("Error al actualizar usuario:", error);
        res.status(500).json({ mensaje: "Error al actualizar el usuario" });
    }
});

router.delete('/eliminar/:id', async (req, res) => {
    const { id } = req.params;

    try {
        await FormularioAdopcion.deleteMany({ usuarioId: id });

        await Usuario.findByIdAndDelete(id);

        req.session.destroy(err => {
            if (err) {
                console.error('Error al destruir la sesión', err);
                return res.status(500).json({ mensaje: 'Error al cerrar sesión' });
            }

            res.status(200).json({ mensaje: 'Usuario eliminado correctamente' });
        });

    } catch (error) {
        console.error("Error al eliminar usuario:", error);
        res.status(500).json({ mensaje: "Error al eliminar el usuario" });
    }
});

module.exports = router;
