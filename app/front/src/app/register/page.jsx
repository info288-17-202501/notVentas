"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { register } from "../../api/auth";

const Register = () => {
  const [name, setName] = useState("");
  const [rut , setRut] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [company_id, setCompany] = useState(10);
  const [role_id, setRole] = useState(14); // Cambia a "user" por defecto
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    
    try {
      const data = { name, password,email, rut, company_id, role_id }
      console.log("Respuesta de la API:", data); // Muestra la respuesta de la AP
      const response = await register(data); // Llama a la función de registro




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
          />{
          }
          <input
            type="number"
            placeholder="Compañia"
            value={company_id}
            onChange={(e) => setCompany(e.target.value)}
            className="w-full p-2 mb-4 border rounded"
            required
          />
          <input
            type="number"
            placeholder="Rol"
            value={role_id}
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