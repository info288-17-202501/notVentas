'use client';

import { useState } from 'react';
import { useCart } from '@/context/CartContext';

export default function ProductCardFinal({ data }) {
  const { addToCart } = useCart();
  const { product, colors, total_quantity } = data;

  const [quantity, setQuantity] = useState(1);
  const defaultColor = colors[0];

  return (
    <div className="bg-white rounded-2xl shadow p-4 flex flex-col">
      <div className="h-40 w-full bg-gray-200 rounded mb-4 flex items-center justify-center">
        <span className="text-gray-500">Imagen</span>
      </div>

      <h2 className="text-lg font-semibold text-gray-800">{product.name}</h2>
      <p className="text-gray-700 text-sm mb-2">{product.description}</p>

      <p className="text-orange-600 font-bold mb-2">
        ${new Intl.NumberFormat('es-CL').format(product.price)}
      </p>

      <div className="flex gap-2 mb-2">
        {colors.map(c => (
          <div
            key={c.id}
            title={`${c.name} (${c.quantity} disponibles)`}
            className="w-5 h-5 rounded-full border"
            style={{ backgroundColor: c.code }}
          />
        ))}
      </div>

      <div className="flex items-center gap-2 mb-4">
        <button
          onClick={() => setQuantity(q => Math.max(1, q - 1))}
          className="px-2 py-1 bg-gray-300 rounded"
        >
          −
        </button>
        <span className="w-6 text-center text-gray-800">{quantity}</span>
        <button
          onClick={() => setQuantity(q => Math.min(total_quantity, q + 1))}
          className="px-2 py-1 bg-gray-300 rounded"
        >
          +
        </button>
      </div>

      <button
        onClick={() =>
          addToCart({
            ...product,
            quantity,
            color: defaultColor.code,
          })
        }
        className="mt-auto bg-orange-600 text-white py-2 rounded hover:bg-orange-700"
      >
        Agregar al carrito
      </button>
    </div>
  );
}
