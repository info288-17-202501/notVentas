// app/front/src/components/AdminSidebar.jsx
'use client';

import Link from 'next/link';
import { useLogout } from '@/hooks/useLogout';

export default function AdminSidebar() {
  const { logout } = useLogout();

  return (
    <aside className="w-72 bg-gray-800 p-6 flex flex-col items-center relative min-h-screen">
      <div className="mb-8 w-full text-center">
        <span className="text-white text-xl font-bold tracking-wide">
          HOLA ADMIN
        </span>
      </div>

      <nav className="flex flex-col gap-4 w-full items-center">
        <Link href="/admin/privileges/companies" className="text-white p-2 w-full text-center hover:bg-gray-700 rounded">EMPRESAS</Link>
        <Link href="/admin/privileges/products"  className="text-white p-2 w-full text-center hover:bg-gray-700 rounded">PRODUCTOS</Link>
        <Link href="/admin/privileges/sale"      className="text-white p-2 w-full text-center hover:bg-gray-700 rounded">VENTAS</Link>
        <Link href="/admin/privileges/stores"    className="text-white p-2 w-full text-center hover:bg-gray-700 rounded">VENDEDORES</Link>
        <Link href="/admin/privileges/stadistics"className="text-white p-2 w-full text-center hover:bg-gray-700 rounded">ESTADÍSTICAS</Link>
        <Link href="/admin/privileges/maps"      className="text-white p-2 w-full text-center hover:bg-gray-700 rounded">MAPAS</Link>
      </nav>

      <button
        onClick={logout}
        className="mt-auto bg-red-500 hover:bg-red-600 text-white font-bold rounded-lg p-2 w-full"
      >
        SALIR
      </button>
    </aside>
  );
}
