// app/cart/page.tsx
'use client';

import { useCartStore } from '@/store/cartStore';

export default function CartPage() {
  const { items, removeFromCart, clearCart } = useCartStore();

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Carrito</h1>
      {items.length === 0 ? (
        <p>El carrito está vacío.</p>
      ) : (
        <div>
          {items.map((item) => (
            <div key={item.id} className="flex justify-between items-center border-b py-2">
              <div>
                {item.name} x{item.quantity}
              </div>
              <div>${item.price * item.quantity}</div>
              <button
                onClick={() => removeFromCart(item.id)}
                className="text-red-500"
              >
                Quitar
              </button>
            </div>
          ))}
          <div className="mt-4 font-bold">Total: ${total}</div>
          <button
            onClick={clearCart}
            className="mt-2 px-4 py-2 bg-red-600 text-white rounded"
          >
            Vaciar carrito
          </button>
        </div>
      )}
    </div>
  );
}
