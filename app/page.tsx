"use client";

import { useEffect, useState } from "react";
import { Product } from "./types/product";
import Hero from "./components/Hero";
import Catalog from "./components/Catalog";
import Story from "./components/Story";
import { useApp } from "./context/AppContext";

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("Semua");
  const { addToCart, user } = useApp();

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then(setProducts);
  }, []);

  return (
    <main>
      <Hero />
      <Catalog
        products={products}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        onAddToCart={addToCart}
        isLoggedIn={!!user}
      />
      <Story />
    </main>
  );
}