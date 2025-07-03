// app/front/src/components/AdminSidebar.jsx
'use client';

import Link from 'next/link';
import { useLogout } from '@/hooks/useLogout';
import { usePathname } from 'next/navigation';

export default function AdminSidebar() {
  const { logout } = useLogout();
  const pathname   = usePathname();

  const links = [
    { href: '/admin/privileges/companies', label: 'EMPRESAS' },
    { href: '/admin/privileges/products',  label: 'PRODUCTOS' },
    { href: '/admin/privileges/sale',      label: 'VENTAS' },
    { href: '/admin/privileges/stores',    label: 'VENDEDORES' }, // mantiene tu ruta actual
    { href: '/admin/privileges/tiendas',   label: 'TIENDAS'   }, // nueva ruta de ubicaciones
    { href: '/admin/privileges/stadistics',label: 'ESTADÍSTICAS' },
    { href: '/admin/privileges/maps',      label: 'MAPAS' },
  ];

  return (
    <aside className="w-72 bg-gray-800 flex flex-col justify-between h-screen p-6">
      <nav className="flex flex-col gap-4">
        {links.map(({ href, label }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={`block w-full text-center py-2 rounded ${
                active
                  ? 'bg-gray-700 text-white'
                  : 'text-white hover:bg-gray-700'
              }`}
            >
              {label}
            </Link>
          );
        })}
      </nav>
      <button
        onClick={logout}
        className="bg-red-500 hover:bg-red-600 text-white font-bold rounded-lg p-2 w-full"
      >
        SALIR
      </button>
    </aside>
  );
}
