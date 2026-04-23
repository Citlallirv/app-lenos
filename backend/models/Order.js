const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  nombre: String,
  direccion: String,
  telefono: String,

  items: [
    {
      nombre: String,
      precio: Number,
      cantidad: Number,
    },
  ],

  total: Number,

  status: {
    type: String,
    default: "pendiente",
  },

  fechaPedido: {
    type: Date,
    default: Date.now,
  },

  fechaEntrega: String,
});

module.exports = mongoose.model("Order", OrderSchema);
