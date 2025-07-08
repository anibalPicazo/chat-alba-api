const mongoose = require('mongoose');

const AgendaSchema = new mongoose.Schema({
    idUsuario: { type: String, required: true },
    descripcion: { type: String },
    fecha: { type: Date, required: true },
});

module.exports = mongoose.model('Agenda', AgendaSchema);