"use client";

import { ArrowDown, ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-[calc(100vh-76px)] overflow-hidden bg-[#eeeae2]"
    >
      {/* IMAGE */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=1800&q=90"
          alt="Koleksi Warisan Batik"
          className="h-full w-full object-cover object-center"
        />

        <div className="absolute inset-0 bg-black/20" />

        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/10" />
      </div>

      {/* CONTENT */}
      <div className="relative flex min-h-[calc(100vh-76px)] items-end">
        <div className="mx-auto w-full max-w-[1400px] px-6 pb-16 md:px-10 md:pb-20 lg:pb-24">
          <div className="max-w-xl text-white">
            <p className="mb-5 text-[10px] font-medium uppercase tracking-[0.35em]">
              Koleksi Terbaru · 2026
            </p>

            <h1 className="font-serif text-5xl font-medium leading-[0.95] tracking-tight md:text-7xl lg:text-8xl">
              Heritage
              <br />
              <span className="italic">Reimagined.</span>
            </h1>

            <p className="mt-6 max-w-md text-sm leading-7 text-white/85 md:text-base">
              Warisan batik Nusantara yang diterjemahkan ke dalam siluet
              modern untuk kehidupan hari ini.
            </p>

            <a
              href="#katalog"
              className="mt-8 inline-flex items-center gap-4 border border-white bg-white px-6 py-3.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#171717] transition hover:bg-transparent hover:text-white"
            >
              Jelajahi Koleksi
              <ArrowRight size={15} strokeWidth={1.5} />
            </a>
          </div>
        </div>
      </div>

      {/* SCROLL */}
      <a
        href="#katalog"
        className="absolute bottom-7 right-6 hidden items-center gap-3 text-white/80 md:flex"
      >
        <span className="text-[9px] uppercase tracking-[0.3em]">
          Scroll
        </span>
        <ArrowDown size={15} strokeWidth={1} />
      </a>
    </section>
  );
}