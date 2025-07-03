// app/front/src/app/admin/seller/sales/[saleId]/page.jsx
'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { mockSales } from '@/data/mockSales';
import { mockSaleItems } from '@/data/mocksaleitems';

export default function SaleDetailPage({ params }) {
  const { saleId } = params;
  const router = useRouter();
  const sale = mockSales.find(s => String(s.id) === saleId);

  if (!sale) {
    return (
      <div className="p-8">
        <p className="text-red-500">Venta no encontrada.</p>
        <button
          onClick={() => router.back()}
          className="mt-4 bg-gray-200 px-4 py-2 rounded"
        >
          Volver
        </button>
      </div>
    );
  }

  const items = mockSaleItems[sale.id] || [];

  return (
    <div className="max-w-4xl mx-auto my-8 p-6 bg-white rounded-xl shadow">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">
        Productos de la venta #{sale.id}
      </h1>
      <table className="w-full text-left border-collapse mb-6">
        <thead>
          <tr className="border-b">
            <th className="py-2 text-gray-800">Producto</th>
            <th className="py-2 text-gray-800">Cantidad</th>
            <th className="py-2 text-gray-800">Precio</th>
          </tr>
        </thead>
        <tbody>
          {items.map(item => (
            <tr key={item.id} className="hover:bg-gray-50">
              <td className="py-2 text-gray-700">{item.productName}</td>
              <td className="py-2 text-gray-700">{item.quantity}</td>
              <td className="py-2 text-gray-700">
                ${new Intl.NumberFormat('es-CL').format(item.price)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Link
        href="/admin/seller/sales"
        className="text-orange-600 hover:underline"
      >
        ← Volver al listado
      </Link>
    </div>
  );
}
