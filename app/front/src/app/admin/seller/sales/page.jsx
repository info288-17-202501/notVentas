"use client";

import Image from "next/image";
import CartIcon from "@/components/CartIcon";
import CartSidebar from "@/components/CartSidebar";
import { useCart } from "@/context/CartContext";
import { useState } from "react";

const productosMock = [
  {
    id: 1,
    name: "Cubremochila Azul",
    price: 7990,
    image: "",
    colors: [{ name: "Azul", code: "#007BFF" }],
    stock: 10,
    is_active: true,
  },
  {
    id: 2,
    name: "Cubremochila Morado",
    price: 7990,
    image: "",
    colors: [{ name: "Morado", code: "#800080" }],
    stock: 10,
    is_active: true,
  },
];

export default function SalePage() {
  const { addToCart } = useCart();
  const [isCartOpen, setCartOpen] = useState(false);

  // Estado para cantidades por producto
  const [quantities, setQuantities] = useState(
    productosMock.reduce((acc, prod) => {
      acc[prod.id] = 1;
      return acc;
    }, {})
  );

  const handleQuantityChange = (id, delta, stock) => {
    setQuantities((prev) => {
      const newQty = Math.min(stock, Math.max(1, (prev[id] || 1) + delta));
      return { ...prev, [id]: newQty };
    });
  };

  const handleAddToCart = (product) => {
    const defaultColor = product.colors?.[0]?.code || null;
    const quantity = quantities[product.id] || 1;
    if (!defaultColor) return;

    addToCart({
      ...product,
      quantity,
      color: defaultColor,
    });
  };

  return (
    <div className="relative min-h-screen p-4 bg-gray-50">
      {/* Icono del carrito */}
      <div className="fixed top-4 right-4 z-50">
        <CartIcon onClick={() => setCartOpen(true)} />
      </div>

      {/* Sidebar del carrito */}
      <CartSidebar isOpen={isCartOpen} onClose={() => setCartOpen(false)} />

      {/* Título */}
      <h1 className="text-3xl font-bold text-orange-700 mb-6">
        Todos los productos
      </h1>

      {/* Grilla de productos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {productosMock.map((producto) => (
          <div
            key={producto.id}
            className="border rounded-lg p-4 shadow-sm bg-white hover:shadow-md transition"
          >
            <Image
              src={producto.image}
              alt={producto.name}
              width={300}
              height={300}
              className="rounded mb-3 mx-auto"
            />
            <h2 className="text-lg font-semibold text-gray-800">{producto.name}</h2>

            {/* Pelotitas de colores */}
            <div className="flex gap-2 my-2">
              {producto.colors.map((color, idx) => (
                <div
                  key={idx}
                  title={color.name}
                  className="w-5 h-5 rounded-full border border-gray-300"
                  style={{ backgroundColor: color.code }}
                />
              ))}
            </div>

            {/* Selector de cantidad */}
            <div className="flex items-center gap-2 my-2">
              <button
                onClick={() =>
                  handleQuantityChange(producto.id, -1, producto.stock)
                }
                className="w-8 h-8 flex items-center justify-center bg-gray-400 text-white text-lg rounded hover:bg-gray-600"              >
                −
              </button>
              <span className="text-gray-800 font-medium text-base w-6 text-center">{quantities[producto.id]}</span>
              <button
                onClick={() =>
                  handleQuantityChange(producto.id, 1, producto.stock)
                }
                className="w-8 h-8 flex items-center justify-center bg-gray-400 text-white text-lg rounded hover:bg-gray-600"
              >
                +
              </button>
            </div>

            {/* Precio */}
            <p className="text-orange-600 font-bold text-lg">
              ${new Intl.NumberFormat("es-CL").format(producto.price)}
            </p>

            {/* Botón agregar al carrito */}
            <button
              onClick={() => handleAddToCart(producto)}
              className="mt-3 w-full bg-orange-600 text-white py-1.5 rounded hover:bg-orange-700"
            >
              Agregar al carrito
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
