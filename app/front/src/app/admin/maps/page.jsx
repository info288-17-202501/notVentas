'use client';

import dynamic from 'next/dynamic';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

// Fix íconos rotos en Leaflet + Next.js
delete (L.Icon.Default.prototype)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

// Dynamic para evitar errores de SSR en Next.js
const NoSSRMap = dynamic(() => Promise.resolve(LeafletMap), { ssr: false });
//dentro de marker van los puntos de venta
function LeafletMap() {
  return (
    <MapContainer
      center={[-39.8142, -73.2459]} // Valdivia
      zoom={13}
      scrollWheelZoom={true}
      style={{ height: '600px', width: '100%' }}
      className="rounded-xl shadow-md"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[-39.8142, -73.2459]}>
        <Popup>Centro de Valdivia</Popup>

      </Marker>
    </MapContainer>
  );
}

export default function MapaPage() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-green-700 text-center">
        Mapa de Vendedores y Stock
      </h1>
      <p className="text-gray-600 mb-4 text-center">
        Aquí podrás ver la ubicación de cada vendedor y la tienda con su stock. (Versión demo sin datos reales aún)
      </p>
      <NoSSRMap />
    </div>
  );
}

