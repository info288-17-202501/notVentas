// app/front/src/components/AdminSidebar.jsx
'use client';

import Link from 'next/link';
import { useLogout } from '@/hooks/useLogout';

export default function AdminSidebar() {
  const { logout } = useLogout();
  return (
    <aside className="w-72 bg-gray-800 p-6 flex flex-col">
      <div className="mb-8 text-center">
        <span className="text-white text-xl font-bold">HOLA ADMIN</span>
      </div>
      <nav className="flex flex-col gap-4">
        <Link href="/admin/privileges/companies" className="text-white hover:text-green-300">
          EMPRESAS
        </Link>
        <Link href="/admin/privileges/products" className="text-white hover:text-green-300">
          PRODUCTOS
        </Link>
        <Link href="/admin/privileges/stores" className="text-white hover:text-green-300">
          TIENDAS
        </Link>
        <Link href="/admin/privileges/sale" className="text-white hover:text-green-300">
          VENTAS
        </Link>
        <Link href="/admin/privileges/stadistics" className="text-white hover:text-green-300">
          ESTADÍSTICAS
        </Link>
        <Link href="/admin/privileges/maps" className="text-white hover:text-green-300">
          MAPAS
        </Link>
      </nav>
      <button
        onClick={logout}
        className="mt-auto bg-red-500 text-white py-2 rounded hover:bg-red-600"
      >
        SALIR
      </button>
    </aside>
  );
}
