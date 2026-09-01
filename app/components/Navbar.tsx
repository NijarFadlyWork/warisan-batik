"use client";

import {
  ShoppingBag,
  User,
  LogOut,
  Search,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";

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
  const [mobileOpen, setMobileOpen] = useState(false);

  const closeMobile = () => setMobileOpen(false);

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-black/10 bg-[#f7f5f0]/95 backdrop-blur-md">
        <div className="mx-auto flex h-[76px] max-w-[1400px] items-center justify-between px-5 md:px-8 lg:px-10">
          {/* LOGO */}
          <a
            href="#hero"
            className="group flex flex-col leading-none"
            onClick={closeMobile}
          >
            <span className="font-serif text-[22px] font-semibold tracking-[0.18em] text-[#171717]">
              WARISAN
            </span>

            <span className="mt-1 text-[9px] font-medium tracking-[0.35em] text-[#8b4a2f]">
              BATIK NUSANTARA
            </span>
          </a>

          {/* DESKTOP NAV */}
          <nav className="hidden items-center gap-9 md:flex">
            <a
              href="#hero"
              className="text-[11px] font-medium uppercase tracking-[0.16em] text-[#171717] transition-colors hover:text-[#8b4a2f]"
            >
              Beranda
            </a>

            <a
              href="#katalog"
              className="text-[11px] font-medium uppercase tracking-[0.16em] text-[#171717] transition-colors hover:text-[#8b4a2f]"
            >
              Koleksi
            </a>

            <a
              href="#filosofi"
              className="text-[11px] font-medium uppercase tracking-[0.16em] text-[#171717] transition-colors hover:text-[#8b4a2f]"
            >
              Filosofi
            </a>
          </nav>

          {/* ACTIONS */}
          <div className="flex items-center gap-2 md:gap-4">
            <button
              aria-label="Cari"
              className="hidden p-2 text-[#171717] transition hover:text-[#8b4a2f] sm:block"
            >
              <Search size={19} strokeWidth={1.5} />
            </button>

            {/* USER */}
            {user ? (
              <div className="hidden items-center gap-2 sm:flex">
                <div className="flex h-8 w-8 items-center justify-center rounded-full border border-black/10">
                  <User size={14} strokeWidth={1.5} />
                </div>

                <span className="max-w-[100px] truncate text-[11px] font-medium">
                  {user.name}
                </span>

                <button
                  onClick={onLogout}
                  title="Keluar"
                  className="p-1 text-[#777] transition hover:text-red-700"
                >
                  <LogOut size={14} strokeWidth={1.5} />
                </button>
              </div>
            ) : (
              <button
                onClick={onOpenAuth}
                className="hidden text-[11px] font-medium uppercase tracking-[0.12em] text-[#171717] transition hover:text-[#8b4a2f] sm:block"
              >
                Masuk
              </button>
            )}

            {/* CART */}
            <button
              onClick={onOpenCart}
              aria-label="Keranjang Belanja"
              className="relative p-2 text-[#171717] transition hover:text-[#8b4a2f]"
            >
              <ShoppingBag size={20} strokeWidth={1.5} />

              {cartCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-[17px] min-w-[17px] items-center justify-center rounded-full bg-[#8b4a2f] px-1 text-[9px] font-semibold text-white">
                  {cartCount}
                </span>
              )}
            </button>

            {/* MOBILE MENU */}
            <button
              onClick={() => setMobileOpen((prev) => !prev)}
              className="p-2 md:hidden"
              aria-label="Menu"
            >
              {mobileOpen ? (
                <X size={21} strokeWidth={1.5} />
              ) : (
                <Menu size={21} strokeWidth={1.5} />
              )}
            </button>
          </div>
        </div>

        {/* MOBILE MENU */}
        {mobileOpen && (
          <div className="border-t border-black/10 bg-[#f7f5f0] md:hidden">
            <nav className="flex flex-col px-6 py-6">
              <a
                href="#hero"
                onClick={closeMobile}
                className="border-b border-black/10 py-4 text-xs uppercase tracking-[0.18em]"
              >
                Beranda
              </a>

              <a
                href="#katalog"
                onClick={closeMobile}
                className="border-b border-black/10 py-4 text-xs uppercase tracking-[0.18em]"
              >
                Koleksi
              </a>

              <a
                href="#filosofi"
                onClick={closeMobile}
                className="border-b border-black/10 py-4 text-xs uppercase tracking-[0.18em]"
              >
                Filosofi
              </a>

              {!user ? (
                <button
                  onClick={() => {
                    closeMobile();
                    onOpenAuth();
                  }}
                  className="py-4 text-left text-xs uppercase tracking-[0.18em]"
                >
                  Masuk
                </button>
              ) : (
                <button
                  onClick={() => {
                    closeMobile();
                    onLogout();
                  }}
                  className="py-4 text-left text-xs uppercase tracking-[0.18em] text-red-700"
                >
                  Keluar
                </button>
              )}
            </nav>
          </div>
        )}
      </header>
    </>
  );
}