"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Story() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from(".story-left", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
        },
        x: -40,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });

      gsap.from(".story-right", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
        },
        x: 40,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      id="cerita"
      className="max-w-5xl mx-auto px-6 py-20 border-t border-stone-900 text-stone-300 overflow-hidden"
    >
      <div className="grid md:grid-cols-2 gap-10 items-center">
        <div className="story-left space-y-4">
          <span className="text-xs font-semibold text-amber-500 tracking-wider uppercase">
            Keaslian & Kualitas
          </span>
          <h2 className="text-3xl font-serif font-bold text-white">
            Bukan Sekadar Cetakan Mesin
          </h2>
          <p className="text-sm leading-relaxed text-stone-400">
            Setiap helai kain dikerjakan menggunakan canting dan lilin malam tradisional oleh para perajin di Surakarta dan Cirebon. Kami mempertahankan metode pewarnaan alami yang ramah lingkungan.
          </p>
          <ul className="text-xs space-y-2 pt-2 text-stone-300">
            <li className="flex items-center gap-2">
              <span className="text-amber-500">✓</span> 100% Katun Primisima & Sutra ATBM
            </li>
            <li className="flex items-center gap-2">
              <span className="text-amber-500">✓</span> Pewarna Alami Bebas Bahan Kimia Berbahaya
            </li>
            <li className="flex items-center gap-2">
              <span className="text-amber-500">✓</span> Pemberdayaan Perajin Komunitas Lokal
            </li>
          </ul>
        </div>

        <div className="story-right p-6 bg-stone-900 border border-stone-800 rounded-2xl">
          <blockquote className="italic font-serif text-stone-300 text-base leading-relaxed">
            "Batik adalah doa dan harapan yang dituliskan di atas kain. Memakainya adalah menjaga cerita leluhur tetap hidup."
          </blockquote>
          <p className="text-xs text-amber-500 mt-4 font-semibold uppercase tracking-wider">
            — Mbah Marto, Maestro Pembatik Pekalongan
          </p>
        </div>
      </div>
    </section>
  );
}