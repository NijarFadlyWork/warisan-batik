import { prisma } from "@/app/lib/prisma";

export default async function GudangPage() {
  const items = await prisma.inventory.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div className="mx-auto max-w-[1200px] px-5 py-16 md:px-8 lg:px-10">
      <h1 className="font-serif text-3xl text-[#171717] md:text-4xl">Data Gudang</h1>
      <p className="mt-2 text-sm text-[#77736d]">{items.length} item tersimpan di gudang.</p>

      <div className="mt-10 grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
        {items.map((item) => (
          <div key={item.id} className="border border-black/10 bg-white p-3">
            <div className="aspect-[3/4] overflow-hidden bg-[#ebe7df]">
              <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
            </div>
            <p className="mt-3 text-[9px] font-medium uppercase tracking-[0.2em] text-[#8b4a2f]">
              {item.category}
            </p>
            <h3 className="mt-1 text-sm font-medium text-[#171717]">{item.name}</h3>
            <p className="mt-1 text-xs text-[#77736d]">
              {item.warna} · {item.desain} · {item.model}
            </p>
            <p className="mt-1 text-xs text-[#77736d]">
              Rp {item.price.toLocaleString("id-ID")}
            </p>
            <p className="mt-1 text-xs font-semibold text-[#8b4a2f]">
              Stok: {item.stock_gudang}
            </p>
          </div>
        ))}
      </div>

      {items.length === 0 && (
        <p className="mt-10 text-sm text-[#77736d]">Belum ada data di gudang.</p>
      )}
    </div>
  );
}