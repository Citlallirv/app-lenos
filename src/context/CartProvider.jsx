import { useState, useEffect } from "react";
import { CartContext } from "./CartContext";
import toast from "react-hot-toast";

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (producto) => {
    const existing = cart.find((item) => item.nombre === producto.nombre);
    if (existing) {
      setCart(
        cart.map((item) =>
          item.nombre === producto.nombre
            ? { ...item, cantidad: (item.cantidad || 1) + 1 }
            : item,
        ),
      );
    } else {
      setCart([...cart, { ...producto, cantidad: 1 }]);
    }

    toast.success("Producto agregado al carrito 🛒");
  };

  const increaseQty = (nombre) => {
    setCart(
      cart.map((item) =>
        item.nombre === nombre
          ? { ...item, cantidad: (item.cantidad || 1) + 1 }
          : item,
      ),
    );
  };

  const decreaseQty = (nombre) => {
    setCart(
      cart.map((item) =>
        item.nombre === nombre
          ? { ...item, cantidad: Math.max((item.cantidad || 1) - 1, 1) }
          : item,
      ),
    );
  };

  const clearCart = () => setCart([]);

  return (
    <CartContext.Provider
      value={{ cart, addToCart, increaseQty, decreaseQty, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};
export default CartProvider;
