"use client";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";

export default function ProductCard({ product }) {
  const [expanded, setExpanded] = useState(false);
  const cardRef = useRef();

  // Cierra el panel si se hace clic fuera de la tarjeta
  useEffect(() => {
    function handleClickOutside(event) {
      if (cardRef.current && !cardRef.current.contains(event.target)) {
        setExpanded(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleToggle = () => {
    setExpanded((prev) => !prev);
  };

  return (
    <div
      ref={cardRef}
      onClick={handleToggle}
      className="bg-white shadow-md rounded-2xl overflow-hidden cursor-pointer hover:shadow-lg transition-shadow duration-300"
    >
      <Image
        src={product.image}
        alt={product.name}
        width={300}
        height={200}
        className="w-full h-80 object-cover"
      />
      <div className="p-4">
        <h2 className="text-xl font-semibold text-orange-700">{product.name}</h2>
        <p className="text-gray-700">{product.description}</p>
        <p className="text-gray-600 font-bold mt-2">{product.price}</p>

        {/* Contenido expandible con animación */}
        <div
          className={`transition-all duration-300 overflow-hidden ${
            expanded ? "max-h-40 mt-4" : "max-h-0"
          }`}
        >
          <div className="text-sm text-gray-600">
            <p>✔️ Material impermeable</p>
            <p>✔️ Costuras reforzadas</p>
            <p>✔️ Tallas disponibles: M, L, XL</p>
          </div>
        </div>
      </div>
    </div>
  );
}
