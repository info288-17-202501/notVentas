import ClientMaps from "../../../components/ClientMaps";

// Tiendas de ejemplo
const tiendasEjemplo = [
  { id: "1", nombre: "Tienda Centro", lat: -39.8142, lng: -73.2459 },
  { id: "2", nombre: "Sucursal Norte", lat: -39.8000, lng: -73.2500 },
  { id: "3", nombre: "Sucursal Sur", lat: -39.8300, lng: -73.2400 },
];

export default function MapaPage() {
  return <ClientMaps/>
}