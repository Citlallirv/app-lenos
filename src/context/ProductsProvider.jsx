import { useState, useEffect } from "react";
import { ProductsContext } from "./ProductsContext";

export default function ProductsProvider({ children }) {
  const [products, setProducts] = useState([]);
  const API = "http://localhost:3001/api/products";

  const getProducts = async () => {
    try {
      const res = await fetch(API);
      const data = await res.json();
      setProducts(data);
    } catch (error) {
      console.error("Error obteniendo productos:", error);
    }
  };

  const addProduct = async (product) => {
    try {
      const res = await fetch(API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      });

      const data = await res.json();
      setProducts([...products, data]);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteProduct = async (id) => {
    try {
      await fetch(`${API}/${id}`, {
        method: "DELETE",
      });

      setProducts(products.filter((p) => p._id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <ProductsContext.Provider
      value={{
        products,
        addProduct,
        deleteProduct,
        getProducts,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
}
