// app/front/src/app/admin/layout.js
'use client';

import { CartProvider } from '@/context/CartContext';
import AdminSidebar    from '@/components/adminsidebar';
import SellerSidebar   from '@/components/sellersidebar';

export default function AdminLayout({ children }) {
  // Sólo en cliente
  const user = typeof window !== 'undefined'
    ? JSON.parse(localStorage.getItem('user') || 'null')
    : null;
  const userRole = user?.role; // 'admin' o 'seller'

  return (
    <CartProvider>
      <div className="flex">
        {userRole === 'admin'
          ? <AdminSidebar />
          : <SellerSidebar />
        }

        <main className="flex-1 p-8 bg-gray-50">
          {children}
        </main>
      </div>
    </CartProvider>
  );
}
