import { useContext } from "react";
import { ProductsContext } from "../context/ProductsContext";
import ProductCard from "../components/ProductCard";
import Navbar from "../components/Navbar";

function Products() {
  const { products } = useContext(ProductsContext);

  return (
    <>
      <Navbar />

      <section className="py-20 bg-yellow-100 min-h-screen">
        <h1 className="text-4xl text-center text-orange-600 mb-12 font-bold">
          Nuestros Leños
        </h1>

        <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto px-6">
          {products.map((product) => (
            <ProductCard
              key={product._id}
              nombre={product.nombre}
              descripcion={product.descripcion}
              precios={product.precios}
              imagen={product.imagen}
            />
          ))}
        </div>
      </section>
    </>
  );
}

export default Products;