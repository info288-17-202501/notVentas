// app/front/src/components/CartSidebar.jsx
'use client';

import { useState } from 'react';
import { useCart } from '@/context/CartContext';
import AlertDialog from './AlertDialog';
import { X } from 'lucide-react';

export default function CartSidebar({ isOpen, onClose }) {
  const { cartItems, updateQuantity, removeFromCart, clearCart } = useCart();
  const [showSummary, setShowSummary]     = useState(false);
  const [showDeleteAlert, setShowDelete]  = useState(false);
  const [itemToDelete, setItemToDelete]   = useState(null);
  const [savingSale, setSavingSale]       = useState(false);

  const total = cartItems.reduce((sum, it) => sum + it.price * it.quantity, 0);

  const handleConfirmSale = async () => {
    setSavingSale(true);
    try {
      const u = JSON.parse(localStorage.getItem('user') || '{}');
      const payload = {
        total,
        user_id:  u.id,
        store_id: u.store_id,
        items: cartItems.map(i => ({
          product_id: i.id,
          quantity:   i.quantity,
          price:      i.price,
          color:      i.color,
        })),
      };
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/sale`,
        {
          method:  'POST',
          headers: { 'Content-Type': 'application/json' },
          body:    JSON.stringify(payload),
        }
      );
      if (!res.ok) throw new Error();
      alert('✅ Venta realizada con éxito');
      clearCart();
      setShowSummary(false);
      onClose();
    } catch {
      alert('❌ Error al procesar la venta');
    } finally {
      setSavingSale(false);
    }
  };

  return (
    <div className={`fixed top-0 right-0 … ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
      {/* header */}
      <div className="p-4 flex justify-between items-center border-b">
        <h2 className="text-xl font-semibold">Tu carrito</h2>
        <button onClick={onClose}><X className="w-6 h-6" /></button>
      </div>

      {/* contenido */}
      <div className="p-4 overflow-auto …">
        {cartItems.length === 0 ? (
          <p className="text-gray-500">El carrito está vacío.</p>
        ) : (
          <ul className="space-y-4">
            {cartItems.map((it, idx) => (
              <li key={idx} className="border p-2 rounded …">
                <div className="flex justify-between items-center">
                  <span className="font-medium">{it.name}</span>
                  <button onClick={() => { setItemToDelete(it); setShowDelete(true); }}>
                    🗑️
                  </button>
                </div>
                <div className="flex justify-between items-center text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <button onClick={() => updateQuantity(it.id, it.color, it.quantity - 1)} className="px-2 py-1 …">−</button>
                    <span>{it.quantity}</span>
                    <button onClick={() => updateQuantity(it.id, it.color, it.quantity + 1)} className="px-2 py-1 …">＋</button>
                  </div>
                  <div className="w-4 h-4 rounded-full" style={{ backgroundColor: it.color }} />
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* footer */}
      {cartItems.length > 0 && (
        <div className="p-4 border-t flex flex-col gap-2">
          <div className="text-right font-semibold text-orange-700">Total: ${total.toLocaleString('es-CL')}</div>
          <button onClick={() => setShowSummary(true)} className="bg-orange-600 …">Finalizar venta</button>
          <button onClick={clearCart} className="text-red-600 …">Vaciar carrito</button>
        </div>
      )}

      {/* modal resumen */}
      {showSummary && (
        <div className="fixed inset-0 bg-black bg-opacity-40 …">
          <div className="bg-white p-6 rounded shadow w-full max-w-lg">
            <h3 className="text-xl mb-4">Resumen de la venta</h3>
            <ul className="divide-y max-h-60 overflow-auto mb-4">
              {cartItems.map((it, i) => (
                <li key={i} className="py-2">
                  <div className="flex justify-between">
                    <span>{it.name}</span>
                    <span>${(it.price * it.quantity).toLocaleString('es-CL')}</span>
                  </div>
                  <div className="text-gray-600 text-xs flex justify-between">
                    <span>{it.quantity} x ${it.price.toLocaleString('es-CL')}</span>
                    <span>Color: {it.color}</span>
                  </div>
                </li>
              ))}
            </ul>
            <div className="text-right font-semibold mb-4">Total: ${total.toLocaleString('es-CL')}</div>
            <div className="flex justify-end gap-2">
              <button onClick={() => setShowSummary(false)} className="px-4 py-2 bg-gray-300 …">Cancelar</button>
              <button onClick={handleConfirmSale} disabled={savingSale} className="px-4 py-2 bg-green-600 text-white …">
                {savingSale ? 'Guardando…' : 'Confirmar venta'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* modal eliminar */}
      {showDeleteAlert && itemToDelete && (
        <AlertDialog
          title="¿Eliminar este producto?"
          buttons={{
            Eliminar: () => { removeFromCart(itemToDelete.id, itemToDelete.color); setItemToDelete(null); setShowDelete(false); },
            Cancelar: () => { setItemToDelete(null); setShowDelete(false); },
          }}
        />
      )}
    </div>
  );
}
