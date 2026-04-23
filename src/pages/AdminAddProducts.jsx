import { useState, useContext } from "react";
import { ProductsContext } from "../context/ProductsContext";
import Navbar from "../components/Navbar";
function AdminAddProducts() {
  const { agregarProducto } = useContext(ProductsContext);

  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [precio, setPrecio] = useState("");
  const [imagen, setImagen] = useState("");
  const [categoria, setCategoria] = useState("");
  const [stock, setStock] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const nuevoProducto = {
      nombre,
      descripcion,
      precio: Number(precio),
      imagen,
      categoria,
      stock: Number(stock),
    };

    await agregarProducto(nuevoProducto);
    // limpiar formulario
    setNombre("");
    setDescripcion("");
    setPrecio("");
    setImagen("");
    setCategoria("");
    setStock("");
  };
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-yellow-100 p-10">
        <h1 className="text-4xl text-center text-orange-600 mb-10 font-bold">
          Agregar Producto
        </h1>
        <div className="max-w-xl mx-auto bg-white p-8 rounded-xl shadow">
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Nombre del producto"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              className="w-full border p-2 rounded"
              required
            />

            <input
              type="text"
              placeholder="Descripción"
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              className="w-full border p-2 rounded"
              required
            />

            <input
              type="number"
              placeholder="Precio"
              value={precio}
              onChange={(e) => setPrecio(e.target.value)}
              className="w-full border p-2 rounded"
              required
            />

            <input
              type="text"
              placeholder="Ruta de la imagen (ej: /leno-pastor.png)"
              value={imagen}
              onChange={(e) => setImagen(e.target.value)}
              className="w-full border p-2 rounded"
              required
            />

            <input
              type="text"
              placeholder="Categoría (ej: dulces, salados)"
              value={categoria}
              onChange={(e) => setCategoria(e.target.value)}
              className="w-full border p-2 rounded"
            />

            <input
              type="number"
              placeholder="Stock disponible"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              className="w-full border p-2 rounded"
            />

            <button
              type="submit"
              className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded"
            >
              Agregar producto
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
export default AdminAddProducts;
