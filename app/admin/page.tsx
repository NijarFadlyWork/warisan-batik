import Link from "next/link";

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-[#f7f5f0] p-10">
      <h1 className="font-serif text-3xl text-[#171717]">Admin Dashboard</h1>
      <p className="mt-2 text-sm text-[#77736d]">Kelola produk Warisan Batik.</p>
      <Link
        href="/admin/products"
        className="mt-8 inline-block bg-[#171717] px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-white"
      >
        Kelola Produk
      </Link>
    </div>
  );
}