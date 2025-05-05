"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { register } from "../../api/auth";

const Register = () => {
  const [name, setName] = useState("");
  const [rut , setRut] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [company, setCompany] = useState("2");
  const [role, setRole] = useState("1"); // Cambia a "user" por defecto
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await register(name, email, password); // Llama a la función de registro
      console.log("Usuario registrado:", response);

      // Redirige al usuario al login después del registro
      router.push("/login");
    } catch (err) {
      if (err.response && err.response.data && err.response.data.error) {
        setError(err.response.data.error); // Muestra el error retornado por la API
      } else {
        console.log("Respuesta de la API:", err.response ? err.response.data : err);
        setError("Error al registrar el usuario :(");
      }
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-lime-200 ">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-md w-96"
      >
        <h2 className="text-2xl text-black font-semibold mb-6">Registro</h2>
        <div className="mb-4 text-black"  >
          <input
            type="text"
            placeholder="Nombre"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 mb-4 border rounded"
            required
          />
          <input
            type="email"
            placeholder="Correo"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 mb-4 border rounded"
            required
          />
          <input
            type="text"
            placeholder="Rut"
            value={rut}
            onChange={(e) => setRut(e.target.value)}
            className="w-full p-2 mb-4 border rounded"
            required
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 mb-4 border rounded"
            required
          />
          <input
            type="text"
            placeholder="Compañia"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            className="w-full p-2 mb-4 border rounded"
            required
          />
          <input
            type="text"
            placeholder="Rol"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full p-2 mb-4 border rounded"
            required
          />
        </div>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-green-600"
        >
          Registrarse
        </button>
      </form>
    </div>
  );
};

export default Register;