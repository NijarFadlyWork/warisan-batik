"use client";

import { Heart, ShoppingBag, Lock } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { Product } from "@/app/types/product";

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  isLoggedIn: boolean;
}

export default function ProductCard({ product, onAddToCart, isLoggedIn }: ProductCardProps) {
  const [liked, setLiked] = useState(false);

  const formattedPrice = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(product.price);

  return (
    <article className="group">
      <Link href={`/product/${product.id}`} className="block">
        <div className="relative aspect-[3/4] overflow-hidden bg-[#ebe7df]">
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover transition duration-700 ease-out group-hover:scale-[1.04]"
          />

          <span className="absolute left-4 top-4 bg-white/90 px-2.5 py-1.5 text-[9px] font-semibold uppercase tracking-[0.16em] text-[#171717] backdrop-blur-sm">
            {product.pattern}
          </span>

          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setLiked((prev) => !prev);
            }}
            aria-label="Wishlist"
            className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 backdrop-blur-sm transition hover:bg-white"
          >
            <Heart size={16} strokeWidth={1.4} className={liked ? "fill-[#8b4a2f] text-[#8b4a2f]" : "text-[#171717]"} />
          </button>

          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onAddToCart(product);
            }}
            className="absolute bottom-0 left-0 right-0 flex translate-y-full items-center justify-center gap-2 bg-[#171717] py-4 text-[10px] font-semibold uppercase tracking-[0.18em] text-white transition-transform duration-300 group-hover:translate-y-0"
          >
            {isLoggedIn ? (
              <>
                <ShoppingBag size={14} strokeWidth={1.5} />
                Tambah ke Keranjang
              </>
            ) : (
              <>
                <Lock size={13} strokeWidth={1.5} />
                Login untuk Membeli
              </>
            )}
          </button>
        </div>

        <div className="pt-4">
          <p className="text-[9px] font-medium uppercase tracking-[0.2em] text-[#8b4a2f]">
            {product.category}
          </p>
          <div className="mt-1 flex items-start justify-between gap-4">
            <h3 className="text-sm font-medium leading-5 text-[#171717]">{product.name}</h3>
            <span className="whitespace-nowrap text-xs font-medium text-[#171717]">{formattedPrice}</span>
          </div>
        </div>
      </Link>
    </article>
  );
}