'use client';

import { useEffect, useState } from 'react';
import CartIcon from '@/components/CartIcon';
import CartSidebar from '@/components/CartSidebar';
import ProductCardFinal from '@/components/ProductCardFinal';
import { useCart } from '@/context/CartContext';
import { getProducts } from '@/api/product';
import { get } from 'http';

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const { addToCart } = useCart();
  
  useEffect(() => {
    async function fetchProducts() {
      try {
        console.log('storeid: ' + localStorage.getItem('storeid'));
        const storeId = localStorage.getItem('user')
        console.log('storeid: ' + storeId);
        const res = await getProducts(storeId);
        if (!res.ok) throw new Error('Error al cargar productos');
        const data = await res.json();
        setProducts(data.products); // Asumiendo que el backend responde con { products: [...] }
      } catch (err) {
        console.error('Error cargando productos:', err);
      }
    }

    fetchProducts();
  }, []);

  return (
    <div className="relative min-h-screen p-4 bg-gray-50">
      <div className="fixed top-4 right-4 z-50">
        <CartIcon onClick={() => setIsOpen(true)} />
      </div>
      <CartSidebar isOpen={isOpen} onClose={() => setIsOpen(false)} />

      <h1 className="text-3xl font-bold text-gray-800 mb-6">Todos los productos</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map(prod => (
          <ProductCardFinal key={prod.product.id} data={prod} />
        ))}
      </div>
    </div>
  );
}