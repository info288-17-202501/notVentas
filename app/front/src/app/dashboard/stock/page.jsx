'use client';
import React, { useEffect, useState } from 'react';

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

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [hoveredRow, setHoveredRow] = useState(null);

    useEffect(() => {
        fetch('http://localhost:3000/api/product/')
            .then((res) => res.json())
            .then((data) => {
                if (Array.isArray(data)) {
                    setProducts(data);
                } else if (Array.isArray(data.products)) {
                    setProducts(data.products);
                } else {
                    setProducts([]);
                }
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    if (loading) return <div>Cargando productos...</div>;

    return (
        <div>
            <h1>Lista de Productos</h1>
            <table style={tableStyle}>
                <thead>
                    <tr>
                        <th style={thStyle}>ID</th>
                        <th style={thStyle}>Nombre</th>
                        <th style={thStyle}>Descripción</th>
                        <th style={thStyle}>Precio</th>
                        <th style={thStyle}>Activo</th>
                        <th style={thStyle}>ID Categoría</th>
                        <th style={thStyle}>ID Color</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((prod, idx) => (
                        <tr
                            key={prod.id}
                            style={hoveredRow === idx ? trHoverStyle : {}}
                            onMouseEnter={() => setHoveredRow(idx)}
                            onMouseLeave={() => setHoveredRow(null)}
                        >
                            <td style={tdStyle}>{prod.id}</td>
                            <td style={tdStyle}>{prod.name}</td>
                            <td style={tdStyle}>{prod.description}</td>
                            <td style={tdStyle}>${prod.price}</td>
                            <td style={tdStyle}>{prod.is_active ? 'Sí' : 'No'}</td>
                            <td style={tdStyle}>{prod.category_id}</td>
                            <td style={tdStyle}>{prod.color_id}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ProductList;