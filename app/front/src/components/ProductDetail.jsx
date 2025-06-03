"use client";

import { useState } from "react";
import Image from "next/image";

export default function ProductDetailCard({ product, onAddToCart }) {
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0]?.code || null);

  const handleIncrement = () => {
    if (quantity < product.stock) setQuantity(quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const handleAddToCart = () => {
    if (!selectedColor) return;
    onAddToCart({ ...product, quantity, color: selectedColor });
  };

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-6 flex flex-col md:flex-row gap-6">
      <div className="flex-1">
        <Image
          src={product.image}
          alt={product.name}
          width={400}
          height={400}
          className="rounded-xl w-full h-auto object-cover"
        />
      </div>

      <div className="flex-1 space-y-4">
        <h1 className="text-3xl font-bold text-orange-700">{product.name}</h1>
        <p className="text-gray-600">{product.description}</p>
        <p className="text-2xl font-bold text-gray-800">
          {new Intl.NumberFormat("es-CL", {
            style: "currency",
            currency: "CLP",
          }).format(product.price)}
        </p>

        {/* Colores */}
        {product.colors && product.colors.length > 0 && (
          <div>
            <p className="text-sm text-gray-600 mb-1">Colores disponibles:</p>
            <div className="flex gap-2">
              {product.colors.map((color, idx) => (
                <button
                  key={idx}
                  className={`w-6 h-6 rounded-full border-2 ${
                    selectedColor === color.code ? "ring-2 ring-orange-500" : ""
                  }`}
                  style={{ backgroundColor: color.code }}
                  title={color.name}
                  onClick={() => setSelectedColor(color.code)}
                />
              ))}
            </div>
          </div>
        )}

        {/* Cantidad */}
        <div className="flex items-center gap-3 mt-4">
          <button
            onClick={handleDecrement}
            className="w-8 h-8 rounded-full border text-xl text-gray-700 hover:bg-gray-200"
          >
            -
          </button>
          <span className="text-xl font-semibold">{quantity}</span>
          <button
            onClick={handleIncrement}
            className="w-8 h-8 rounded-full border text-xl text-gray-700 hover:bg-gray-200"
          >
            +
          </button>
        </div>

        {/* Stock */}
        <p className="text-sm text-gray-500">Stock disponible: {product.stock}</p>

        {/* Botón */}
        <button
          onClick={handleAddToCart}
          disabled={!product.is_active || product.stock < 1}
          className="bg-orange-600 text-white px-4 py-2 rounded-lg mt-4 hover:bg-orange-700 disabled:opacity-50"
        >
          Agregar al carrito
        </button>
      </div>
    </div>
  );
}
