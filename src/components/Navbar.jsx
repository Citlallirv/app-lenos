import { useState, useContext } from "react";
import { Home, BookOpen, ShoppingCart, Menu, X, MessageSquare } from "lucide-react";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { cart } = useContext(CartContext);

  return (
    <nav className="bg-yellow-400 text-black p-4 shadow-md relative z-50">
      <div className="flex justify-between items-center">
        {/* Logo */}
        <h1 className="text-3xl font-black drop-shadow-md">Leños Rellenos</h1>

        {/* Botón menú móvil */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-1 focus:outline-none"
        >
          {isOpen ? <X size={30} /> : <Menu size={30} />}
        </button>

        {/* Menú escritorio */}
        <div className="hidden md:flex space-x-6">
          <Link
            to="/"
            className="flex items-center gap-1 hover:text-white transition-colors"
          >
            <Home size={20} />
            <span>Inicio</span>
          </Link>

          <Link
            to="/productos"
            className="flex items-center gap-1 hover:text-white transition-colors"
          >
            <BookOpen size={20} />
            <span>Productos</span>
          </Link>

          <Link
            to="/carrito"
            className="flex items-center gap-1 hover:text-white transition-colors relative"
          >
            <ShoppingCart size={20} />
            <span>Carrito</span>
            {cart.length > 0 && (
              <span className="ml-1 bg-orange-500 text-white text-xs px-2 py-1 rounded-full">
                {cart.length}
              </span>
            )}
          </Link>

          {/* Nuevo enlace Comentarios */}
          <Link
            to="/comentarios"
            className="flex items-center gap-1 hover:text-white transition-colors"
          >
            <MessageSquare size={20} />
            <span>Comentarios</span>
          </Link>
        </div>
      </div>

      {/* Menú móvil */}
      <div
        className={`${isOpen ? "block" : "hidden"} md:hidden pt-4 pb-2 space-y-4`}
      >
        <Link
          to="/"
          className="flex items-center gap-2 hover:text-white transition-colors py-2 border-b border-yellow-500"
        >
          <Home size={20} />
          <span>Inicio</span>
        </Link>

        <Link
          to="/productos"
          className="flex items-center gap-2 hover:text-white transition-colors py-2 border-b border-yellow-500"
        >
          <BookOpen size={20} />
          <span>Productos</span>
        </Link>

        <Link
          to="/carrito"
          className="flex items-center gap-2 hover:text-white transition-colors py-2 border-b border-yellow-500"
        >
          <ShoppingCart size={20} />
          <span>Carrito ({cart.length})</span>
        </Link>

        {/* Nuevo enlace Comentarios en móvil */}
        <Link
          to="/comentarios"
          className="flex items-center gap-2 hover:text-white transition-colors py-2 border-b border-yellow-500"
        >
          <MessageSquare size={20} />
          <span>Comentarios</span>
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
