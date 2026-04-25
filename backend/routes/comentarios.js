const express = require("express");
const { body, validationResult } = require("express-validator");
const Comentario = require("../models/Comentario");

const router = express.Router();

router.post(
  "/",
  [
    body("puntuacion")
      .isInt({ min: 1, max: 5 })
      .withMessage("La puntuación debe ser un entero entre 1 y 5"),

    body("texto")
      .isLength({ max: 200 })
      .withMessage("El texto no puede superar 200 caracteres")
      .trim()
      .escape()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const comentario = new Comentario(req.body);
      await comentario.save();
      res.status(201).json(comentario);
    } catch (err) {
      res.status(500).json({ error: "Error al guardar comentario" });
    }
  }
);

module.exports = router;
