// src/components/ProductCardFinal.jsx
'use client';

import Image from 'next/image';
import { useState } from 'react';
import { useCart } from '@/context/CartContext';

export default function ProductCardFinal({ data }) {
  const { addToCart } = useCart();
  const product = data.product;             // tu objeto Product
  const stock   = data.quantity || 0;       // cantidad disponible (storeProducts.quantity)
  const color   = data.color || {           // objeto Color: { id, code, name }
    id: null,
    code: '#000000',
    name: '',
  };

  // URL de la primera imagen, o un placeholder si no hay
  const imgUrl = product.images?.[0]?.url || '/placeholder.png';

  const [qty, setQty] = useState(1);

  const inc = () => setQty((q) => Math.min(stock, q + 1));
  const dec = () => setQty((q) => Math.max(1, q - 1));

  return (
    <div className="bg-white rounded-2xl shadow p-4 flex flex-col">
      <Image
        src={imgUrl}
        alt={product.name}
        width={300}
        height={200}
        className="w-full h-48 object-cover rounded mb-2"
      />

      <h2 className="font-semibold text-gray-900">{product.name}</h2>
      <p className="text-gray-600 text-sm mb-2">{product.description}</p>

      <div className="flex justify-between items-center mb-2">
        <span className="text-orange-600 font-bold">
          ${new Intl.NumberFormat('es-CL').format(product.price)}
        </span>
        <span className="text-gray-500 text-sm">Stock: {stock}</span>
      </div>

      <div className="flex items-center gap-2 mb-4">
        <button
          onClick={dec}
          disabled={qty <= 1}
          className="px-2 py-1 bg-gray-200 rounded disabled:opacity-50"
        >
          −
        </button>
        <span className="w-6 text-center">{qty}</span>
        <button
          onClick={inc}
          disabled={qty >= stock}
          className="px-2 py-1 bg-gray-200 rounded disabled:opacity-50"
        >
          +
        </button>
      </div>

      <button
        onClick={() =>
          addToCart({
            id:      product.id,
            name:    product.name,
            price:   product.price,
            color:   color.code,
            colorId: color.id,
            quantity: qty,
          })
        }
        disabled={stock === 0}
        className="mt-auto bg-orange-600 text-white py-2 rounded hover:bg-orange-700 disabled:opacity-50"
      >
        {stock === 0 ? 'Agotado' : 'Agregar al carrito'}
      </button>
    </div>
  );
}
