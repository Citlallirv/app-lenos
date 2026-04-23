import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";

function ProductCard({ nombre, descripcion, precios, imagen }) {
  const { addToCart } = useContext(CartContext);

  // tipo seleccionado
  const [tipo, setTipo] = useState("normal");

  // proteger si algo llega mal
  if (!precios) return null;

  const precio = precios[tipo];

  const agregar = () => {
    addToCart({
      nombre: `${nombre} (${tipo === "normal" ? "Normal" : "Con todo"})`,
      descripcion,
      precio,
      imagen,
      cantidad: 1,
    });

    //alert("Producto agregado al carrito 🛒");
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <img
        src={imagen}
        alt={nombre}
        className="w-full h-60 object-cover"
      />

      <div className="p-4">
        <h3 className="text-xl font-bold text-orange-600">{nombre}</h3>

        <p className="text-gray-600 mt-2">{descripcion}</p>

        {/* BOTONES DE TIPO */}
        <div className="flex gap-3 mt-4">
          <button
            onClick={() => setTipo("normal")}
            className={`flex-1 border rounded-lg py-2 font-semibold transition
              ${
                tipo === "normal"
                  ? "bg-orange-500 text-white border-orange-500"
                  : "bg-white text-orange-600 border-orange-300 hover:bg-orange-100"
              }`}
          >
            Normal ${precios.normal}
          </button>

          <button
            onClick={() => setTipo("conTodo")}
            className={`flex-1 border rounded-lg py-2 font-semibold transition
              ${
                tipo === "conTodo"
                  ? "bg-orange-500 text-white border-orange-500"
                  : "bg-white text-orange-600 border-orange-300 hover:bg-orange-100"
              }`}
          >
            Con todo ${precios.conTodo}
          </button>
        </div>

        {/* PRECIO ACTUAL */}
        <p className="text-lg font-bold mt-4 text-orange-600">
          ${precio}
        </p>

        {/* BOTON AGREGAR */}
        <button
          onClick={agregar}
          className="mt-4 w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-lg font-semibold"
        >
          Agregar al carrito
        </button>
      </div>
    </div>
  );
}

export default ProductCard;