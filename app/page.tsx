"use client";

import { useState } from "react";
import { PRODUCTS } from "./data/products";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Catalog from "./components/Catalog";
import Story from "./components/Story";
import Footer from "./components/Footer";

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<string>("Semua");
  const [cartCount, setCartCount] = useState<number>(0);

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 selection:bg-amber-700 selection:text-white font-sans">
      <Navbar
        cartCount={cartCount}
        onResetCart={() => setCartCount(0)}
      />
      <main>
        <Hero />
        <Catalog
          products={PRODUCTS}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          onAddToCart={() => setCartCount((prev) => prev + 1)}
        />
        <Story />
      </main>
      <Footer />
    </div>
  );
}