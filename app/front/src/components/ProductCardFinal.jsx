'use client';

import Image from 'next/image';
import { useCart } from '@/context/CartContext';

export default function ProductCardFinal({ data }) {
  const { addToCart, totalCount } = useCart();
  const { product, stock, colors, images } = data;
  const defaultColor = colors?.[0]?.color.code;
  const hasStock = stock > 0;

  return (
    <div className="relative bg-white rounded-xl shadow p-4 flex flex-col">
      {/* Botón “+1” rápido */}
      <button
        onClick={() => hasStock && addToCart({
          id: product.id,
          name: product.name,
          price: product.price,
          color: defaultColor,
          colorId: colors?.[0]?.color.id,
          quantity: 1,
        })}
        disabled={!hasStock}
        className={`absolute top-2 right-2 w-6 h-6 rounded-full flex items-center justify-center ${
          hasStock ? 'bg-orange-600 text-white hover:bg-orange-700' : 'bg-gray-300 text-gray-500 cursor-not-allowed'
        }`}
      >
        +
      </button>

      <Image
        src={images?.[0]?.url || '/placeholder.png'}
        alt={product.name}
        width={300}
        height={200}
        className="w-full h-40 object-cover rounded"
      />

      <h2 className="mt-2 font-semibold text-gray-800">{product.name}</h2>
      <p className="text-gray-600 text-sm flex-1">{product.description}</p>

      <p className="text-orange-600 font-bold mt-2">
        ${new Intl.NumberFormat('es-CL').format(product.price)}
      </p>
      <p className="text-sm text-gray-500">
        Stock: <span className={hasStock ? 'text-gray-800' : 'text-red-600'}>{stock}</span>
      </p>
    </div>
  );
}
