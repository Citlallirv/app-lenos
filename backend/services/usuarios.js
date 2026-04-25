const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Usuario = require("../models/User");

async function createUsuario({ username, password }) {
  const hashedPassword = await bcrypt.hash(password, 10);
  const usuario = new Usuario({ username, password: hashedPassword });
  return await usuario.save();
}

async function loginUsuario({ username, password }) {
  const usuario = await Usuario.findOne({ username });
  if (!usuario) throw new Error("Usuario no encontrado");

  const isPasswordCorrect = await bcrypt.compare(password, usuario.password);
  if (!isPasswordCorrect) throw new Error("Contraseña incorrecta");

  const token = jwt.sign(
    { sub: usuario._id, role: usuario.role },
    process.env.JWT_SECRET,
    { expiresIn: "24h" }
  );

  return token;
}

module.exports = { createUsuario, loginUsuario };
