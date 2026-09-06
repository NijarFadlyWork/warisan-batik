"use client";

import { useEffect, useState } from "react";

interface InventoryItem {
  id: string;
  name: string;
  category: string;
  price: number;
  pattern: string;
  image: string;
  description: string;
  warna: string;
  desain: string;
  model: string;
  stock_gudang: number;
}

const EMPTY_FORM = {
  name: "",
  category: "Pria",
  price: "",
  pattern: "",
  image: "",
  description: "",
  warna: "",
  desain: "Depan",
  model: "Lengan Pendek",
  stock_gudang: "",
};

export default function AdminGudangPage() {
  const [items, setItems] = useState<InventoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [form, setForm] = useState(EMPTY_FORM);

  const fetchItems = async () => {
    setLoading(true);
    const res = await fetch("/api/admin/inventory");
    if (res.ok) setItems(await res.json());
    setLoading(false);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setErrorMsg("");

    try {
      const res = await fetch("/api/admin/inventory", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Gagal menambahkan data gudang");

      setForm(EMPTY_FORM);
      fetchItems();
    } catch (err) {
      if (err instanceof Error) setErrorMsg(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f7f5f0] p-10">
      <h1 className="font-serif text-3xl text-[#171717]">Panel Gudang</h1>
      <p className="mt-2 text-sm text-[#77736d]">Kelola data stok produk di gudang.</p>

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

        <input required placeholder="Warna (misal: Navy, Coklat Sogan)" value={form.warna}
          onChange={(e) => setForm({ ...form, warna: e.target.value })}
          className="border border-black/10 px-3 py-2 text-sm" />

        <div>
          <label className="mb-1 block text-xs text-[#77736d]">Desain</label>
          <select required value={form.desain}
            onChange={(e) => setForm({ ...form, desain: e.target.value })}
            className="w-full border border-black/10 px-3 py-2 text-sm">
            <option value="Depan">Depan</option>
            <option value="Belakang">Belakang</option>
            <option value="Depan Belakang">Depan Belakang</option>
          </select>
        </div>

        <div>
          <label className="mb-1 block text-xs text-[#77736d]">Model</label>
          <select required value={form.model}
            onChange={(e) => setForm({ ...form, model: e.target.value })}
            className="w-full border border-black/10 px-3 py-2 text-sm">
            <option value="Lengan Pendek">Lengan Pendek</option>
            <option value="Lengan Panjang">Lengan Panjang</option>
          </select>
        </div>

        <input required type="number" placeholder="Stok Gudang" value={form.stock_gudang}
          onChange={(e) => setForm({ ...form, stock_gudang: e.target.value })}
          className="border border-black/10 px-3 py-2 text-sm" />

        <button type="submit" disabled={submitting}
          className="bg-[#171717] px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-white disabled:opacity-50">
          {submitting ? "Menyimpan..." : "Tambah ke Gudang"}
        </button>
      </form>

      <div className="mt-10">
        <h2 className="font-serif text-xl text-[#171717]">Isi Gudang ({items.length})</h2>
        {loading ? (
          <p className="mt-4 text-sm text-[#77736d]">Memuat...</p>
        ) : (
          <div className="mt-4 grid gap-3">
            {items.map((item) => (
              <div key={item.id} className="flex items-center justify-between border border-black/10 bg-white p-3 text-sm">
                <div className="flex items-center gap-3">
                  <img src={item.image} alt={item.name} className="h-12 w-12 object-cover" />
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-xs text-[#77736d]">
                      {item.category} · {item.warna} · {item.desain} · {item.model} · Rp {item.price.toLocaleString("id-ID")}
                    </p>
                  </div>
                </div>
                <span className="text-xs font-semibold text-[#8b4a2f]">
                  Stok: {item.stock_gudang}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}