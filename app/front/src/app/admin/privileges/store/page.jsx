// app/front/src/app/admin/privileges/stores/page.jsx
'use client';

import { useEffect, useState } from 'react';
import { getStores, createStore } from '@/api/store';

export default function StoresPage() {
  const [stores, setStores]   = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm]       = useState({
    name: '',
    coord_latitude: '',
    coord_longitude: '',
    address_street: '',
    address_city: '',
    address_state: '',
    postal_code: ''
  });
  const [saving, setSaving]   = useState(false);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const compId = user.company_id;
    getStores(compId)
      .then(res => res.json())
      .then(json => setStores(json.stores || []))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const handleSubmit = async e => {
    e.preventDefault();
    setSaving(true);
    try {
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      const compId = user.company_id;
      const payload = { ...form, company_id: compId };
      const res = await createStore(payload);
      if (!res.ok) throw new Error(res.statusText);
      const json = await res.json();
      setStores(prev => [...prev, json.store]);
      setForm({
        name: '',
        coord_latitude: '',
        coord_longitude: '',
        address_street: '',
        address_city: '',
        address_state: '',
        postal_code: ''
      });
    } catch (err) {
      console.error(err);
      alert('Error al crear la tienda');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <p className="p-4 text-gray-600">Cargando tiendas…</p>;
  }

  return (
    <div className="max-w-3xl mx-auto p-6 bg-gray-100 rounded-xl shadow">
      <h1 className="text-2xl font-bold mb-4">Tiendas</h1>

      <ul className="mb-6 space-y-2">
        {stores.map(s => (
          <li key={s.id} className="border p-3 rounded bg-white">
            <strong>{s.name}</strong><br/>
            {s.address_street}, {s.address_city} ({s.postal_code})
          </li>
        ))}
      </ul>

      <h2 className="text-xl font-semibold mb-2">Nueva tienda</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Nombre</label>
          <input
            type="text"
            required
            value={form.name}
            onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
            className="w-full border px-2 py-1 rounded"
          />
        </div>
        {/* … resto de inputs igual que antes … */}
        <button
          type="submit"
          disabled={saving}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          {saving ? 'Guardando…' : 'Crear tienda'}
        </button>
      </form>
    </div>
  );
}
