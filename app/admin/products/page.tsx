"use client";

import { useEffect, useState } from "react";
import { Product } from "@/app/types/product";

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [form, setForm] = useState({
    name: "",
    category: "Pria",
    price: "",
    pattern: "",
    image: "",
    description: "",
  });

  const fetchProducts = async () => {
    setLoading(true);
    const res = await fetch("/api/admin/products");
    if (res.ok) setProducts(await res.json());
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setErrorMsg("");

    try {
      const res = await fetch("/api/admin/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Gagal menambahkan produk");

      setForm({ name: "", category: "Pria", price: "", pattern: "", image: "", description: "" });
      fetchProducts();
    } catch (err) {
      if (err instanceof Error) setErrorMsg(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f7f5f0] p-10">
      <h1 className="font-serif text-3xl text-[#171717]">Kelola Produk</h1>

      <form onSubmit={handleSubmit} className="mt-8 grid max-w-xl gap-4 border border-black/10 bg-white p-6">
        {errorMsg && <p className="text-xs text-red-600">{errorMsg}</p>}

        <input required placeholder="Nama produk" value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="border border-black/10 px-3 py-2 text-sm" />

        <select value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
          className="border border-black/10 px-3 py-2 text-sm">
          <option value="Pria">Pria</option>
          <option value="Wanita">Wanita</option>
          <option value="Kain">Kain</option>
          <option value="Celana">Celana</option>
          <option value="Sepatu">Sepatu</option>
        </select>

        <input required type="number" placeholder="Harga" value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
          className="border border-black/10 px-3 py-2 text-sm" />

        <input required placeholder="Pattern (misal: Parang)" value={form.pattern}
          onChange={(e) => setForm({ ...form, pattern: e.target.value })}
          className="border border-black/10 px-3 py-2 text-sm" />

        <input required placeholder="URL Gambar" value={form.image}
          onChange={(e) => setForm({ ...form, image: e.target.value })}
          className="border border-black/10 px-3 py-2 text-sm" />

        <textarea required placeholder="Deskripsi" rows={3} value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          className="border border-black/10 px-3 py-2 text-sm" />

        <button type="submit" disabled={submitting}
          className="bg-[#171717] px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-white disabled:opacity-50">
          {submitting ? "Menyimpan..." : "Tambah Produk"}
        </button>
      </form>

      <div className="mt-10">
        <h2 className="font-serif text-xl text-[#171717]">Daftar Produk ({products.length})</h2>
        {loading ? (
          <p className="mt-4 text-sm text-[#77736d]">Memuat...</p>
        ) : (
          <div className="mt-4 grid gap-3">
            {products.map((p) => (
              <div key={p.id} className="flex items-center justify-between border border-black/10 bg-white p-3 text-sm">
                <span>{p.name} — {p.category}</span>
                <span>Rp {p.price.toLocaleString("id-ID")}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}