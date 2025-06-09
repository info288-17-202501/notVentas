"use client";

import Image from "next/image";
import CartIcon from "@/components/CartIcon";
import { useCart } from "@/context/CartContext";

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

  const handleAddToCart = (product) => {
    // Usa color por defecto y cantidad = 1
    const defaultColor = product.colors?.[0]?.code || null;
    if (!defaultColor) return;

    addToCart({
      ...product,
      quantity: 1,
      color: defaultColor,
    });
  };

  return (
    <div className="relative min-h-screen p-4 bg-gray-50">
      {/* Icono del carrito */}
      <div className="fixed top-4 right-4 z-50">
        <CartIcon onClick={() => console.log("Mostrar detalles del carrito")} />
      </div>

      {/* Título */}
      <h1 className="text-3xl font-bold text-orange-700 mb-6">Todos los productos</h1>

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
            <h2 className="text-lg font-semibold">{producto.name}</h2>
            <p className="text-orange-600 font-bold text-lg">
              ${new Intl.NumberFormat("es-CL").format(producto.price)}
            </p>
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
