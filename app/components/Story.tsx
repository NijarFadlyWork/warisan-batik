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
      gsap.from(".story-content", {
        y: 40,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
        },
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      id="filosofi"
      className="scroll-mt-20 border-y border-black/10 bg-[#ebe7df]"
    >
      <div className="mx-auto max-w-[1400px] px-5 py-24 md:px-8 md:py-32 lg:px-10">
        <div className="story-content grid gap-12 md:grid-cols-[1fr_1.3fr] md:items-center lg:gap-24">
          {/* LABEL */}
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#8b4a2f]">
              Our Philosophy
            </p>

            <h2 className="mt-5 max-w-md font-serif text-4xl font-medium leading-[1.05] text-[#171717] md:text-6xl">
              Tradisi yang terus bergerak.
            </h2>
          </div>

          {/* CONTENT */}
          <div className="max-w-2xl">
            <p className="text-lg leading-8 text-[#4f4b45] md:text-xl md:leading-9">
              Batik bukan hanya sebuah motif. Ia adalah cerita tentang tempat,
              manusia, perjalanan, dan waktu.
            </p>

            <p className="mt-6 text-sm leading-7 text-[#77736d]">
              Warisan membawa teknik dan karakter batik Nusantara ke dalam
              bentuk yang lebih relevan untuk kehidupan modern. Setiap koleksi
              dibuat dengan perhatian terhadap detail, material, dan cerita di
              balik motifnya.
            </p>

            <div className="mt-10 grid grid-cols-3 gap-6 border-t border-black/10 pt-8">
              <div>
                <p className="font-serif text-2xl text-[#171717]">01</p>
                <p className="mt-2 text-[9px] uppercase tracking-[0.18em] text-[#77736d]">
                  Local Craft
                </p>
              </div>

              <div>
                <p className="font-serif text-2xl text-[#171717]">02</p>
                <p className="mt-2 text-[9px] uppercase tracking-[0.18em] text-[#77736d]">
                  Authentic Motif
                </p>
              </div>

              <div>
                <p className="font-serif text-2xl text-[#171717]">03</p>
                <p className="mt-2 text-[9px] uppercase tracking-[0.18em] text-[#77736d]">
                  Modern Form
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}