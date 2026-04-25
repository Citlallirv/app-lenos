const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
require("dotenv").config();
const connectDB = require("./config/db");
const productRoutes = require("./routes/products");
const orderRoutes = require("./routes/orders");
const usuarioRoutes = require("./routes/usuarios");
const comentariosRoutes = require("./routes/comentarios");
 
const app = express();
 
connectDB();
 
// Necesario para Render/proxies (fix rate-limit ERR_ERL_UNEXPECTED_X_FORWARDED_FOR)
app.set("trust proxy", 1);
 
// HEALTH CHECK — antes de todo middleware
app.get("/health", (req, res) => {
  res.json({ status: "healthy" });
});
 
app.get("/", (req, res) => {
  res.json({ status: "OK", mensaje: "API de Leños funcionando" });
});
 
// SEGURIDAD BASE
app.use(helmet({ contentSecurityPolicy: false }));
 
// CORS DINÁMICO
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:3000",
  process.env.FRONTEND_URL,
].filter(Boolean);
 
app.use(
  cors({
    origin: (origin, callback) => {
      // Sin origin = navegador directo o Postman, permitir siempre
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) return callback(null, true);
      callback(new Error("No permitido por CORS"));
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization", "x-api-key"],
  })
);
 
app.use(express.json());
 
// RATE LIMIT — 10 peticiones por minuto (rúbrica 1.1)
const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 10,
  message: { error: "Too many requests, try again later." },
  standardHeaders: true,
  legacyHeaders: false,
});
app.use("/api/v1/comentarios", limiter);
 
// API KEY (rúbrica Fase 4)
const validateApiKey = (req, res, next) => {
  if (process.env.API_KEY) {
    const key = req.headers["x-api-key"];
    if (!key || key !== process.env.API_KEY) {
      return res.status(401).json({ error: "API Key inválida o ausente" });
    }
  }
  next();
};
app.use("/api/v1/comentarios", validateApiKey);
 
// RUTAS
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/v1/usuario", usuarioRoutes);
app.use("/api/v1/comentarios", comentariosRoutes);
 
// LOGS SEGUROS (rúbrica 4.1)
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  if (process.env.NODE_ENV !== "production") {
    console.log(`Servidor corriendo en puerto ${PORT}`);
  } else {
    console.log("Servidor iniciado");
  }
});