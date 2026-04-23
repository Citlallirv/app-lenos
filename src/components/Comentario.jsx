import { useState } from "react";
import toast from "react-hot-toast";
import Navbar from "./Navbar"; 

function Comentario() {
  const [comentario, setComentario] = useState("");
  const [respuesta, setRespuesta] = useState(null);

  const enviarComentario = async (e) => {
    e.preventDefault();

    if (!comentario.trim()) {
      toast.error("El comentario no puede estar vacío");
      return;
    }

    try {
      const res = await fetch("http://localhost:3001/comentarios", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ comentario })
      });

      const data = await res.json();
      setRespuesta(data.comentario);
      setComentario("");
      toast.success("Comentario enviado correctamente");
    } catch (error) {
      toast.error("Error al enviar el comentario");
    }
  };

  return (
    <>
      {}
      <Navbar />

      {/* Contenido principal */}
      <div className="max-w-lg mx-auto mt-10 bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-bold text-yellow-600 mb-4 text-center">
          Deja tu comentario
        </h2>

        <form onSubmit={enviarComentario} className="space-y-4">
          <textarea
            value={comentario}
            onChange={(e) => setComentario(e.target.value)}
            placeholder="Escribe tu comentario..."
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            rows="4"
          />
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
            <p className="text-gray-800" dangerouslySetInnerHTML={{ __html: respuesta }}></p>
            
          </div>
        )}
      </div>
    </>
  );
}

export default Comentario;
