import React, { useEffect, useState } from "react";

interface Store {
    id: string;
    name: string;
    address?: string;
    // Agrega otros campos según la respuesta de la API
}

const COMPANY_ID = "cmp-mbvtxwv9-uxvh";

const Stores: React.FC = () => {
    const [stores, setStores] = useState<Store[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchStores = async () => {
            try {
                setLoading(true);
                const response = await fetch("http://localhost:4000/api/company/stores", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ company_id: COMPANY_ID }),
                });

                if (!response.ok) {
                    throw new Error("Error al obtener las tiendas");
                }

                const data = await response.json();
                setStores(data.stores || []);
            } catch (err: any) {
                setError(err.message || "Error desconocido");
            } finally {
                setLoading(false);
            }
        };

        fetchStores();
    }, []);

    if (loading) return <div>Cargando tiendas...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <h2>Lista de Tiendas</h2>
            <ul>
                {stores.map((store) => (
                    <li key={store.id}>
                        <strong>{store.name}</strong>
                        {store.address && <span> - {store.address}</span>}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Stores;