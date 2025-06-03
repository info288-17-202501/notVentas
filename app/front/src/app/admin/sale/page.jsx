// app/sale/page.tsx
import Image from "next/image";
import { ShoppingCart } from "lucide-react";

const productosMock = [
  {
    id: 1,
    name: "Cubremochila Azul",
    price: 7990,
    image: "/images/azulRosa.jpeg",
  },
  {
    id: 2,
    name: "Cubremochila Morado",
    price: 7990,
    image: "/imges/moradoNaranjo.jpeg",
  },
  {
    id: 3,
    name: "Cubremochila Morado",
    price: 7990,
    image: "/imges/moradoNaranjo.jpeg",
  },
];

export default function SalePage() {
  const productos = productosMock;
  const cantidadEnCarro = 3; // Valor fijo por ahora

  return (
    <div className="relative min-h-screen p-4 bg-gray-50">
      {/* Icono carrito */}
      <div className="fixed top-4 right-4 z-50 cursor-pointer">
        <div className="relative">
          <ShoppingCart className="w-8 h-8 text-orange-700" />
          <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {cantidadEnCarro}
          </span>
        </div>
      </div>

      {/* Título */}
      <h1 className="text-3xl font-bold text-orange-700 mb-6">Todos los productos</h1>

      {/* Grilla de productos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {productos.map((producto) => (
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
            <button className="mt-3 w-full bg-orange-600 text-white py-1.5 rounded hover:bg-orange-700">
              Agregar al carrito
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
