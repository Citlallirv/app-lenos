const express = require("express");
const router = express.Router();
const Order = require("../models/Order");

// crear pedido
router.post("/", async (req, res) => {
  try {

    const nuevoPedido = new Order(req.body);

    const pedidoGuardado = await nuevoPedido.save();

    res.json(pedidoGuardado);

  } catch (error) {
    res.status(500).json(error);
  }
});


// obtener pedidos
router.get("/", async (req, res) => {
  try {

    const pedidos = await Order.find().sort({ fechaPedido: -1 });

    res.json(pedidos);

  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;