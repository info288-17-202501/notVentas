'use client';
import React, { useEffect, useState } from 'react';
import ProductCard from '../../../components/ProductCard1';

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
            <div className=" text-black grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
                {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
};

export default ProductList;