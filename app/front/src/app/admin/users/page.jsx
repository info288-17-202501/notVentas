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
        <div>
            <h1>Lista de Usuarios</h1>
            {users.length === 0 ? (
                <p>No hay usuarios registrados.</p>
            ) : (
                <ul>
                    {users.map((user) => (
                        <li key={user.id}>
                            <strong>{user.name}</strong> ({user.email})
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
