"use client";

import { Heart, ShoppingBag, Lock, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Product } from "@/app/types/product";
import { useApp } from "@/app/context/AppContext";

export default function ProductDetailClient({ product }: { product: Product }) {
  const { addToCart, user } = useApp();
  const [liked, setLiked] = useState(false);

  const formattedPrice = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(product.price);

  return (
    <div className="mx-auto max-w-[1200px] px-5 py-14 md:px-8 lg:px-10">
      <Link
        href="/"
        className="mb-8 inline-flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.18em] text-[#171717] hover:text-[#8b4a2f]"
      >
        <ArrowLeft size={14} strokeWidth={1.5} />
        Kembali ke Katalog
      </Link>

      <div className="grid gap-10 md:grid-cols-2 md:gap-16">
        <div className="relative aspect-[3/4] overflow-hidden bg-[#ebe7df]">
          <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
          <span className="absolute left-4 top-4 bg-white/90 px-2.5 py-1.5 text-[9px] font-semibold uppercase tracking-[0.16em] text-[#171717] backdrop-blur-sm">
            {product.pattern}
          </span>
          <button
            onClick={() => setLiked((prev) => !prev)}
            aria-label="Wishlist"
            className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 backdrop-blur-sm transition hover:bg-white"
          >
            <Heart size={16} strokeWidth={1.4} className={liked ? "fill-[#8b4a2f] text-[#8b4a2f]" : "text-[#171717]"} />
          </button>
        </div>

        <div>
          <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#8b4a2f]">
            {product.category}
          </p>
          <h1 className="mt-3 font-serif text-3xl font-medium text-[#171717] md:text-4xl">
            {product.name}
          </h1>
          <p className="mt-4 text-xl font-medium text-[#171717]">{formattedPrice}</p>
          <p className="mt-6 text-sm leading-7 text-[#77736d]">{product.description}</p>

          <button
            onClick={() => addToCart(product)}
            className="mt-8 flex w-full items-center justify-center gap-2 bg-[#171717] py-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-white transition hover:bg-[#2a2a2a] md:w-auto md:px-10"
          >
            {user ? (
              <>
                <ShoppingBag size={16} strokeWidth={1.5} />
                Tambah ke Keranjang
              </>
            ) : (
              <>
                <Lock size={14} strokeWidth={1.5} />
                Login untuk Membeli
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}