// app/front/src/components/SellerSidebar.jsx
'use client';

import Link from 'next/link';
import { useLogout } from '@/hooks/useLogout';
import { usePathname } from 'next/navigation';

export default function SellerSidebar() {
  const { logout } = useLogout();
  const pathname   = usePathname();

  const links = [
    { href: '/admin/seller/products', label: 'PRODUCTOS' },
    { href: '/admin/seller/sales',    label: 'VENTAS'    },
  ];

  return (
    <aside className="w-72 bg-gray-800 flex flex-col justify-between h-screen p-6">
      {/* Encabezado + Nav */}
      <div>
        <div className="mb-8 text-center">
          <span className="text-white text-xl font-bold">HOLA SELLER</span>
        </div>

        <nav className="flex flex-col gap-4 w-full">
          {links.map(({ href, label }) => {
            const isActive = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={`block w-full text-center py-2 rounded ${
                  isActive
                    ? 'bg-gray-700 text-white'
                    : 'text-white hover:bg-gray-700'
                }`}
              >
                {label}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Botón Salir siempre abajo */}
      <button
        onClick={logout}
        className="bg-red-500 hover:bg-red-600 text-white font-bold rounded-lg p-2 w-full"
      >
        SALIR
      </button>
    </aside>
  );
}
