// app/front/src/app/admin/privileges/stores/page.jsx
'use client';

import { useState, useEffect, useCallback } from 'react';
import dynamic from 'next/dynamic';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { getStores, createStore } from '@/api/store';

// Leaflet icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon-2x.png',
  iconUrl:
    'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png',
  shadowUrl:
    'https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png',
});

// Dinámicos para ssr: false
const MapContainer = dynamic(
  () => import('react-leaflet').then(m => m.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import('react-leaflet').then(m => m.TileLayer),
  { ssr: false }
);
const Marker = dynamic(
  () => import('react-leaflet').then(m => m.Marker),
  { ssr: false }
);
const useMap = dynamic(
  () => import('react-leaflet').then(m => m.useMap),
  { ssr: false }
);

function RecenterMap({ center }) {
  const map = useMap();
  map.setView(center, map.getZoom());
  return null;
}

const regionesChile = [
  'Arica y Parinacota','Tarapacá','Antofagasta','Atacama','Coquimbo',
  'Valparaíso','Metropolitana','O’Higgins','Maule','Ñuble','Bío Bío',
  'Araucanía','Los Ríos','Los Lagos','Aysén','Magallanes y la Antártica'
];

export default function StoresPage() {
  const [stores, setStores]     = useState([]);
  const [loading, setLoading]   = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [saving, setSaving]     = useState(false);

  const [form, setForm] = useState({
    name: '',
    address_street: '',
    address_city: '',
    address_state: '',
    coord_latitude:  -39.8142,
    coord_longitude: -73.2459
  });

  // 1) Carga inicial
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (!user.company_id) {
      setLoading(false);
      return;
    }
    getStores(user.company_id)
      .then(data => {
        // detectamos si viene como array o dentro de .stores
        const list = Array.isArray(data) ? data : data.stores;
        setStores(list || []);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  // 2) geocoding simple al salir del campo
  const geocode = useCallback(async () => {
    const { address_street, address_city, address_state } = form;
    if (!address_street || !address_city || !address_state) return;
    const q = encodeURIComponent(
      `${address_street}, ${address_city}, ${address_state}`
    );
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${q}`
      );
      const [first] = await res.json();
      if (first) {
        setForm(f => ({
          ...f,
          coord_latitude:  parseFloat(first.lat),
          coord_longitude: parseFloat(first.lon)
        }));
      }
    } catch (err) {
      console.error('Geocoding error', err);
    }
  }, [form.address_street, form.address_city, form.address_state]);

  // 3) envío del formulario
  const handleSubmit = async e => {
    e.preventDefault();
    setSaving(true);
    try {
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      const payload = { ...form, company_id: user.company_id };
      // createStore con axios devuelve response.data
      const resp = await createStore(payload);
      // si tu backend envía { store: {...} } lo cogemos, si envía {...} directo lo cogemos
      const nuevo = resp.store ?? resp;
      setStores(prev => [...prev, nuevo]);
      setOpenModal(false);
      // reset
      setForm({
        name: '',
        address_street: '',
        address_city: '',
        address_state: '',
        coord_latitude:  -39.8142,
        coord_longitude: -73.2459
      });
    } catch (err) {
      console.error(err);
      alert('Error creando tienda: ' + err);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <p className="p-6 text-gray-700">Cargando tiendas…</p>;
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Tiendas</h1>
        <button
          onClick={() => setOpenModal(true)}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Agregar Tienda
        </button>
      </div>

      <ul className="space-y-4">
        {stores.map(s => (
          <li
            key={s.id}
            className="bg-white p-4 rounded-lg shadow-sm text-gray-800"
          >
            <strong className="block text-lg">{s.name}</strong>
            <span className="text-gray-600">
              {s.address_street}, {s.address_city} —{' '}
              <em className="text-sm">{s.address_state}</em>
            </span>
          </li>
        ))}
      </ul>

      {openModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6 relative">
            <button
              onClick={() => setOpenModal(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Agregar Tienda
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              {[
                { label: 'Nombre',    field: 'name' },
                { label: 'Dirección', field: 'address_street' },
                { label: 'Ciudad',    field: 'address_city' },
              ].map(({label,field}) => (
                <div key={field}>
                  <label className="block mb-1 text-gray-700">{label}</label>
                  <input
                    type="text"
                    required
                    value={form[field]}
                    onChange={e =>
                      setForm(f => ({ ...f, [field]: e.target.value }))
                    }
                    onBlur={geocode}
                    className="w-full border rounded px-3 py-2 text-gray-900"
                  />
                </div>
              ))}

              <div>
                <label className="block mb-1 text-gray-700">
                  Región / Estado
                </label>
                <select
                  required
                  value={form.address_state}
                  onChange={e =>
                    setForm(f => ({ ...f, address_state: e.target.value }))
                  }
                  onBlur={geocode}
                  className="w-full border rounded px-3 py-2 text-gray-900"
                >
                  <option value="">Seleccione una región</option>
                  {regionesChile.map(r => (
                    <option key={r} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block mb-1 text-gray-700">
                  Ubicación (arrastra el pin o haz click)
                </label>
                <div className="h-64 rounded overflow-hidden">
                  <MapContainer
                    center={[form.coord_latitude, form.coord_longitude]}
                    zoom={13}
                    style={{ height: '100%', width: '100%' }}
                    whenCreated={map => {
                      map.on('click', e => {
                        setForm(f => ({
                          ...f,
                          coord_latitude:  e.latlng.lat,
                          coord_longitude: e.latlng.lng
                        }));
                      });
                    }}
                  >
                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                    <RecenterMap
                      center={[form.coord_latitude, form.coord_longitude]}
                    />
                    <Marker
                      position={[form.coord_latitude, form.coord_longitude]}
                      draggable
                      eventHandlers={{
                        dragend: e => {
                          const ll = e.target.getLatLng();
                          setForm(f => ({
                            ...f,
                            coord_latitude:  ll.lat,
                            coord_longitude: ll.lng
                          }));
                        }
                      }}
                    />
                  </MapContainer>
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-4">
                <button
                  type="button"
                  onClick={() => setOpenModal(false)}
                  className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                >
                  {saving ? 'Guardando…' : 'Crear Tienda'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
