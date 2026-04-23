import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

/* Providers */
import { OrdersProvider } from "./context/OrdersProvider";
import { CartProvider } from "./context/CartProvider";

/* Páginas */
import Home from "./pages/Home";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import Login from "./pages/Login";

/* Admin */
import AdminLayout from "./components/AdminLayout";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminDashboard from "./pages/AdminDashboard";
import AdminProducts from "./pages/AdminProducts";
import AdminAddProducts from "./pages/AdminAddProducts";
import AdminOrders from "./pages/AdminOrders";

/* Nuevo componente */
import Comentario from "./components/Comentario";

function App() {
  return (
    <>
      <Toaster />
      <OrdersProvider>
        <CartProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/productos" element={<Products />} />
              <Route path="/carrito" element={<Cart />} />
              <Route path="/login" element={<Login />} />

              {/* Nueva ruta para comentarios */}
              <Route path="/comentarios" element={<Comentario />} />

              <Route
                path="/admin"
                element={
                  <ProtectedRoute>
                    <AdminLayout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<AdminDashboard />} />
                <Route path="productos" element={<AdminProducts />} />
                <Route path="agregar" element={<AdminAddProducts />} />
                <Route path="pedidos" element={<AdminOrders />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </CartProvider>
      </OrdersProvider>
    </>
  );
}

export default App;
