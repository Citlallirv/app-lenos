import { useState, useContext } from "react";
import { ProductsContext } from "../context/ProductsContext";

function AdminProducts() {
  const { productos, cargarProductos } = useContext(ProductsContext);

  const [editId, setEditId] = useState(null);
  const [editNombre, setEditNombre] = useState("");
  const [editDescripcion, setEditDescripcion] = useState("");
  const [editPrecio, setEditPrecio] = useState("");

  const iniciarEdicion = (producto) => {
    setEditId(producto._id);
    setEditNombre(producto.nombre);
    setEditDescripcion(producto.descripcion);
    setEditPrecio(producto.precio);
  };

  const guardarEdicion = async () => {
    await fetch(`http://localhost:3001/api/products/${editId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nombre: editNombre,
        descripcion: editDescripcion,
        precio: editPrecio,
      }),
    });

    setEditId(null);
    cargarProductos(); // recargar productos desde la API
  };

  const eliminarProducto = async (id) => {
    await fetch(`http://localhost:3001/api/products/${id}`, {
      method: "DELETE",
    });

    cargarProductos();
  };

  return (
    <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Productos del catálogo
      </h2>

      <div className="space-y-4">
        {productos.map((producto) => (
          <div
            key={producto._id}
            className="flex justify-between items-center bg-gray-100 p-4 rounded"
          >
            <div className="flex-1">
              {editId === producto._id ? (
                <div className="space-y-2">
                  <input
                    type="text"
                    value={editNombre}
                    onChange={(e) => setEditNombre(e.target.value)}
                    className="w-full border p-1 rounded"
                  />

                  <input
                    type="text"
                    value={editDescripcion}
                    onChange={(e) => setEditDescripcion(e.target.value)}
                    className="w-full border p-1 rounded"
                  />

                  <input
                    type="number"
                    value={editPrecio}
                    onChange={(e) => setEditPrecio(e.target.value)}
                    className="w-full border p-1 rounded"
                  />
                </div>
              ) : (
                <div>
                  <p className="font-semibold">{producto.nombre}</p>
                  <p className="text-gray-600">${producto.precio}</p>
                  <p className="text-gray-500">{producto.descripcion}</p>
                </div>
              )}
            </div>

            <div className="flex gap-2">
              {editId === producto._id ? (
                <button
                  onClick={guardarEdicion}
                  className="bg-green-500 hover:bg-green-600 text-white px-4 py-1 rounded"
                >
                  Guardar
                </button>
              ) : (
                <button
                  onClick={() => iniciarEdicion(producto)}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-1 rounded"
                >
                  Editar
                </button>
              )}

              <button
                onClick={() => eliminarProducto(producto._id)}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded"
              >
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminProducts;