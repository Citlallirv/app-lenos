const mongoose = require("mongoose");

const ComentarioSchema = new mongoose.Schema({
  puntuacion: { type: Number, required: true },
  texto: { type: String, required: true }
});

module.exports = mongoose.model("Comentario", ComentarioSchema);
