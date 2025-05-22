'use client';
import React, { useEffect, useState } from 'react';

const StoresPage = () => {
    const [stores, setStores] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchStores = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/store');
                if (!response.ok) throw new Error('Error al cargar las tiendas');
                const data = await response.json();
                setStores(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchStores();
    }, []);

    if (loading) return <div style={{ margin: 32, fontSize: 18 }}>Cargando tiendas...</div>;
    if (error) return <div style={{ margin: 32, color: 'red', fontSize: 18 }}>Error: {error}</div>;

    return (
        <div>
            <h1 style={{ color: '#1976d2', marginBottom: 24 }}>Tiendas</h1>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
                {stores.length === 0 ? (
                    <p style={{ fontSize: 16 }}>No hay tiendas registradas.</p>
                ) : (
                    stores.map((store) => (
                        <div
                            key={store.store_id}
                            style={{
                                border: '1px solid #ccc',
                                borderRadius: '8px',
                                padding: '1rem',
                                minWidth: '250px',
                                boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                            }}
                        >
                            <h2 style={{ margin: '0 0 0.5rem 0', color: '#1976d2' }}>{store.store_name}</h2>
                            <p><strong>ID:</strong> {store.store_id}</p>
                            <p>
                                <strong>Ubicación:</strong><br />
                                Lat: {store.coord_latitude}, Lng: {store.coord_longitude}
                            </p>
                            <p>
                                <strong>Dirección:</strong><br />
                                {store.address_street}, {store.address_city}, {store.address_state}, {store.address_zip}
                            </p>
                            <p>
                                <strong>Estado:</strong>{' '}
                                <span style={{ color: store.is_active ? 'green' : 'red' }}>
                                    {store.is_active ? 'Activa' : 'Inactiva'}
                                </span>
                            </p>
                            <p><strong>ID Compañía:</strong> {store.company_id}</p>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default StoresPage;
