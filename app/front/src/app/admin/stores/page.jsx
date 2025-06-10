// app/dashboard/users/page.jsx
export const dynamic = "force-dynamic"; // Opcional, si tu endpoint es dinámico

async function getUsers() {
    const res = await fetch("http://localhost:3000/api/user", { cache: "no-store" });
    if (!res.ok) return [];
    return res.json();
}

export default async function UsersPage() {
    const users = await getUsers();

    return (
        <div className="p-8 bg-gray-900 min-h-screen">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-4xl font-bold text-white">Lista de Usuarios</h1>
                <button 
                    className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
                >
                    <span>Agregar Vendedor</span>
                </button>
            </div>
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
                                </div>
                                <div className="flex gap-2">
                                    <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
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
