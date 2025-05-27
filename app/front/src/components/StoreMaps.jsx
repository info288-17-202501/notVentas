"use client";

import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useMemo } from 'react';

// Fix de iconos de Leaflet en React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png",
});

export default function StoreMaps({ tiendas }) {
  const position = useMemo(() => [tiendas[0]?.lat || 0, tiendas[0]?.lng || 0], [tiendas]);

  return (
    <MapContainer center={position} zoom={13} style={{ height: "500px", width: "100%" }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {tiendas.map((tienda) => (
        <Marker key={tienda.id} position={[tienda.lat, tienda.lng]}>
          <Popup>{tienda.nombre}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
