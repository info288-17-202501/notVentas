'use client';

import Image from 'next/image';
import { useState } from 'react';
import { useCart } from '@/context/CartContext';

export default function ProductCardFinal({ data }) {
  const { product, quantity: stock, colors, images } = data;
  const [qty, setQty] = useState(1);
  const { addToCart } = useCart();

  const defaultColor = colors[0]?.code || null;

  const handleIncrement = () => {
    if (qty < stock) setQty(qty + 1);
  };
  const handleDecrement = () => {
    if (qty > 1) setQty(qty - 1);
  };

  return (
    <div className="bg-white rounded-xl shadow p-4 flex flex-col relative">
      {/* Marcador de "Agotado" */}
      {stock === 0 && (
        <div className="absolute inset-0 bg-white bg-opacity-70 flex items-center justify-center z-10">
          <span className="text-gray-500 font-semibold">Agotado</span>
        </div>
      )}

      {/* Imagen */}
      <div className="h-48 w-full mb-3 relative">
        {images[0]?.url ? (
          <Image
            src={images[0].url}
            alt={product.name}
            fill
            className="object-cover rounded"
          />
        ) : (
          <div className="bg-gray-200 w-full h-full rounded" />
        )}
      </div>

      {/* Nombre y descripción */}
      <h2 className="text-lg font-semibold text-gray-800">{product.name}</h2>
      <p className="text-gray-600 text-sm mb-2">{product.description}</p>

      {/* Precio */}
      <p className="text-orange-600 font-bold mb-2">
        ${new Intl.NumberFormat('es-CL').format(product.price)}
      </p>

      {/* Stock */}
      <p className="text-gray-500 text-sm mb-2">Stock disponible: {stock}</p>

      {/* Selector de cantidad */}
      <div className="flex items-center gap-2 mb-4">
        <button
          onClick={handleDecrement}
          disabled={qty <= 1 || stock === 0}
          className="px-2 py-1 bg-gray-300 rounded disabled:opacity-50"
        >
          −
        </button>
        <span className="w-6 text-center">{qty}</span>
        <button
          onClick={handleIncrement}
          disabled={qty >= stock || stock === 0}
          className="px-2 py-1 bg-gray-300 rounded disabled:opacity-50"
        >
          +
        </button>
      </div>

      {/* Botón agregar al carrito */}
      <button
        onClick={() =>
          addToCart({
            ...product,
            quantity: qty,
            color: defaultColor,
          })
        }
        disabled={stock === 0}
        className="mt-auto w-full bg-orange-600 text-white py-2 rounded hover:bg-orange-700 disabled:opacity-50"
      >
        Agregar al carrito
      </button>
    </div>
  );
}
