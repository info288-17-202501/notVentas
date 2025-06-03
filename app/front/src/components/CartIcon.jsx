"use client";

import { ShoppingCart } from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function CartIcon({ onClick }) {
  const { totalCount } = useCart();

  return (
    <div className="relative cursor-pointer" onClick={onClick}>
      <ShoppingCart className="w-8 h-8 text-orange-700" />
      {totalCount > 0 && (
        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
          {totalCount}
        </span>
      )}
    </div>
  );
}
