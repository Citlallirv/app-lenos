import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function Login() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    // credenciales simples (temporal)
    if (username === "admin" && password === "1234") {
      localStorage.setItem("admin", "true");

      navigate("/admin");
    } else {
      alert("Credenciales incorrectas");
    }
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen flex items-center justify-center bg-yellow-100">
        <form
          onSubmit={handleLogin}
          className="bg-white p-10 rounded-xl shadow-lg w-96"
        >
          <h1 className="text-3xl text-center text-orange-600 mb-6 font-bold">
            Panel Admin
          </h1>

          {/* usuario */}

          <input
            type="text"
            placeholder="Usuario"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-3 border rounded-lg mb-4"
          />

          {/* contraseña */}

          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border rounded-lg mb-6"
          />

          <button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg font-semibold"
          >
            Iniciar sesión
          </button>
        </form>
      </div>
    </>
  );
}

export default Login;
