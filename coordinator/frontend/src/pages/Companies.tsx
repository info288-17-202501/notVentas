import React, { useEffect, useState } from 'react';
import ListCompanies from '../components/ListCompanies.tsx';
import { Company } from '../types/Company.ts';

const Companies: React.FC = () => {
    const [allCompanies, setCompanies] = useState<Company[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchCompanies = async () => {
            try {
                const response = await fetch('http://localhost:4000/api/company');
                if (!response.ok) {
                    throw new Error('Error al obtener las compañías');
                }
                const data = await response.json();
                setCompanies(data);
            } catch (err: any) {
                setError(err.message || 'Error desconocido');
            } finally {
                setLoading(false);
            }
        };

        fetchCompanies();
    }, []);

    if (loading) return <div>Cargando compañías...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <h1>Lista de Compañías</h1>
            <ListCompanies companies={allCompanies} />
        </div>
    );
};

export default Companies;