import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

import ProductsProvider from "./context/ProductsProvider";
import CartProvider from "./context/CartProvider";
import OrdersProvider from "./context/OrdersProvider";

ReactDOM.createRoot(document.getElementById("root")).render(
  <ProductsProvider>
    <CartProvider>
      <OrdersProvider>
        <App />
      </OrdersProvider>
    </CartProvider>
  </ProductsProvider>,
);
