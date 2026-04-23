const express = require("express");
const cors = require("cors");
const helmet = require("helmet"); //  NUEVO
require("dotenv").config();

const connectDB = require("./config/db");
const productRoutes = require("./routes/products");
const orderRoutes = require("./routes/orders");

const app = express();

connectDB();

//  SEGURIDAD
app.use(
  helmet({
    contentSecurityPolicy: false
  })
);

app.use(cors({
  origin: "http://localhost:5173" //  restricción 
}));

app.use(express.json());

//   RUTAS 
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);

//   ENDPOINT DEL EJERCICIO
app.post("/comentarios", (req, res) => {
  const { comentario } = req.body;

  res.json({
    mensaje: "Comentario recibido",
    comentario
  });
});

app.get("/", (req, res) => {
  res.send("API funcionando ");
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log("Servidor corriendo en puerto " + PORT);
});