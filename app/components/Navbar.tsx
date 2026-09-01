"use client";

import { ShoppingBag, User, LogOut, Sparkles } from "lucide-react";

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  user: { name: string; email: string } | null;
  onOpenAuth: () => void;
  onLogout: () => void;
}

export default function Navbar({
  cartCount,
  onOpenCart,
  user,
  onOpenAuth,
  onLogout,
}: NavbarProps) {
  return (
    <header className="sticky top-0 z-40 bg-[#070b14]/85 backdrop-blur-md border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-orange-600 to-amber-500 flex items-center justify-center text-white shadow-lg shadow-orange-500/20">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <span className="font-serif text-xl font-bold tracking-widest text-white uppercase block leading-none">
              Warisan
            </span>
            <span className="text-[10px] font-semibold text-orange-400 tracking-[0.25em] uppercase">
              Batik Nusantara
            </span>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-xs font-medium uppercase tracking-wider text-slate-300">
          <a href="#hero" className="hover:text-orange-400 transition-colors">
            Beranda
          </a>
          <a href="#katalog" className="hover:text-orange-400 transition-colors">
            Katalog
          </a>
          <a href="#filosofi" className="hover:text-orange-400 transition-colors">
            Filosofi
          </a>
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-4">
          {/* User Auth Info */}
          {user ? (
            <div className="flex items-center gap-3 bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-full">
              <div className="w-7 h-7 rounded-full bg-orange-600/20 border border-orange-500/40 flex items-center justify-center text-orange-400">
                <User className="w-3.5 h-3.5" />
              </div>
              <span className="text-xs font-medium text-slate-200 hidden sm:inline">
                {user.name}
              </span>
              <button
                onClick={onLogout}
                title="Keluar"
                className="text-slate-400 hover:text-rose-400 p-1 transition-colors"
              >
                <LogOut className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <button
              onClick={onOpenAuth}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-slate-800/80 hover:bg-slate-700 text-slate-200 border border-slate-700/60 transition"
            >
              <User className="w-4 h-4 text-orange-400" />
              <span>Masuk</span>
            </button>
          )}

          {/* Cart Trigger */}
          <button
            onClick={onOpenCart}
            className="relative p-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white transition shadow-lg shadow-orange-500/20 active:scale-95"
            aria-label="Keranjang Belanja"
          >
            <ShoppingBag className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-blue-600 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-[#070b14]">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}