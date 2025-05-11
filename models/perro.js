const mongoose = require ('mongoose');

const Schema = mongoose.Schema;
//Se define el Schema
const perroSchema = new mongoose.Schema({
    id: {
        type: String,
        required: false
    },
    nombre: {
        type: String,
        required: true
    },
    edad: {
        type: String,
        required: true
    },
    sexo: {
        type: String,
        required: true
    },
    talla: {
        type: String,
        required:true
    }
});

module.exports = mongoose.model('Perro', perroSchema, 'registroPerros'); 
//'registroPerros'  es el nombre de la coleccion en la MongoDB