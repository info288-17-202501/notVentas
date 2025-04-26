"use client";
import { useState } from "react";
import { useRouter } from "next/navigation"; // Importa useRouter de Next.js
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [error, setError] = useState("");
  const router = useRouter(); // Usa useRouter en lugar de useNavigate

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post("http://localhost:5173/api/auth/login", {
        email,
        contrasena,
      });

      const { token } = response.data;
      localStorage.setItem("token", token);
      router.push("/catalog"); // Redirige usando router.push
    } catch (err) {
      setError("Credenciales incorrectas o error del servidor");
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-lime-200">
      <div>
        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-2xl shadow-md w-96"
        >
          <h2 className="text-2xl font-semibold text-blue-500 mb-6">Iniciar Sesión</h2>
          
          <input
            type="email"
            placeholder="Correo"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 mb-4 border rounded text-gray-700"
            required
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={contrasena}
            onChange={(e) => setContrasena(e.target.value)}
            className="w-full text-g p-2 mb-4 border rounded text-gray-700"
            required
          />
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          <p className="text-center text-gray-600 text-sm mb-4">
            ¿No tienes cuenta? 
            <a
              href="/account"
              className="text-blue-500 hover:underline m-4"
            >
              Sé parte del equipo
            </a>
          </p>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            Iniciar sesión
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;