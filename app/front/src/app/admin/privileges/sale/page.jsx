"use client";
import React, { useEffect, useState } from "react";
import Modal from "../../../../components/ui/modal";
import { getSales } from "../../../../api/sale";
import { getSaleItems } from "../../../../api/saleItem"; // Importar la función para crear una venta

const SaleList = () => {
  const [sales, setSales] = useState([]);
  const [selectedSale, setSelectedSale] = useState(null);
  const [saleItems, setSaleItems] = useState([]);
  const [loadingItems, setLoadingItems] = useState(false);

 
  
  useEffect(() => {
      const fetchSale = async () => {
          try {
              const saleData = await getSales();
              setSales(Array.isArray(saleData) ? saleData : []);
          } catch (error) {
              setSales([]);
              console.error('Error al obtener productos:', error);
          } finally {
              setLoading(false);
          }
      };
      fetchSale();
  }, []);

  const handleShowDetails = async (sale) => {
    setSelectedSale(sale);
    setLoadingItems(true);
    try {
      // Usar la función getSaleItem importada para obtener los items de la venta
      const data = await getSaleItems(sale.id);
      console.log("Sale items fetched:", data);
      setSaleItems(Array.isArray(data) ? data : []);
      console.log("Sale items:", saleItems);
    } catch {
      setSaleItems([]);
    }
    setLoadingItems(false);
  };

  return (
    <div className="max-w-3xl mx-auto my-8 font-sans">
      <h1 className="text-center text-3xl font-bold mb-6">Lista de Ventas</h1>
      <div className="border border-gray-200 rounded-lg p-6 bg-cyan-50 text-black">
        {sales.length === 0 ? (
          <p>No hay ventas registradas.</p>
        ) : (
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-cyan-50 py-2 px-3 border-b border-gray-200">
                <th>ID</th>
                <th>Fecha</th>
                <th>Cliente</th>
                <th>Total</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {sales.map((sale) => (
                <tr key={sale.id}>
                    <td className="py-2 px-3 border-b border-gray-100">{sale.id}</td>
                    <td className="py-2 px-3 border-b border-gray-100">{sale.date}</td>
                    <td className="py-2 px-3 border-b border-gray-100">{sale.customer || "N/A"}</td>
                    <td className="py-2 px-3 border-b border-gray-100">${sale.total}</td>
                    <td>
                        <button
                        className="bg-blue-600 m-1 text-white rounded px-3 py-1 hover:bg-blue-700 transition"
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

      {/* Modal para mostrar productos de la venta */}
      <Modal open={!!selectedSale} onClose={() => setSelectedSale(null)}>
        {selectedSale && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Productos de la venta #{selectedSale.id}</h2>
            {loadingItems ? (
              <p>Cargando productos...</p>
            ) : saleItems.length === 0 ? (
              <p>No hay productos para esta venta.</p>
            ) : (
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-blue-100 py-2 px-3 border-b border-gray-200">
                    <th>Producto</th>
                    <th>Cantidad</th>
                    <th>Precio</th>
                  </tr>
                </thead>
                <tbody>
                  {saleItems.map((item) => (
                    <tr key={item.id} className="py-2 px-3 border-b border-gray-100">
                      <td>{item.product?.name || "Producto desconocido"}</td>
                      <td>{item.quantity}</td>
                      <td>${item.price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
};

export default SaleList;