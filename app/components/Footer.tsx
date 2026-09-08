export default function Footer() {
  return (
    <footer className="bg-[#171717] text-white">
      <div className="mx-auto max-w-[1400px] px-5 py-16 md:px-8 lg:px-10">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* BRAND */}
          <div className="lg:col-span-2">
            <h3 className="font-serif text-3xl tracking-[0.12em]">
              GORGA
            </h3>

            <p className="mt-2 text-[9px] uppercase tracking-[0.35em] text-white/45">
              PULANG BAWA CERITA
            </p>

            <p className="mt-7 max-w-sm text-sm leading-7 text-white/60">
              Membawa cerita warisan Nusantara ke dalam bentuk yang baru.
            </p>
          </div>

          {/* SHOP */}
          <div>
            <p className="text-[9px] font-semibold uppercase tracking-[0.25em] text-white/40">
              Shop
            </p>

            <div className="mt-5 flex flex-col gap-3">
              <a
                href="#katalog"
                className="text-sm text-white/70 transition hover:text-white"
              >
                Semua Koleksi
              </a>

              <a
                href="#katalog"
                className="text-sm text-white/70 transition hover:text-white"
              >
                Pria
              </a>

              <a
                href="#katalog"
                className="text-sm text-white/70 transition hover:text-white"
              >
                Wanita
              </a>

              <a
                href="#katalog"
                className="text-sm text-white/70 transition hover:text-white"
              >
                Kain
              </a>
            </div>
          </div>

          {/* INFO */}
          <div>
            <p className="text-[9px] font-semibold uppercase tracking-[0.25em] text-white/40">
              Information
            </p>

            <div className="mt-5 flex flex-col gap-3">
              <a
                href="#filosofi"
                className="text-sm text-white/70 transition hover:text-white"
              >
                Filosofi
              </a>

              <a
                href="#hero"
                className="text-sm text-white/70 transition hover:text-white"
              >
                Tentang Warisan
              </a>

              <span className="text-sm text-white/70">
                Bandung, Indonesia
              </span>
            </div>
          </div>
        </div>

        {/* LEGAL & PRODUCTION */}
        <div className="mt-16">
          {/* GARIS ATAS */}
          <div className="border-t border-white/10" />

          <div className="grid grid-cols-1 gap-8 py-8 md:grid-cols-2">
            {/* PENASIHAT HUKUM */}
            <div>
              <p className="text-[9px] font-semibold uppercase tracking-[0.3em] text-white/40">
                Penasihat Hukum
              </p>

              <p className="mt-4 text-sm text-white/70">
                Lamsihar MP Rumahorbo, S.H & Partner
              </p>
            </div>

            {/* DESAIN & PRODUKSI */}
            <div>
              <p className="text-[9px] font-semibold uppercase tracking-[0.3em] text-white/40">
                Desain & Produksi
              </p>

              <p className="mt-4 text-sm text-white/70">
                Gorga_Indonesia
              </p>
            </div>
          </div>

          {/* GARIS BAWAH */}
          <div className="border-t border-white/10" />
        </div>

        {/* COPYRIGHT */}
        <div className="pt-6">
          <p className="text-[10px] uppercase tracking-[0.15em] text-white/35">
            © {new Date().getFullYear()} WARISAN BATIK. ALL RIGHTS RESERVED.
          </p>
        </div>
      </div>
    </footer>
  );
}