'use client';
import { useEffect, useState } from "react";
import FormNewUser from "../../../../components/ui/FormNewUser";
import { getStores } from "../../../../api/store";

export const dynamic = "force-dynamic";

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [stores, setStores] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [userToEdit, setUserToEdit] = useState(null); 
  const [companyId, setCompanyId] = useState(null);

  const loadStores = async () => {
    const result = await getStores();
    setStores(result);
  };

  const loadUsers = async () => {
    const res = await fetch("http://localhost:3000/api/user", { cache: "no-store" });
    if (!res.ok) return;
    const data = await res.json();
    setUsers(data);
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      if (parsedUser.company_id) {
        setCompanyId(parsedUser.company_id);
      }
    }

    loadUsers();
    loadStores();
  }, []);

  const handleCreateUser = async (userData) => {
    try {
      const res = await fetch("http://localhost:3000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });
      if (!res.ok) throw new Error("Error al crear el usuario");
      await loadUsers();
    } catch (error) {
      alert("Error: " + error.message);
    }
  };
  const handleEditUser = async (userData) => {
    try {
      const res = await fetch("http://localhost:3000/api/user", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });
      if (!res.ok) throw new Error("Error al editar el usuario");
      await loadUsers();
    } catch (error) {
      alert("Error: " + error.message);
    }
  };
  // const handleEditUser = async (userData) => {
  //   try {
  //     const res = await fetch("http://localhost:3000/api/user", {
  //       method: "PUT",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify(userData),
  //     });
  //     if (!res.ok) throw new Error("Error al editar el usuario");
  //     await loadUsers();
  //   } catch (error) {
  //     alert("Error: " + error.message);
  //   }
  // };

  return (
    <div className="p-8 bg-gray-900 min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-white">Lista de Usuarios</h1>
        <button
          onClick={() => {
            setUserToEdit(null);
            setOpenModal(true);
          }}
          className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700"
        >
          Agregar Vendedor
        </button>
      </div>

      <FormNewUser
        open={openModal}
        onClose={() => {
          setOpenModal(false);
          setUserToEdit(null);
        }}
        onCreate={handleCreateUser}
        onEdit={handleEditUser}
        userToEdit={userToEdit}
        stores={stores}
        companyId={companyId}
      />

      {users.length === 0 ? (
        <div className="bg-gray-800 p-6 rounded-lg shadow-xl text-center">
          <p className="text-gray-300 text-lg">No hay usuarios registrados.</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {users.map((user) => (
            <div
              key={user.id}
              className="bg-gray-800 p-6 rounded-lg shadow-xl hover:bg-gray-700 transition-all duration-300 transform hover:scale-[1.02]"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold text-white">{user.name}</h3>
                  <p className="text-gray-400">{user.email}</p>
                  <p className="text-gray-400 text-sm">Rol: {user.role}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setUserToEdit(user);
                      setOpenModal(true);
                    }}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    Editar
                  </button>
                  <button
                    className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                    onClick={() => {
                      alert("Funcionalidad eliminar aún no implementada");
                    }}
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

