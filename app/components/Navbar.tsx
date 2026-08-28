interface NavbarProps {
  cartCount: number;
  onResetCart: () => void;
}

export default function Navbar({ cartCount, onResetCart }: NavbarProps) {
  return (
    <nav className="sticky top-0 z-50 backdrop-blur-md bg-stone-950/80 border-b border-stone-800">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="h-4 w-4 bg-amber-600 rounded-full inline-block" />
          <span className="text-xl font-serif font-bold tracking-wider text-amber-500">
            WARISAN.
          </span>
        </div>

        <div className="flex items-center gap-6">
          <a href="#katalog" className="text-sm text-stone-300 hover:text-amber-400 transition">
            Katalog
          </a>
          <a href="#cerita" className="text-sm text-stone-300 hover:text-amber-400 transition">
            Filosofi
          </a>
          <button
            onClick={onResetCart}
            className="p-2 bg-stone-900 border border-stone-800 rounded-lg hover:border-amber-600 transition"
            title="Reset Keranjang"
          >
            <span className="text-xs font-semibold px-2 py-0.5 bg-amber-600 text-white rounded-full">
              🛒 {cartCount}
            </span>
          </button>
        </div>
      </div>
    </nav>
  );
}