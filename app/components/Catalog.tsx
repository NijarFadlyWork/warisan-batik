"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, SlidersHorizontal } from "lucide-react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import { Product } from "@/app/types/product";
import ProductCard from "./ProductCard";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface CatalogProps {
  products: Product[];
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
  onAddToCart: (product: Product) => void;
  isLoggedIn: boolean;
}

const CATEGORIES = [
  "Semua",
  "Pria",
  "Wanita",
  "Kain",
  "Celana",
  "Sepatu",
];

const ITEMS_PER_PAGE = 8;

export default function Catalog({
  products,
  selectedCategory,
  onSelectCategory,
  onAddToCart,
  isLoggedIn,
}: CatalogProps) {
  const containerRef = useRef<HTMLElement>(null);

  const [currentPage, setCurrentPage] = useState(1);

  const filteredProducts =
    selectedCategory === "Semua"
      ? products
      : products.filter((product) => product.category === selectedCategory);

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory]);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;

  const currentProducts = filteredProducts.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  useGSAP(
    () => {
      gsap.fromTo(
        ".product-card-item",
        {
          y: 25,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.55,
          stagger: 0.06,
          ease: "power2.out",
        }
      );
    },
    {
      scope: containerRef,
      dependencies: [currentPage, selectedCategory],
    }
  );

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;

    setCurrentPage(page);

    containerRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <section
      ref={containerRef}
      id="katalog"
      className="mx-auto max-w-[1400px] scroll-mt-20 px-5 py-20 md:px-8 md:py-28 lg:px-10"
    >
      {/* HEADER */}
      <div className="border-b border-black/10 pb-8">
        <div className="flex flex-col justify-between gap-7 md:flex-row md:items-end">
          <div>
            <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.3em] text-[#8b4a2f]">
              The Collection
            </p>

            <h2 className="font-serif text-4xl font-medium tracking-tight text-[#171717] md:text-5xl">
              New Arrivals
            </h2>

            <p className="mt-3 text-sm text-[#77736d]">
              {filteredProducts.length} produk dalam koleksi Warisan.
            </p>
          </div>

          <button className="flex w-fit items-center gap-2 border-b border-black/30 pb-2 text-[10px] font-medium uppercase tracking-[0.2em] text-[#171717]">
            <SlidersHorizontal size={14} strokeWidth={1.3} />
            Filter & Sort
          </button>
        </div>

        {/* CATEGORIES */}
        <div className="mt-9 flex gap-6 overflow-x-auto pb-1 scrollbar-hide">
          {CATEGORIES.map((category) => (
            <button
              key={category}
              onClick={() => onSelectCategory(category)}
              className={`whitespace-nowrap border-b pb-2 text-[10px] font-medium uppercase tracking-[0.18em] transition ${
                selectedCategory === category
                  ? "border-[#171717] text-[#171717]"
                  : "border-transparent text-[#8a867f] hover:text-[#171717]"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* PRODUCTS */}
      <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-12 md:grid-cols-3 md:gap-x-6 lg:grid-cols-4 lg:gap-x-7 lg:gap-y-16">
        {currentProducts.map((product) => (
          <div key={product.id} className="product-card-item">
            <ProductCard
              product={product}
              onAddToCart={onAddToCart}
              isLoggedIn={isLoggedIn}
            />
          </div>
        ))}
      </div>

      {/* EMPTY */}
      {currentProducts.length === 0 && (
        <div className="py-24 text-center">
          <p className="font-serif text-2xl text-[#171717]">
            Tidak ada produk.
          </p>

          <p className="mt-2 text-sm text-[#77736d]">
            Coba pilih kategori lainnya.
          </p>
        </div>
      )}

      {/* PAGINATION */}
      {totalPages > 1 && (
        <div className="mt-20 flex items-center justify-center gap-2">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="flex h-10 w-10 items-center justify-center border border-black/10 text-[#171717] transition hover:border-black disabled:cursor-not-allowed disabled:opacity-30"
          >
            <ChevronLeft size={16} strokeWidth={1.3} />
          </button>

          {Array.from({ length: totalPages }, (_, index) => index + 1).map(
            (page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`flex h-10 w-10 items-center justify-center border text-[11px] transition ${
                  currentPage === page
                    ? "border-[#171717] bg-[#171717] text-white"
                    : "border-black/10 text-[#77736d] hover:border-black"
                }`}
              >
                {page}
              </button>
            )
          )}

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="flex h-10 w-10 items-center justify-center border border-black/10 text-[#171717] transition hover:border-black disabled:cursor-not-allowed disabled:opacity-30"
          >
            <ChevronRight size={16} strokeWidth={1.3} />
          </button>
        </div>
      )}
    </section>
  );
}