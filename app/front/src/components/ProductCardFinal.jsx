'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import { updateStock } from '@/api/product';  // ← importamos el endpoint

export default function ProductCardFinal({ data }) {
  const { product, quantity: initialQty, color_id, store_id } = data;
  const [expanded, setExpanded] = useState(false);
  const [stock, setStock]       = useState(initialQty);
  const cardRef                 = useRef();
  const { addToCart }           = useCart();

  // Cerrar panel si clic fuera
  useEffect(() => {
    function onClickOutside(e) {
      if (cardRef.current && !cardRef.current.contains(e.target)) {
        setExpanded(false);
      }
    }
    document.addEventListener('mousedown', onClickOutside);
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, []);

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart({
      id:         product.id,
      name:       product.name,
      price:      product.price,
      color_id,
      color:      product.colors.find(c => c.color_id === color_id)?.color.code || '#000',
      quantity:   1,
      store_id,
    });
  };

  const handleIncreaseStock = async (e) => {
    e.stopPropagation();
    try {
      await updateStock({
        store_id,
        product_id: product.id,
        color_id,
        quantity:   1,            // sumamos 1 al stock
      });
      setStock(prev => prev + 1);
    } catch (err) {
      console.error('Error al aumentar stock:', err);
      alert('No se pudo actualizar el stock');
    }
  };

  return (
    <div
      ref={cardRef}
      onClick={() => setExpanded(v => !v)}
      className="relative bg-white rounded-2xl shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow duration-300 flex flex-col"
    >
      {/* Botón "+" en top-right */}
      <button
        onClick={handleIncreaseStock}
        className="absolute top-2 right-2 z-10 bg-green-500 hover:bg-green-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm"
        title="Aumentar stock"
      >＋</button>

      <div className="relative w-full h-48 bg-gray-100">
        <Image
          src={product.images[0]?.url || '/placeholder.png'}
          alt={product.name}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-4 flex-1 flex flex-col">
        <h2 className="text-xl font-semibold text-orange-700">{product.name}</h2>
        <p className="text-gray-700 line-clamp-2">{product.description}</p>

        <div className="flex justify-between items-center my-2">
          <span className="text-orange-600 font-bold">
            ${new Intl.NumberFormat('es-CL').format(product.price)}
          </span>
          <span className="text-gray-500 text-sm">Stock: {stock}</span>
        </div>

        <div className="flex items-center mb-2">
          <div
            className="w-5 h-5 rounded-full border"
            style={{ backgroundColor:
              product.colors.find(c => c.color_id === color_id)?.color.code || '#000'
            }}
          />
        </div>

        <button
          onClick={handleAddToCart}
          disabled={stock === 0}
          className={`
            mt-auto w-full py-2 rounded
            ${stock > 0
              ? 'bg-orange-600 text-white hover:bg-orange-700'
              : 'bg-gray-300 text-gray-600 cursor-not-allowed'}
          `}
        >
          {stock === 0 ? 'Agotado' : 'Agregar al carrito'}
        </button>

        {/* Panel expandible (opcional) */}
        <div className={`transition-all duration-300 overflow-hidden ${expanded ? 'max-h-40 mt-4' : 'max-h-0'}`}>
          <div className="text-sm text-gray-600">
            {/* Aquí podrías mostrar más info */}
          </div>
        </div>
      </div>
    </div>
  );
}
