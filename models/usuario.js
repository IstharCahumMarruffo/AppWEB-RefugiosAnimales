const mongoose = require ('mongoose');
const router = require('../router/autenticacion');

const Schema = mongoose.Schema;

const usuarioSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    correo: {
        type: String,
        required: true,
        unique: true
    },
    contrasena: {
        type: String,
        required: true
    },
    edad: {
        type: Number,
        required: true
    },
    tipo_vivienda: {
        type: String,
        required:true
    },
    motivos: {
        type: String,
        required:true
    }
});

const Usuario = mongoose.model('Usuario', usuarioSchema)
module.exports = Usuario;
