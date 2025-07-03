// app/front/src/app/admin/seller/sales/page.jsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { mockSales } from '@/data/mockSales';

export default function SalesPage() {
  const [sales] = useState(mockSales);

  return (
    <div className="max-w-4xl mx-auto my-8 p-6 bg-white rounded-xl shadow">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">Lista de Ventas</h1>

      {sales.length === 0 ? (
        <p className="text-center text-gray-500">No hay ventas registradas.</p>
      ) : (
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b">
              <th className="py-2 text-gray-800">ID</th>
              <th className="py-2 text-gray-800">Fecha</th>
              <th className="py-2 text-gray-800">Cliente</th>
              <th className="py-2 text-gray-800">Total</th>
              <th className="py-2 text-gray-800">Acción</th>
            </tr>
          </thead>
          <tbody>
            {sales.map(sale => (
              <tr key={sale.id} className="hover:bg-gray-50">
                <td className="py-2 text-gray-700">{sale.id}</td>
                <td className="py-2 text-gray-700">{sale.date}</td>
                <td className="py-2 text-gray-700">{sale.customer}</td>
                <td className="py-2 text-gray-700">
                  ${new Intl.NumberFormat('es-CL').format(sale.total)}
                </td>
                <td className="py-2">
                  <Link
                    href={`/admin/seller/sales/${sale.id}`}
                    className="text-orange-600 hover:underline"
                  >
                    Ver productos
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
