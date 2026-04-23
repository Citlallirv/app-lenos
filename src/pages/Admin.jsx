import Navbar from "../components/Navbar";
import AdminProducts from "./AdminProducts";

function Admin() {
  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-yellow-100 p-10">
        <h1 className="text-4xl text-center text-orange-600 mb-10 font-bold">
          Panel de Administración
        </h1>

        <AdminProducts />
      </div>
    </>
  );
}

export default Admin;
