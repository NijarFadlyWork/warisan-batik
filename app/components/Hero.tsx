"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const orb1Ref = useRef<HTMLDivElement>(null);
  const orb2Ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Timeline dengan ScrollTrigger bolak-balik
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 60%", // Mulai animasi saat bagian atas Hero mencapai 60% viewport
          end: "bottom top", // Berakhir saat bagian bawah Hero keluar dari atas viewport
          toggleActions: "play reverse play reverse", // Animasi aktif saat scroll bawah maupun atas
        },
        defaults: { ease: "power4.out" },
      });

      // 1. Efek glow ambient
      tl.from(".ambient-orb", {
        scale: 0.4,
        opacity: 0,
        duration: 1.2,
        stagger: 0.2,
        ease: "power2.out",
      })
        // 2. Badge reveal
        .from(
          ".hero-badge",
          {
            y: -25,
            opacity: 0,
            duration: 0.7,
          },
          "-=0.9"
        )
        // 3. Reveal judul per baris
        .from(
          ".hero-line-inner",
          {
            yPercent: 120,
            rotateZ: 3,
            duration: 0.9,
            stagger: 0.12,
          },
          "-=0.5"
        )
        // 4. Deskripsi & CTA button
        .from(
          ".hero-desc",
          {
            y: 30,
            opacity: 0,
            duration: 0.8,
          },
          "-=0.6"
        )
        .from(
          ".hero-btn",
          {
            scale: 0.85,
            opacity: 0,
            stagger: 0.12,
            duration: 0.6,
            ease: "back.out(1.7)",
          },
          "-=0.5"
        );
    },
    { scope: containerRef }
  );

  // Parallax interaktif mengikuti kursor mouse
  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    gsap.to(orb1Ref.current, {
      x: x * 0.08,
      y: y * 0.08,
      duration: 1.2,
      ease: "power1.out",
    });

    gsap.to(orb2Ref.current, {
      x: -x * 0.05,
      y: -y * 0.05,
      duration: 1.5,
      ease: "power1.out",
    });
  };

  return (
    <header
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative px-6 py-28 md:py-36 max-w-5xl mx-auto text-center flex flex-col items-center overflow-hidden"
    >
      {/* Background Ambient Glows */}
      <div
        ref={orb1Ref}
        className="ambient-orb pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 w-96 h-96 bg-amber-600/20 rounded-full blur-3xl"
      />
      <div
        ref={orb2Ref}
        className="ambient-orb pointer-events-none absolute top-40 -left-20 w-80 h-80 bg-amber-900/20 rounded-full blur-3xl"
      />

      {/* Badge */}
      <div className="hero-badge mb-6">
        <span className="px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-amber-400 bg-amber-950/40 border border-amber-800/60 rounded-full backdrop-blur-md shadow-inner">
          Mahakarya Wastra Nusantara
        </span>
      </div>

      {/* Masked Title Reveal */}
      <h1 className="text-4xl md:text-7xl font-serif font-bold tracking-tight text-stone-50 leading-[1.15]">
        <div className="overflow-hidden">
          <span className="hero-line-inner inline-block">
            Sentuhan Tradisi Luhur
          </span>
        </div>
        <div className="overflow-hidden">
          <span className="hero-line-inner inline-block text-amber-500 italic">
            dalam Gaya Modern
          </span>
        </div>
      </h1>

      {/* Description */}
      <p className="hero-desc mt-8 text-base md:text-lg text-stone-400 max-w-2xl leading-relaxed">
        Koleksi batik autentik yang dirancang presisi oleh perajin lokal.
        Menggabungkan estetika motif kuno dengan siluet kontemporer berkelas.
      </p>

      {/* Action Buttons */}
      <div className="mt-10 flex flex-wrap gap-4 justify-center">
        <a
          href="#katalog"
          className="hero-btn group relative px-7 py-3.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-medium text-sm transition-all duration-300 shadow-xl shadow-amber-950/50 hover:shadow-amber-900/70"
        >
          <span>Lihat Koleksi</span>
          <span className="inline-block transition-transform duration-300 group-hover:translate-x-1 ml-1.5">
            →
          </span>
        </a>
        <a
          href="#cerita"
          className="hero-btn px-7 py-3.5 rounded-xl bg-stone-900/80 hover:bg-stone-800 border border-stone-800 text-stone-300 hover:text-white font-medium text-sm backdrop-blur-sm transition-all duration-300"
        >
          Tentang Pengrajin
        </a>
      </div>
    </header>
  );
}