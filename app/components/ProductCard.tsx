"use client";

import { ShoppingCart, Lock } from "lucide-react";
import { Product } from "@/app/types/product";

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  isLoggedIn: boolean;
}

export default function ProductCard({
  product,
  onAddToCart,
  isLoggedIn,
}: ProductCardProps) {
  const formattedPrice = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(product.price);

  return (
    <div className="group bg-[#0f172a]/70 border border-slate-800/80 rounded-2xl overflow-hidden flex flex-col hover:border-orange-500/50 hover:shadow-xl hover:shadow-orange-950/20 transition-all duration-300">
      {/* Image Container */}
      <div className="relative aspect-4/3 overflow-hidden bg-slate-950">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
        />
        <span className="absolute top-3 left-3 bg-[#070b14]/85 backdrop-blur-md border border-slate-700/80 text-orange-400 text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-md">
          {product.pattern}
        </span>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1 justify-between">
        <div>
          <div className="text-[11px] font-semibold text-orange-400/90 uppercase tracking-widest mb-1">
            {product.category}
          </div>
          <h3 className="font-serif font-semibold text-base md:text-lg text-slate-100 group-hover:text-orange-400 transition-colors line-clamp-1">
            {product.name}
          </h3>
          <p className="mt-2 text-xs text-slate-400 leading-relaxed line-clamp-2">
            {product.description}
          </p>
        </div>

        {/* Footer Card */}
        <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase text-slate-400 font-medium block">Harga</span>
            <span className="text-base font-bold text-orange-400 font-sans tracking-tight">
              {formattedPrice}
            </span>
          </div>

          <button
            onClick={() => onAddToCart(product)}
            className={`px-3.5 py-2 text-xs font-semibold rounded-xl transition flex items-center gap-1.5 ${
              isLoggedIn
                ? "bg-orange-500 hover:bg-orange-600 text-white shadow-md shadow-orange-950/40 active:scale-95 cursor-pointer"
                : "bg-slate-900 border border-slate-700/80 text-slate-400 hover:border-orange-500/60 hover:text-orange-300 cursor-pointer"
            }`}
          >
            {isLoggedIn ? (
              <>
                <ShoppingCart className="w-3.5 h-3.5" />
                <span>+ Keranjang</span>
              </>
            ) : (
              <>
                <Lock className="w-3.5 h-3.5 text-orange-400" />
                <span>Wajib Login</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}