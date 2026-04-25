import { useState } from "react";
import toast from "react-hot-toast";
import Navbar from "./Navbar";

// Lee la URL del backend desde la variable de entorno
// En desarrollo: http://localhost:3001  (desde .env.development)
// En producción: https://tu-backend.railway.app  (desde Vercel Dashboard)
const API_URL = import.meta.env.VITE_API_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

function Comentario() {
  const [puntuacion, setPuntuacion] = useState(5);
  const [texto, setTexto] = useState("");
  const [respuesta, setRespuesta] = useState(null);

  const enviarComentario = async (e) => {
    e.preventDefault();

    // Validación: texto no vacío
    if (!texto.trim()) {
      toast.error("El comentario no puede estar vacío");
      return;
    }

    // Validación: texto no excede 200 caracteres (rúbrica 1.3)
    if (texto.length > 200) {
      toast.error("El comentario no puede exceder 200 caracteres");
      return;
    }

    // Validación: puntuación debe ser entero entre 1 y 5 (rúbrica 1.3)
    const puntuacionInt = parseInt(puntuacion, 10);
    if (!Number.isInteger(puntuacionInt) || puntuacionInt < 1 || puntuacionInt > 5) {
      toast.error("La puntuación debe ser un número entero entre 1 y 5");
      return;
    }

    try {
      const res = await fetch(`${API_URL}/api/v1/comentarios`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": API_KEY,   // header requerido por el backend (rúbrica Fase 4)
        },
        body: JSON.stringify({ puntuacion: puntuacionInt, texto: texto.trim() }),
      });

      if (!res.ok) {
        const err = await res.json();
        toast.error(err.error || "Error del servidor");
        return;
      }

      const data = await res.json();
      setRespuesta(data);
      setTexto("");
      setPuntuacion(5);
      toast.success("Comentario enviado correctamente");
    } catch (error) {
      toast.error("Error al conectar con el servidor");
    }
  };

  return (
    <>
      <Navbar />

      <div className="max-w-lg mx-auto mt-10 bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-bold text-yellow-600 mb-4 text-center">
          Deja tu comentario
        </h2>

        <form onSubmit={enviarComentario} className="space-y-4">
          <label className="block text-gray-700 font-semibold">
            Puntuación (1 a 5):
          </label>
          <input
            type="number"
            min="1"
            max="5"
            step="1"
            value={puntuacion}
            onChange={(e) => setPuntuacion(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-2 mb-4"
          />

          <div>
            <textarea
              value={texto}
              onChange={(e) => setTexto(e.target.value)}
              placeholder="Escribe tu comentario..."
              maxLength={200}
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              rows="4"
            />
            {/* Contador de caracteres */}
            <p className="text-sm text-gray-400 text-right">{texto.length}/200</p>
          </div>

          <button
            type="submit"
            className="w-full bg-yellow-500 text-black font-semibold py-2 rounded-lg hover:bg-yellow-600 transition-colors"
          >
            Enviar
          </button>
        </form>

        {respuesta && (
          <div className="mt-6 bg-gray-100 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              Respuesta del servidor:
            </h3>
            <pre>{JSON.stringify(respuesta, null, 2)}</pre>
          </div>
        )}
      </div>
    </>
  );
}

export default Comentario;
