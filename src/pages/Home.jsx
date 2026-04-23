import { useContext } from "react";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { ProductsContext } from "../context/ProductsContext";

function Home() {
  const { products } = useContext(ProductsContext);

  return (
    <>
      <Navbar />

      {/* HERO */}
      <section
        className="relative h-[90vh] flex items-center justify-center text-center text-white"
        style={{
          backgroundImage: "url('/hero-lenos.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/40"></div>

        <div className="relative z-10 px-6">
          <h1 className="bungee text-5xl md:text-7xl text-yellow-300">
            Leños Rellenos
          </h1>

          <p className="mt-6 text-xl max-w-xl mx-auto">
            Crujientes por fuera, suaves y llenos de sabor por dentro. Un antojo
            que conquista desde el primer bocado.
          </p>

          <Link
            to="/productos"
            className="mt-8 inline-block bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-xl text-lg shadow-lg"
          >
            Ver productos
          </Link>
        </div>
      </section>

      {/* FAVORITOS */}
      <section className="py-20 bg-yellow-100">
        <h2 className="bungee text-4xl text-center text-orange-600 mb-12">
          Favoritos de la Casa
        </h2>

        <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto px-6">
          {products.slice(0, 3).map((producto) => (
            <ProductCard
              key={producto._id}
              nombre={producto.nombre}
              descripcion={producto.descripcion}
              precios={producto.precios}
              imagen={producto.imagen}
            />
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            to="/productos"
            className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-xl text-lg shadow-lg"
          >
            Ver todos los leños
          </Link>
        </div>
      </section>
    </>
  );
}

export default Home;
