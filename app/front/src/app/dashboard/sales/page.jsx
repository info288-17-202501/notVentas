"use client";
import React, { useEffect, useState } from "react";


const SaleList = () => {
    const [sales, setSales] = useState([]);
    const [selectedSale, setSelectedSale] = useState(null);
    const [saleItems, setSaleItems] = useState([]);
    const [loadingItems, setLoadingItems] = useState(false);

    useEffect(() => {
        fetch("http://localhost:3000/api/sale")
            .then((res) => res.json())
            .then(setSales)
            .catch(() => setSales([]));
    }, []);

    const handleShowDetails = async (sale) => {
        setSelectedSale(sale);
        setLoadingItems(true);
        try {
            const res = await fetch(`http://localhost:3000/api/saleitem/${sale.id}`);
            const data = await res.json();
            setSaleItems(data);
        } catch {
            setSaleItems([]);
        }
        setLoadingItems(false);
    };

    return (
        <div style={{ maxWidth: 800, margin: "2rem auto", fontFamily: "sans-serif" }}>
            <h1 style={{ textAlign: "center" }}>Lista de Ventas</h1>
            <div style={{ border: "1px solid #ddd", borderRadius: 8, padding: 24, background: "#fafbfc" }}>
                {sales.length === 0 ? (
                    <p>No hay ventas registradas.</p>
                ) : (
                    <table style={{ width: "100%", borderCollapse: "collapse" }}>
                        <thead>
                            <tr style={{ background: "#f0f2f5" }}>
                                <th style={{ padding: 8, borderBottom: "1px solid #ddd" }}>ID</th>
                                <th style={{ padding: 8, borderBottom: "1px solid #ddd" }}>Fecha</th>
                                <th style={{ padding: 8, borderBottom: "1px solid #ddd" }}>Cliente</th>
                                <th style={{ padding: 8, borderBottom: "1px solid #ddd" }}>Total</th>
                                <th style={{ padding: 8, borderBottom: "1px solid #ddd" }}>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sales.map((sale) => (
                                <tr key={sale.id}>
                                    <td style={{ padding: 8, borderBottom: "1px solid #eee" }}>{sale.id}</td>
                                    <td style={{ padding: 8, borderBottom: "1px solid #eee" }}>{sale.date}</td>
                                    <td style={{ padding: 8, borderBottom: "1px solid #eee" }}>{sale.customer || "N/A"}</td>
                                    <td style={{ padding: 8, borderBottom: "1px solid #eee" }}>${sale.total}</td>
                                    <td style={{ padding: 8, borderBottom: "1px solid #eee" }}>
                                        <button
                                            style={{
                                                background: "#0070f3",
                                                color: "#fff",
                                                border: "none",
                                                borderRadius: 4,
                                                padding: "6px 12px",
                                                cursor: "pointer",
                                            }}
                                            onClick={() => handleShowDetails(sale)}
                                        >
                                            Ver productos
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>

            {selectedSale && (
                <div
                    style={{
                        marginTop: 32,
                        padding: 24,
                        border: "1px solid #0070f3",
                        borderRadius: 8,
                        background: "#f5faff",
                    }}
                >
                    <h2>Productos de la venta #{selectedSale.id}</h2>
                    {loadingItems ? (
                        <p>Cargando productos...</p>
                    ) : saleItems.length === 0 ? (
                        <p>No hay productos para esta venta.</p>
                    ) : (
                        <table style={{ width: "100%", borderCollapse: "collapse" }}>
                            <thead>
                                <tr style={{ background: "#e6f0fa" }}>
                                    <th style={{ padding: 8, borderBottom: "1px solid #ddd" }}>Producto</th>
                                    <th style={{ padding: 8, borderBottom: "1px solid #ddd" }}>Cantidad</th>
                                    <th style={{ padding: 8, borderBottom: "1px solid #ddd" }}>Precio</th>
                                </tr>
                            </thead>
                            <tbody>
                                {saleItems.map((item) => (
                                    <tr key={item.id}>
                                        <td style={{ padding: 8, borderBottom: "1px solid #eee" }}>{item.productName}</td>
                                        <td style={{ padding: 8, borderBottom: "1px solid #eee" }}>{item.quantity}</td>
                                        <td style={{ padding: 8, borderBottom: "1px solid #eee" }}>${item.price}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                    <button
                        style={{
                            marginTop: 16,
                            background: "#e53e3e",
                            color: "#fff",
                            border: "none",
                            borderRadius: 4,
                            padding: "6px 12px",
                            cursor: "pointer",
                        }}
                        onClick={() => setSelectedSale(null)}
                    >
                        Cerrar
                    </button>
                </div>
            )}
        </div>
    );
};

export default SaleList;