const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const formSchema = new Schema({
    usuarioId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario', 
        required: true
    },
    perroId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Perro',
        required: true
    }, 
    nombre_completo: {
        type: String,
        required: true
    },
    telefono: {
        type: String,
        required: true,
        unique: true
    },
    direccion: {
        type: String,
        required: true
    },
    ocupacion: {
        type: String,
        required: true
    },
    otros_animales: {
        type: String,
        required: true
    },
    motivos: {
        type: String,
        required: true
    }
});

const formularioAdopcion = mongoose.model('formularioAdopcion', formSchema);
module.exports = formularioAdopcion;
