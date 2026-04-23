import { useContext, useState } from "react";
import { OrdersContext } from "../context/OrdersContext";

function AdminOrders() {
  const { orders, updateOrderStatus } = useContext(OrdersContext);
  const estados = ["pendiente", "confirmado", "en entrega", "entregado"];

  const [filter, setFilter] = useState("todos");

  // ordenar pedidos (más nuevos primero)
  const sortedOrders = [...orders].sort((a, b) => b.id - a.id);

  const filteredOrders =
    filter === "todos"
      ? sortedOrders
      : sortedOrders.filter((order) => order.status === filter);

  // contador de pedidos
  const countByStatus = (status) =>
    orders.filter((order) => order.status === status).length;

  // colores por estado
  const getStatusColor = (status) => {
    switch (status) {
      case "pendiente":
        return "bg-yellow-200 text-yellow-800";
      case "confirmado":
        return "bg-blue-200 text-blue-800";
      case "en entrega":
        return "bg-orange-200 text-orange-800";
      case "entregado":
        return "bg-green-200 text-green-800";
      default:
        return "bg-gray-200";
    }
  };

  return (
    <div className="min-h-screen bg-yellow-50 p-10">
      <h1 className="text-4xl font-bold text-center text-orange-600 mb-10">
        Pedidos
      </h1>

      {/* DASHBOARD */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10 max-w-4xl mx-auto">
        {estados.map((estado) => (
          <div
            key={estado}
            className={`p-4 rounded-lg text-center font-bold ${getStatusColor(
              estado,
            )}`}
          >
            {estado}
            <div className="text-2xl">{countByStatus(estado)}</div>
          </div>
        ))}
      </div>

      {/* FILTROS */}
      <div className="flex justify-center gap-3 mb-8 flex-wrap">
        <button
          onClick={() => setFilter("todos")}
          className="bg-gray-200 px-4 py-2 rounded"
        >
          Todos
        </button>

        {estados.map((estado) => (
          <button
            key={estado}
            onClick={() => setFilter(estado)}
            className="bg-orange-200 px-4 py-2 rounded capitalize"
          >
            {estado}
          </button>
        ))}
      </div>

      {filteredOrders.length === 0 ? (
        <p className="text-center text-xl text-gray-600">
          No hay pedidos con ese estado
        </p>
      ) : (
        <div className="space-y-6 max-w-4xl mx-auto">
          {filteredOrders.map((order) => (
            <div
              key={order.id}
              className="bg-white rounded-xl shadow p-6 flex flex-col gap-4"
            >
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Pedido #{order.id}</h2>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(
                    order.status,
                  )}`}
                >
                  {order.status}
                </span>
              </div>

              <p>
                <strong>Nombre:</strong> {order.nombre}
              </p>
              <p>
                <strong>Dirección:</strong> {order.direccion}
              </p>
              <p>
                <strong>Teléfono:</strong> {order.telefono}
              </p>
              <p>
                <strong>Fecha de entrega:</strong> {order.fecha}
              </p>
              <p>
                <strong>Total:</strong> ${order.total}
              </p>

              <div>
                <strong>Productos:</strong>
                <ul className="list-disc list-inside">
                  {order.items.map((item) => (
                    <li key={item.nombre}>
                      {item.nombre} x{item.cantidad || 1} - $
                      {item.precio * (item.cantidad || 1)}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex items-center gap-4 mt-2">
                <strong>Cambiar estado:</strong>
                <select
                  value={order.status}
                  onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                  className="border rounded p-1"
                >
                  {estados.map((estado) => (
                    <option key={estado} value={estado}>
                      {estado}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AdminOrders;
