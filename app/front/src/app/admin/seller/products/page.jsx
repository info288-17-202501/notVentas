// src/app/admin/seller/products/page.jsx
'use client';

import { useEffect, useState } from 'react';
import CartIcon        from '@/components/CartIcon';
import CartSidebar     from '@/components/CartSidebar';
import ProductCardFinal from '@/components/ProductCardFinal';
import { useCart }     from '@/context/CartContext';
import { getProductStore } from '@/api/product';

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [isOpen, setIsOpen]     = useState(false);
  const { addToCart }           = useCart();

  useEffect(() => {
    async function fetchProducts() {
      try {
        const u = JSON.parse(localStorage.getItem('user') || '{}');
        const storeId = u.store_id;
        const productsData = await getProductStore(storeId);
        setProducts(Array.isArray(productsData) ? productsData : []);
      } catch (err) {
        console.error('Error cargando productos:', err);
      }
    }
    fetchProducts();
  }, []);

  return (
    <div className="relative min-h-screen p-6 bg-gray-50">
      <div className="fixed top-4 right-4 z-50">
        <CartIcon onClick={() => setIsOpen(true)} />
      </div>
      <CartSidebar isOpen={isOpen} onClose={() => setIsOpen(false)} />

      <h1 className="text-3xl font-bold text-gray-800 mb-6">Todos los productos</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((p, i) => (
          <ProductCardFinal key={i} data={p} />
        ))}
      </div>
    </div>
  );
}
