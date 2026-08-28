import { Product } from "@/app/types/product";

interface ProductCardProps {
  product: Product;
  onAddToCart: () => void;
}

export default function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const formattedPrice = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(product.price);

  return (
    <div className="group bg-stone-900/60 border border-stone-800/80 rounded-xl overflow-hidden flex flex-col hover:border-amber-700/50 transition-all duration-300">
      <div className="relative aspect-4/3 overflow-hidden bg-stone-950">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
        />
        <span className="absolute top-3 left-3 bg-stone-950/80 backdrop-blur-sm border border-stone-800 text-amber-400 text-[10px] font-semibold tracking-wider uppercase px-2.5 py-1 rounded">
          {product.pattern}
        </span>
      </div>

      <div className="p-5 flex flex-col flex-1 justify-between">
        <div>
          <div className="text-xs text-stone-500 font-medium uppercase tracking-wider mb-1">
            {product.category}
          </div>
          <h3 className="font-serif font-semibold text-lg text-stone-100 group-hover:text-amber-400 transition">
            {product.name}
          </h3>
          <p className="mt-2 text-xs text-stone-400 leading-relaxed line-clamp-2">
            {product.description}
          </p>
        </div>

        <div className="mt-6 pt-4 border-t border-stone-800/60 flex items-center justify-between">
          <span className="text-base font-bold text-amber-500 font-mono">
            {formattedPrice}
          </span>
          <button
            onClick={onAddToCart}
            className="px-3.5 py-2 text-xs font-semibold bg-stone-800 hover:bg-amber-600 text-stone-200 hover:text-white rounded-lg transition"
          >
            + Keranjang
          </button>
        </div>
      </div>
    </div>
  );
}