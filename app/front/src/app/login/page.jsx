"use client";
import { useState } from "react";
import { useRouter } from "next/navigation"; // Importa useRouter de Next.js
import {login} from '../../api/auth'

const Login = () => {
  const [email, setEmail] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [error, setError] = useState("");
  const router = useRouter(); // Usa useRouter en lugar de useNavigate

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await login(email, contrasena); // Llama a la función de login
      const token = response.token; // Asegúrate de que la respuesta contenga el token

      //Guarda el token y user en el localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(response.user)); 
      localStorage.setItem("role", response.user.role);
      if (response.user.role === "admin" || response.user.role === "sadmin") {
        router.push("/dashboard");
      }
      else if (response.user.role === "seller"){
        router.push("/dashboard");
      }
    }
    catch (err) {
    if (err.response && err.response.data && err.response.data.error) {
      setError(err.response.data.error); // Muestra el error retornado por la API
    } else {
      setError("Credenciales incorrectas o error del servidor");
    }
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
              href="/register"
              className="text-blue-500 hover:underline m-4"
            >
              Sé parte del equipo
            </a>
            <a
              href="/registerCompany"
              className="text-blue-500 hover:underline m-4"
            >
              Registra tu empresa aquí
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