'use client';
import React, { useEffect, useState } from 'react';


const CompaniesPage = () => {
    const [companies, setCompanies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCompanies = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/company');
                if (!response.ok) throw new Error('Error al obtener información de la empresa');
                const data = await response.json();
                console.log("Respuesta de la API:", data); // Muestra la respuesta de la API
                setCompanies(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchCompanies();
    }, []);

    if (loading) return <div>Cargando empresas...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <h1>Compañías</h1>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
                {companies.map((company) => (
                    <div
                        key={company.company_id}
                        style={{
                            border: '1px solid #ccc',
                            borderRadius: '8px',
                            padding: '1rem',
                            minWidth: '250px',
                            
                            boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
                        }}
                    >
                        <h2 style={{ margin: '0 0 0.5rem 0' }}>{company.company_name}</h2>
                        <p><strong>RUT:</strong> {company.company_rut}</p>
                        <p>
                            <strong>Dirección:</strong><br />
                            {company.address_street}, {company.address_city}, {company.address_state}, {company.address_zip}
                        </p>
                        <p>
                            <strong>Estado:</strong>{' '}
                            <span style={{ color: company.is_active ? 'green' : 'red' }}>
                                {company.is_active ? 'Activa' : 'Inactiva'}
                            </span>
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CompaniesPage;