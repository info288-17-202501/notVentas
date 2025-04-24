import React from 'react';

const CatalogPage = () => {
    const products = [
        { id: 1, name: 'Producto 1', price: 100 },
        { id: 2, name: 'Producto 2', price: 200 },
        { id: 3, name: 'Producto 3', price: 300 },
    ];

    return (
        <div>
            <h1>Catálogo de Productos</h1>
            <ul>
                {products.map((product) => (
                    <li key={product.id}>
                        <h2>{product.name}</h2>
                        <p>Precio: ${product.price}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CatalogPage;