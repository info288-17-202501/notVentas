'use client';

import { useCart } from '@/context/CartContext';
import { X } from 'lucide-react';
import { useState } from 'react';
import AlertDialog from './AlertDialog';

export default function CartSidebar({ isOpen, onClose }) {
  const {
    cartItems,
    updateQuantity,
    removeFromCart,
    clearCart,
  } = useCart();

  const [showSummary, setShowSummary] = useState(false);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [savingSale, setSavingSale] = useState(false);

  // Calcula el total
  const total = cartItems.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );

  // Envía la venta al backend y resetea el carrito
  const handleConfirmSale = async () => {
    setSavingSale(true);
    try {
      // Obtén user y store del localStorage
      const u = JSON.parse(localStorage.getItem('user') || '{}');
      const payload = {
        total,
        user_id: u.id,
        store_id: u.store_id,
        items: cartItems.map((item) => ({
          product_id: item.id,
          quantity: item.quantity,
          price: item.price,
          color: item.color,
        })),
      };

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/sale`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        }
      );

      if (!res.ok) throw new Error('Error al crear la venta');
      // Opcional: leer respuesta
      // const json = await res.json();

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
      className={`fixed top-0 right-0 h-full w-80 bg-white text-gray-800 shadow-lg z-50 transform transition-transform duration-300 ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}
    >
      <div className="p-4 flex justify-between items-center border-b">
        <h2 className="text-xl font-semibold">Tu carrito</h2>
        <button onClick={onClose}>
          <X className="w-6 h-6 text-gray-600" />
        </button>
      </div>

      <div className="p-4 overflow-y-auto h-[calc(100%-140px)]">
        {cartItems.length === 0 ? (
          <p className="text-gray-500">El carrito está vacío.</p>
        ) : (
          <ul className="space-y-4">
            {cartItems.map((item, index) => (
              <li
                key={index}
                className="border p-2 rounded-md flex flex-col gap-1 bg-white shadow-sm"
              >
                <div className="flex justify-between items-center">
                  <span className="font-medium">{item.name}</span>
                  <button
                    onClick={() => {
                      setItemToDelete(item);
                      setShowDeleteAlert(true);
                    }}
                  >
                    🗑️
                  </button>
                </div>
                <div className="flex justify-between items-center text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() =>
                        updateQuantity(
                          item.id,
                          item.color,
                          item.quantity - 1
                        )
                      }
                      className="px-2 py-1 bg-gray-200 rounded text-sm"
                    >
                      -
                    </button>
                    <span className="font-medium">{item.quantity}</span>
                    <button
                      onClick={() =>
                        updateQuantity(
                          item.id,
                          item.color,
                          item.quantity + 1
                        )
                      }
                      className="px-2 py-1 bg-gray-200 rounded text-sm"
                    >
                      +
                    </button>
                  </div>
                  <div
                    className="w-4 h-4 rounded-full border"
                    style={{ backgroundColor: item.color }}
                  />
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {cartItems.length > 0 && (
        <div className="p-4 border-t flex flex-col gap-2">
          <div className="text-right font-semibold text-orange-700">
            Total: ${total.toLocaleString('es-CL')}
          </div>
          <button
            onClick={() => setShowSummary(true)}
            className="bg-orange-600 text-white py-2 rounded hover:bg-orange-700"
          >
            Finalizar venta
          </button>
          <button
            onClick={clearCart}
            className="text-sm text-red-600 underline hover:text-red-800"
          >
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
              {cartItems.map((item, idx) => (
                <li key={idx} className="py-2 text-sm">
                  <div className="flex justify-between">
                    <span>{item.name}</span>
                    <span>
                      $
                      {(item.price * item.quantity).toLocaleString(
                        'es-CL'
                      )}
                    </span>
                  </div>
                  <div className="text-gray-600 flex justify-between text-xs">
                    <span>
                      {item.quantity} x $
                      {item.price.toLocaleString('es-CL')}
                    </span>
                    <span>Color: {item.color}</span>
                  </div>
                </li>
              ))}
            </ul>
            <div className="text-right font-semibold text-lg mb-4">
              Total: ${total.toLocaleString('es-CL')}
            </div>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowSummary(false)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancelar
              </button>
              <button
                onClick={handleConfirmSale}
                disabled={savingSale}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
              >
                {savingSale ? 'Guardando…' : 'Confirmar venta'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de confirmación de eliminación */}
      {showDeleteAlert && itemToDelete && (
        <AlertDialog
          title="¿Seguro que quieres eliminar el producto?"
          buttons={{
            Eliminar: () => {
              removeFromCart(itemToDelete.id, itemToDelete.color);
              setShowDeleteAlert(false);
              setItemToDelete(null);
            },
            Cancelar: () => {
              setShowDeleteAlert(false);
              setItemToDelete(null);
            },
          }}
        />
      )}
    </div>
  );
}
