"use client";

import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, Layers } from "lucide-react";
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

const CATEGORIES = ["Semua", "Pria", "Wanita", "Kain", "Celana", "Sepatu"];
const ITEMS_PER_PAGE = 6;

export default function Catalog({
  products,
  selectedCategory,
  onSelectCategory,
  onAddToCart,
  isLoggedIn,
}: CatalogProps) {
  const containerRef = useRef<HTMLElement>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const filteredProducts =
    selectedCategory === "Semua"
      ? products
      : products.filter((p) => p.category === selectedCategory);

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
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.45,
          stagger: 0.06,
          ease: "power2.out",
        }
      );
    },
    { scope: containerRef, dependencies: [currentPage, selectedCategory] }
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    if (containerRef.current) {
      containerRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section
      ref={containerRef}
      id="katalog"
      className="max-w-7xl mx-auto px-6 py-20 border-t border-slate-800/60"
    >
      {/* Header & Tabs */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-orange-400 uppercase tracking-widest mb-2">
            <Layers className="w-4 h-4" />
            <span>Koleksi Wastra Nusantara</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-white tracking-tight">
            Katalog Eksklusif
          </h2>
          <p className="text-slate-400 text-sm mt-1">
            Menampilkan {filteredProducts.length} pilihan busana autentik.
          </p>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap gap-1.5 p-1.5 bg-[#070b14] border border-slate-800 rounded-2xl w-fit">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => onSelectCategory(cat)}
              className={`px-4 py-2 text-xs font-semibold rounded-xl transition ${
                selectedCategory === cat
                  ? "bg-orange-500 text-white shadow-md shadow-orange-950"
                  : "text-slate-400 hover:text-white hover:bg-slate-800/60"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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

      {/* Pagination Nav */}
      {totalPages > 1 && (
        <div className="mt-14 flex items-center justify-center gap-2">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="p-2.5 rounded-xl border border-slate-800 bg-[#0f172a] text-slate-300 hover:border-orange-500 hover:text-orange-400 disabled:opacity-30 disabled:hover:border-slate-800 transition flex items-center justify-center"
            aria-label="Previous Page"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
            <button
              key={pageNum}
              onClick={() => handlePageChange(pageNum)}
              className={`w-10 h-10 text-xs font-bold rounded-xl border transition ${
                currentPage === pageNum
                  ? "bg-orange-500 border-orange-400 text-white shadow-lg shadow-orange-950/50"
                  : "bg-[#0f172a] border-slate-800 text-slate-400 hover:border-slate-700 hover:text-white"
              }`}
            >
              {pageNum}
            </button>
          ))}

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="p-2.5 rounded-xl border border-slate-800 bg-[#0f172a] text-slate-300 hover:border-orange-500 hover:text-orange-400 disabled:opacity-30 disabled:hover:border-slate-800 transition flex items-center justify-center"
            aria-label="Next Page"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </section>
  );
}