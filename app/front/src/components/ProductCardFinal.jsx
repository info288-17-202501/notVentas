// app/front/src/components/ProductCardFinal.jsx
'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import { updateStock } from '@/api/product';

export default function ProductCardFinal({ data }) {
  // 1) Desestructuramos solo lo que sí existe
  const { product, quantity: initialStock, color_id, store_id } = data;

  // 2) Sacamos el hex del color (o fallback)
  const colorCode = data.color_code || data.color?.code || '#000000';

  const [stock, setStock] = useState(initialStock);
  const [qty, setQty]     = useState(1);
  const { addToCart }     = useCart();
  const cardRef           = useRef();

  // ———> Función para subir el stock via PATCH /storeproducts
  const handleIncreaseStock = async (e) => {
    e.stopPropagation();
    try {
      await updateStock({
        store_id,
        product_id: product.id,
        color_id,
        quantity: 1, // sumamos 1
      });
      setStock(s => s + 1);
    } catch (err) {
      console.error(err);
      alert('❌ No se pudo actualizar el stock');
    }
  };

  // ———> Agregar al carrito respetando la cantidad
  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart({
      id:       product.id,
      name:     product.name,
      price:    product.price,
      quantity: qty,
      color:    colorCode,
    });
  };

  return (
    <div
      ref={cardRef}
      className="relative bg-white rounded-xl shadow p-4 flex flex-col"
    >
      {/* BOTÓN + PARA AUMENTAR STOCK */}
      <button
        onClick={handleIncreaseStock}
        className="absolute top-2 right-2 bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
        title="Aumentar stock"
      >
        +
      </button>

      {/* IMAGEN */}
      <div className="relative w-full h-48 bg-gray-100 rounded overflow-hidden">
        <Image
          src={product.images?.[0]?.url || '/images/placeholder.png'}
          alt={product.name}
          fill
          priority
          className="object-cover"
        />
      </div>

      {/* NOMBRE + DESCRIPCIÓN */}
      <h3 className="mt-2 font-semibold text-gray-800">{product.name}</h3>
      <p className="text-gray-600 text-sm mb-2">{product.description}</p>

      {/* PRECIO Y STOCK */}
      <div className="flex justify-between items-center mb-4">
        <span className="text-orange-600 font-bold">
          ${new Intl.NumberFormat('es-CL').format(product.price)}
        </span>
        <span className="text-gray-500 text-sm">Stock: {stock}</span>
      </div>

      {/* SELECTOR DE CANTIDAD */}
      <div className="flex items-center gap-2 mb-4">
        <button
          onClick={() => setQty(q => Math.max(1, q - 1))}
          disabled={qty <= 1}
          className="px-2 py-1 bg-gray-300 rounded disabled:opacity-50"
        >
          −
        </button>
        <span className="w-6 text-center">{qty}</span>
        <button
          onClick={() => setQty(q => Math.min(stock, q + 1))}
          disabled={qty >= stock}
          className="px-2 py-1 bg-gray-300 rounded disabled:opacity-50"
        >
          +
        </button>
      </div>

      {/* BOTÓN AGREGAR AL CARRITO */}
      <button
        onClick={handleAddToCart}
        disabled={stock === 0}
        className={`mt-auto w-full py-2 rounded ${
          stock > 0
            ? 'bg-orange-600 text-white hover:bg-orange-700'
            : 'bg-gray-300 text-gray-600 cursor-not-allowed'
        }`}
      >
        {stock > 0 ? 'Agregar al carrito' : 'Agotado'}
      </button>
    </div>
  );
}
