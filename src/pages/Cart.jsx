import { useContext, useState } from "react";
import Navbar from "../components/Navbar";
import { CartContext } from "../context/CartContext";
import { OrdersContext } from "../context/OrdersContext";

function Cart() {
  const { cart, increaseQty, decreaseQty, clearCart } = useContext(CartContext);
  const { addOrder } = useContext(OrdersContext);

  const [nombre, setNombre] = useState("");
  const [direccion, setDireccion] = useState("");
  const [telefono, setTelefono] = useState("");
  const [fecha, setFecha] = useState("");

  const total = cart.reduce(
    (acc, item) =>
      acc + (Number(item.precio) || 0) * (Number(item.cantidad) || 0),
    0
  );

  const enviarPedido = async () => {
    if (cart.length === 0) {
      alert("El carrito está vacío");
      return;
    }

    if (!nombre || !direccion || !telefono || !fecha) {
      alert("Por favor completa todos los datos");
      return;
    }

    const pedido = {
      nombre,
      direccion,
      telefono,
      fechaEntrega: fecha,
      items: cart,
      total,
      status: "pendiente",
    };

    try {
      const res = await fetch("http://localhost:3001/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(pedido),
      });

      const data = await res.json();
      console.log("Pedido guardado:", data);
    } catch (error) {
      console.error("Error guardando pedido:", error);
    }

    // mensaje WhatsApp
    let mensaje = "Hola, quiero hacer el siguiente pedido:%0A%0A";

    cart.forEach((item) => {
      mensaje += `• ${item.nombre} x${item.cantidad || 1} - $${
        (item.precio || 0) * (item.cantidad || 1)
      }%0A`;
    });

    mensaje += `%0ATotal: $${total}%0A`;
    mensaje += `Nombre: ${nombre}%0A`;
    mensaje += `Dirección: ${direccion}%0A`;
    mensaje += `Teléfono: ${telefono}%0A`;
    mensaje += `Fecha de entrega: ${fecha}`;

    const telefonoNegocio = "5214181057302";
    const url = `https://wa.me/${telefonoNegocio}?text=${mensaje}`;

    window.open(url, "_blank");

    addOrder({
      ...pedido,
      fechaPedido: new Date().toLocaleString(),
    });

    clearCart();
    setNombre("");
    setDireccion("");
    setTelefono("");
    setFecha("");
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-yellow-100 p-10">
        <h1 className="text-4xl text-center text-orange-600 mb-10 font-bold">
          Tu carrito
        </h1>

        {cart.length === 0 ? (
          <p className="text-center text-xl text-gray-600">
            No hay productos en el carrito
          </p>
        ) : (
          <div className="max-w-4xl mx-auto space-y-6">
            {cart.map((item) => (
              <div
                key={item.nombre}
                className="flex items-center bg-white rounded-xl shadow p-4"
              >
                <img
                  src={item.imagen}
                  alt={item.nombre}
                  className="w-24 h-24 object-cover rounded-lg"
                />

                <div className="ml-6 flex-1">
                  <h2 className="text-xl font-semibold">{item.nombre}</h2>

                  <p className="text-gray-600">${item.precio || 0}</p>

                  <div className="flex items-center gap-4 mt-3">
                    <button
                      onClick={() => decreaseQty(item.nombre)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                    >
                      -
                    </button>

                    <span className="font-bold text-lg">
                      {item.cantidad || 1}
                    </span>

                    <button
                      onClick={() => increaseQty(item.nombre)}
                      className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {/* formulario */}

            <div className="bg-white p-6 rounded-xl shadow space-y-4">
              <h2 className="text-2xl font-bold text-orange-600">Tus datos</h2>

              <input
                type="text"
                placeholder="Nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                className="w-full p-2 border rounded"
              />

              <input
                type="text"
                placeholder="Dirección"
                value={direccion}
                onChange={(e) => setDireccion(e.target.value)}
                className="w-full p-2 border rounded"
              />

              <input
                type="tel"
                placeholder="Teléfono"
                value={telefono}
                onChange={(e) => setTelefono(e.target.value)}
                className="w-full p-2 border rounded"
              />

              <input
                type="date"
                value={fecha}
                onChange={(e) => setFecha(e.target.value)}
                className="w-full p-2 border rounded"
              />
            </div>

            {/* total */}

            <div className="text-right text-2xl font-bold text-orange-600">
              Total: ${isNaN(total) ? 0 : total}
            </div>

            {/* botones */}

            <div className="text-right space-x-4">
              <button
                onClick={clearCart}
                className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded"
              >
                Vaciar carrito
              </button>

              <button
                onClick={enviarPedido}
                className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-xl"
              >
                Enviar pedido por WhatsApp
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Cart;