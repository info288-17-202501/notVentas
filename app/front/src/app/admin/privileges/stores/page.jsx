// app/dashboard/users/page.jsx
'use client';
import { useEffect, useState } from "react";
import FormNewUser from "../../../../components/ui/FormNewUser";
import { getStores } from "../../../../api/store";

export const dynamic = "force-dynamic";

const tableStyle = {
    width: '100%',
    borderCollapse: 'collapse',
    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
    marginTop: '24px',
    borderRadius: '8px',
    overflow: 'hidden'
};

const thStyle = {
    color: '#fff',
    padding: '12px',
    textAlign: 'left',
    fontWeight: 'bold',
    borderBottom: '2px solid #1565c0'
};

const tdStyle = {
    padding: '10px 12px',
    borderBottom: '1px solid #e0e0e0',
    background: '#fff'
};

const trHoverStyle = {
    background: '#e3f2fd'
};

async function getUsers() {
    const res = await fetch("http://localhost:3000/api/user", { cache: "no-store" });
    if (!res.ok) return [];
    return res.json();
}

export default function UsersPage() {
    const [users, setUsers] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [userToEdit, setUserToEdit] = useState(null); 
    const [editingUser, setEditingUser] = useState(null);

    const loadUsers = async () => {
        const data = await getUsers();
        setUsers(data);
    };

    useEffect(() => {
        loadUsers();
    }, []);

    const handleCreateUser = async (userData) => {
        try {
            const res = await fetch("http://localhost:3000/api/user", {
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
            setEditingUser(null);
        } catch (error) {
            alert("Error: " + error.message);
        }
    };

    return (
        <div className="p-8 bg-gray-900 min-h-screen">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-4xl font-bold text-white">Lista de Usuarios</h1>
                <button
                    onClick={() => {
                        setEditingUser(null);
                        setOpenModal(true);
                    }}
                    className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
                >
                    <span>Agregar Vendedor</span>
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
                                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                                        onClick={() => {
                                            setUserToEdit(user);     
                                            setOpenModal(true);     
                                        }}
                                        >
                                        Editar
                                    </button>
                                    <button className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors">
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




// // app/dashboard/users/page.jsx
// export const dynamic = "force-dynamic"; // Opcional, si tu endpoint es dinámico

// async function getUsers() {
//     const res = await fetch("http://localhost:3000/api/user", { cache: "no-store" });
//     if (!res.ok) return [];
//     return res.json();
// }

// export default async function UsersPage() {
//     const users = await getUsers();

//     return (
//         <div className="p-8 bg-gray-900 min-h-screen">
//             <div className="flex justify-between items-center mb-8">
//                 <h1 className="text-4xl font-bold text-white">Lista de Usuarios</h1>
//                 <button 
//                     className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
//                 >
//                     <span>Agregar Vendedor</span>
//                 </button>
//             </div>
//             {users.length === 0 ? (
//                 <div className="bg-gray-800 p-6 rounded-lg shadow-xl text-center">
//                     <p className="text-gray-300 text-lg">No hay usuarios registrados.</p>
//                 </div>
//             ) : (
//                 <div className="grid gap-4">
//                     {users.map((user) => (
//                         <div 
//                             key={user.id}
//                             className="bg-gray-800 p-6 rounded-lg shadow-xl hover:bg-gray-700 transition-all duration-300 transform hover:scale-[1.02]"
//                         >
//                             <div className="flex items-center justify-between">
//                                 <div>
//                                     <h3 className="text-xl font-bold text-white">{user.name}</h3>
//                                     <p className="text-gray-400">{user.email}</p>
//                                 </div>
//                                 <div className="flex gap-2">
//                                     <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
//                                         Editar
//                                     </button>
//                                     <button className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors">
//                                         Eliminar
//                                     </button>
//                                 </div>
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//             )}
//         </div>
//     );
// }
