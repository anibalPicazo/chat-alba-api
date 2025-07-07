const mongoose = require('mongoose');

const EventoSchema = new mongoose.Schema({
  titulo: { type: String, required: true },
  descripcion: { type: String },
  fecha: { type: Date, required: true },
  ubicacion: { type: String },
});

module.exports = mongoose.model('Evento', EventoSchema);