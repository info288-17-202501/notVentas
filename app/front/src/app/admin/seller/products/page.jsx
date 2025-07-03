'use client';

import { useEffect, useState } from 'react';
import CartIcon          from '@/components/CartIcon';
import CartSidebar       from '@/components/CartSidebar';
import ProductCardFinal  from '@/components/ProductCardFinal';
import { useCart }       from '@/context/CartContext';
import { getProductStore } from '@/api/product';

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [isOpen, setIsOpen]     = useState(false);
  const { addToCart }           = useCart();

  useEffect(() => {
    async function fetchProducts() {
      try {
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        const storeId = user.store_id;
        const productsData = await getProductStore(storeId);
        // productsData debe venir como [{ product, quantity, colors, images }, ...]
        setProducts(Array.isArray(productsData) ? productsData : []);
      } catch (err) {
        console.error('Error cargando productos:', err);
      }
    }
    fetchProducts();
  }, []);

  return (
    <div className="relative min-h-screen p-4 bg-gray-50">
      {/* Icono del carrito */}
      <div className="fixed top-4 right-4 z-50">
        <CartIcon onClick={() => setIsOpen(true)} />
      </div>
      <CartSidebar isOpen={isOpen} onClose={() => setIsOpen(false)} />

      <h1 className="text-3xl font-bold text-gray-800 mb-6">Todos los productos</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((item) => (
          <ProductCardFinal key={item.product.id} data={item} />
        ))}
      </div>
    </div>
  );
}
