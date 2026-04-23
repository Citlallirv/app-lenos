import { Link, Outlet, useNavigate } from "react-router-dom";

function AdminLayout() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("admin");
    navigate("/");
  };

  return (
    <div className="flex min-h-screen">
      {/* SIDEBAR */}

      <div className="w-64 bg-orange-600 text-white p-6">
        <h1 className="text-2xl font-bold mb-10">Panel Admin</h1>

        <nav className="flex flex-col gap-4">
          <Link to="/admin">Dashboard</Link>

          <Link to="/admin/productos">Productos</Link>

          <Link to="/admin/agregar">Agregar producto</Link>

          <Link to="/admin/pedidos">Pedidos</Link>

          <button onClick={logout} className="text-left mt-6 text-red-200">
            Cerrar sesión
          </button>
        </nav>
      </div>

      {/* CONTENIDO */}

      <div className="flex-1 p-10 bg-yellow-100">
        <Outlet />
      </div>
    </div>
  );
}

export default AdminLayout;
