'use client';

import { useState }     from 'react';
import CartIcon         from '@/components/CartIcon';
import CartSidebar      from '@/components/CartSidebar';
import { useCart }      from '@/context/CartContext';
import { mockProducts } from '@/data/mockproduct';

export default function ProductsPage() {
  const [products]   = useState(mockProducts);
  const [quantities, setQuantities] = useState(
    mockProducts.reduce((acc, p) => ({ ...acc, [p.id]: 1 }), {})
  );
  const [isOpen, setIsOpen] = useState(false);
  const { addToCart } = useCart();

  return (
    <div className="relative min-h-screen p-4 bg-gray-50">
      <div className="fixed top-4 right-4 z-50">
        <CartIcon onClick={() => setIsOpen(true)} />
      </div>
      <CartSidebar isOpen={isOpen} onClose={() => setIsOpen(false)} />

      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Todos los productos
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map(prod => (
          <div key={prod.id} className="bg-white rounded-2xl shadow p-4 flex flex-col">
            {/* Imagen */}
            <img
              src={prod.image}
              alt={prod.name}
              className="h-40 w-full object-cover rounded mb-4"
            />

            {/* Título y descripción */}
            <h2 className="text-lg font-semibold text-gray-800">{prod.name}</h2>
            <p className="text-gray-700 text-sm mb-2">{prod.description}</p>

            {/* Precio */}
            <p className="text-orange-600 font-bold mb-2">
              ${new Intl.NumberFormat('es-CL').format(prod.price)}
            </p>

            {/* Colores */}
            <div className="flex gap-2 mb-2">
              {prod.colors.map(c => (
                <div
                  key={c.code}
                  title={c.name}
                  className="w-5 h-5 rounded-full border"
                  style={{ backgroundColor: c.code }}
                />
              ))}
            </div>

            {/* Selector de cantidad */}
            <div className="flex items-center gap-2 mb-4">
              <button
                onClick={() =>
                  setQuantities(q => ({
                    ...q,
                    [prod.id]: Math.max(1, q[prod.id] - 1)
                  }))
                }
                className="px-2 py-1 bg-gray-300 rounded"
              >−</button>
              <span className="w-6 text-center text-gray-800">
                {quantities[prod.id]}
              </span>
              <button
                onClick={() =>
                  setQuantities(q => ({
                    ...q,
                    [prod.id]: Math.min(prod.stock, q[prod.id] + 1)
                  }))
                }
                className="px-2 py-1 bg-gray-300 rounded"
              >+</button>
            </div>

            {/* Botón Agregar */}
            <button
              onClick={() =>
                addToCart({
                  ...prod,
                  quantity: quantities[prod.id],
                  color: prod.colors[0].code
                })
              }
              className="mt-auto bg-orange-600 text-white py-2 rounded hover:bg-orange-700"
            >
              Agregar al carrito
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
