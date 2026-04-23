import { useState, useEffect } from "react";
import { OrdersContext } from "./OrdersContext";

export const OrdersProvider = ({ children }) => {
  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem("orders");
    return saved ? JSON.parse(saved) : [];
  });

  // Guardar pedidos en localStorage cada vez que cambien
  useEffect(() => {
    localStorage.setItem("orders", JSON.stringify(orders));
  }, [orders]);

  const addOrder = (order) => {
    const newOrder = { id: Date.now(), status: "pendiente", ...order };
    setOrders([...orders, newOrder]);
  };

  const updateOrderStatus = (id, status) => {
    setOrders(
      orders.map((order) => (order.id === id ? { ...order, status } : order)),
    );
  };

  return (
    <OrdersContext.Provider value={{ orders, addOrder, updateOrderStatus }}>
      {children}
    </OrdersContext.Provider>
  );
};
export default OrdersProvider;
