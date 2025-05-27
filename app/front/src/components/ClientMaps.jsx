"use client";

import dynamic from "next/dynamic";
import React from "react";

// Carga dinámica de react-leaflet y leaflet solo en el cliente
const StoreMaps = dynamic(() => import("./StoreMaps"), {
  ssr: false,
});

// Tiendas de ejemplo
const tiendasEjemplo = [
  { id: "1", nombre: "Tienda Centro", lat: -39.8142, lng: -73.2459 },
  { id: "2", nombre: "Sucursal Norte", lat: -39.8000, lng: -73.2500 },
  { id: "3", nombre: "Sucursal Sur", lat: -39.8300, lng: -73.2400 },
];

const ClientMaps = () => {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-green-700 text-center">
        Mapa de Vendedores y Stock
      </h1>
      <p className="text-gray-600 mb-4 text-center">
        Aquí podrás ver la ubicación de cada vendedor y la tienda con su stock.
      </p>
      <StoreMaps tiendas={tiendasEjemplo} />
    </div>
  );
};

export default ClientMaps;
