'use client';

import { useCart }             from '@/context/CartContext';
import { X }                   from 'lucide-react';
import { useState }            from 'react';
import AlertDialog             from './AlertDialog';
import { updateStock }         from '@/api/product';  // <-- importa la función

export default function CartSidebar({ isOpen, onClose }) {
  const {
    cartItems,
    updateQuantity,
    removeFromCart,
    clearCart,
  } = useCart();

  const [showSummary, setShowSummary]   = useState(false);
  const [showDeleteAlert, setShowDelete] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [savingSale, setSavingSale]     = useState(false);

  // Suma total
  const total = cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0);

  const handleConfirmSale = async () => {
    setSavingSale(true);
    try {
      const u = JSON.parse(localStorage.getItem('user') || '{}');

      // 1) Crear la venta
      const payloadSale = {
        total,
        user_id:  u.id,
        store_id: u.store_id,
        items: cartItems.map(item => ({
          product_id: item.id,
          quantity:   item.quantity,
          price:      item.price,
          color_id:   item.color_id,
        })),
      };
      const resSale = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/sale`, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify(payloadSale),
      });
      if (!resSale.ok) throw new Error('Error al crear la venta');

      // 2) Descontar stock para cada ítem
      await Promise.all(cartItems.map(item =>
        updateStock({
          store_id:   item.store_id,
          product_id: item.id,
          color_id:   item.color_id,
          quantity:  -item.quantity, // restamos
        })
      ));

      alert('✅ Venta realizada con éxito');
      clearCart();
      setShowSummary(false);
      onClose();
    } catch (err) {
      console.error(err);
      alert('❌ Error al procesar la venta');
    } finally {
      setSavingSale(false);
    }
  };

  return (
    <div
      className={`
        fixed top-0 right-0 h-full w-80 bg-white text-gray-800 shadow-lg z-50
        transform transition-transform duration-300
        ${isOpen ? 'translate-x-0' : 'translate-x-full'}
      `}
    >
      {/* Header */}
      <div className="p-4 flex justify-between items-center border-b">
        <h2 className="text-xl font-semibold">Tu carrito</h2>
        <button onClick={onClose}><X className="w-6 h-6 text-gray-600" /></button>
      </div>

      {/* Items */}
      <div className="p-4 overflow-y-auto h-[calc(100%-140px)]">
        {cartItems.length === 0
          ? <p className="text-gray-500">El carrito está vacío.</p>
          : (
            <ul className="space-y-4">
              {cartItems.map((item, idx) => (
                <li key={idx} className="border p-2 rounded-md bg-white shadow-sm">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-medium">{item.name}</span>
                    <button onClick={() => {
                      setItemToDelete(item);
                      setShowDelete(true);
                    }}>🗑️</button>
                  </div>
                  <div className="flex justify-between items-center text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <button onClick={() => updateQuantity(item.id, item.color_id, item.quantity - 1)}
                              className="px-2 py-1 bg-gray-200 rounded text-sm">−</button>
                      <span className="font-medium">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.color_id, item.quantity + 1)}
                              className="px-2 py-1 bg-gray-200 rounded text-sm">＋</button>
                    </div>
                    <div className="w-4 h-4 rounded-full border"
                         style={{ backgroundColor: item.color }} />
                  </div>
                </li>
              ))}
            </ul>
          )}
      </div>

      {/* Footer */}
      {cartItems.length > 0 && (
        <div className="p-4 border-t flex flex-col gap-2">
          <div className="text-right font-semibold text-orange-700">
            Total: ${total.toLocaleString('es-CL')}
          </div>
          <button onClick={() => setShowSummary(true)}
                  className="bg-orange-600 text-white py-2 rounded hover:bg-orange-700">
            Finalizar venta
          </button>
          <button onClick={clearCart}
                  className="text-sm text-red-600 underline hover:text-red-800">
            Vaciar carrito
          </button>
        </div>
      )}

      {/* Modal resumen */}
      {showSummary && (
        <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center">
          <div className="bg-white text-gray-800 p-6 rounded shadow-md w-[90%] max-w-lg">
            <h3 className="text-xl font-bold mb-4">Resumen de la venta</h3>
            <ul className="divide-y max-h-60 overflow-y-auto mb-4">
              {cartItems.map((item, i) => (
                <li key={i} className="py-2 text-sm">
                  <div className="flex justify-between">
                    <span>{item.name}</span>
                    <span>${(item.price * item.quantity).toLocaleString('es-CL')}</span>
                  </div>
                  <div className="text-gray-600 flex justify-between text-xs">
                    <span>{item.quantity} x ${item.price.toLocaleString('es-CL')}</span>
                    <span>Color: {item.color}</span>
                  </div>
                </li>
              ))}
            </ul>
            <div className="text-right font-semibold text-lg mb-4">
              Total: ${total.toLocaleString('es-CL')}
            </div>
            <div className="flex justify-end gap-2">
              <button onClick={() => setShowSummary(false)}
                      className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">
                Cancelar
              </button>
              <button onClick={handleConfirmSale}
                      disabled={savingSale}
                      className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50">
                {savingSale ? 'Guardando…' : 'Confirmar venta'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Confirmación eliminación */}
      {showDeleteAlert && itemToDelete && (
        <AlertDialog
          title="¿Seguro que quieres eliminar el producto?"
          buttons={{
            Eliminar: () => {
              removeFromCart(itemToDelete.id, itemToDelete.color_id);
              setShowDelete(false);
              setItemToDelete(null);
            },
            Cancelar: () => {
              setShowDelete(false);
              setItemToDelete(null);
            },
          }}
        />
      )}
    </div>
  );
}
