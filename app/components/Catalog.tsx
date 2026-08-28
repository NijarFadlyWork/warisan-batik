import { Product } from "@/app/types/product";
import ProductCard from "./ProductCard";

interface CatalogProps {
  products: Product[];
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
  onAddToCart: () => void;
}

const CATEGORIES = ["Semua", "Pria", "Wanita", "Kain"];

export default function Catalog({
  products,
  selectedCategory,
  onSelectCategory,
  onAddToCart,
}: CatalogProps) {
  const filteredProducts =
    selectedCategory === "Semua"
      ? products
      : products.filter((p) => p.category === selectedCategory);

  return (
    <section id="katalog" className="max-w-7xl mx-auto px-6 py-16 border-t border-stone-900">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
        <div>
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-white">
            Koleksi Eksklusif
          </h2>
          <p className="text-stone-400 text-sm mt-1">
            Pilihan busana siap pakai dan kain pola warisan budaya.
          </p>
        </div>

        <div className="flex gap-2 p-1 bg-stone-900 border border-stone-800 rounded-lg w-fit">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => onSelectCategory(cat)}
              className={`px-4 py-1.5 text-xs font-medium rounded-md transition ${
                selectedCategory === cat
                  ? "bg-amber-600 text-white shadow"
                  : "text-stone-400 hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={onAddToCart}
          />
        ))}
      </div>
    </section>
  );
}