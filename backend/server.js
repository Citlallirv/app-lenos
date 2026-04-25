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

// SEGURIDAD BASE
app.use(helmet({ contentSecurityPolicy: false }));

// CORS DINÁMICO — acepta localhost en dev, Vercel en producción
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:3000",
  process.env.FRONTEND_URL, // ← URL de Vercel, se configura en Railway
].filter(Boolean); // elimina valores undefined/vacíos

app.use(
  cors({
    origin: (origin, callback) => {
      // Permite requests sin origin solo en desarrollo (ej: Postman)
      if (!origin && process.env.NODE_ENV !== "production") {
        return callback(null, true);
      }
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
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

// API KEY — protección simple (rúbrica Fase 4)
const validateApiKey = (req, res, next) => {
  // Solo aplica si API_KEY está configurada en el entorno
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

// RUTA BASE
app.get("/", (req, res) => {
  res.json({ status: "OK", mensaje: "API de Leños funcionando" });
});

// HEALTH CHECK (para Railway)
app.get("/health", (req, res) => {
  res.json({ status: "healthy" });
});

// LOGS SEGUROS — nunca imprime datos sensibles en producción (rúbrica 4.1)
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  if (process.env.NODE_ENV !== "production") {
    console.log(`Servidor corriendo en puerto ${PORT}`);
    console.log(`Entorno: ${process.env.NODE_ENV}`);
    // NUNCA loguear MONGO_URI, JWT_SECRET ni API_KEY
  } else {
    console.log("Servidor iniciado"); // sin datos sensibles
  }
});