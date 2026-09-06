"use client";

import { useEffect, useState } from "react";

interface AdminProduct {
  id: string;
  name: string;
  category: string;
  price: number;
  pattern: string;
  image: string;
  description: string;
  stock_product: number;
  inventoryId: string | null;
}

interface InventoryItem {
  id: string;
  name: string;
  category: string;
  stock_gudang: number;
}

export default function AdminProductsPage() {
  const [products, setProducts] = useState<AdminProduct[]>([]);
  const [inventoryItems, setInventoryItems] = useState<InventoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const [selectedInventoryId, setSelectedInventoryId] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState({ price: "", description: "" });

  const [stockInputs, setStockInputs] = useState<Record<string, string>>({});
  const [stockError, setStockError] = useState<Record<string, string>>({});

  const fetchData = async () => {
    setLoading(true);
    const [productsRes, inventoryRes] = await Promise.all([
      fetch("/api/admin/products"),
      fetch("/api/admin/inventory"),
    ]);
    if (productsRes.ok) setProducts(await productsRes.json());
    if (inventoryRes.ok) setInventoryItems(await inventoryRes.json());
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCreateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setErrorMsg("");

    try {
      const res = await fetch("/api/admin/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ inventoryId: selectedInventoryId, price, description }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Gagal menambahkan produk");

      setSelectedInventoryId("");
      setPrice("");
      setDescription("");
      fetchData();
    } catch (err) {
      if (err instanceof Error) setErrorMsg(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleEditClick = (product: AdminProduct) => {
    setEditingId(product.id);
    setEditForm({ price: String(product.price), description: product.description });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingId) return;
    setSubmitting(true);
    setErrorMsg("");

    try {
      const currentProduct = products.find((p) => p.id === editingId);
      const res = await fetch(`/api/admin/products/${editingId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: currentProduct?.name,
          category: currentProduct?.category,
          pattern: currentProduct?.pattern,
          image: currentProduct?.image,
          price: editForm.price,
          description: editForm.description,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Gagal menyimpan perubahan");

      setEditingId(null);
      fetchData();
    } catch (err) {
      if (err instanceof Error) setErrorMsg(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Yakin mau hapus produk ini?")) return;
    const res = await fetch(`/api/admin/products/${id}`, { method: "DELETE" });
    if (res.ok) fetchData();
    else alert("Gagal menghapus produk");
  };

  const handleAddStock = async (productId: string) => {
    const amount = stockInputs[productId];
    setStockError((prev) => ({ ...prev, [productId]: "" }));

    try {
      const res = await fetch(`/api/admin/products/${productId}/stock`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Gagal menambah stok");

      setStockInputs((prev) => ({ ...prev, [productId]: "" }));
      fetchData();
    } catch (err) {
      if (err instanceof Error) {
        setStockError((prev) => ({ ...prev, [productId]: err.message }));
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#f7f5f0] p-10">
      <h1 className="font-serif text-3xl text-[#171717]">Kelola Produk (Etalase)</h1>

      {editingId ? (
        <form onSubmit={handleEditSubmit} className="mt-8 grid max-w-xl gap-4 border border-black/10 bg-white p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#8b4a2f]">Edit Produk</p>
          {errorMsg && <p className="text-xs text-red-600">{errorMsg}</p>}

          <div>
            <label className="mb-1 block text-xs text-[#77736d]">Harga</label>
            <input required type="number" value={editForm.price}
              onChange={(e) => setEditForm({ ...editForm, price: e.target.value })}
              className="w-full border border-black/10 px-3 py-2 text-sm" />
          </div>

          <div>
            <label className="mb-1 block text-xs text-[#77736d]">Deskripsi</label>
            <textarea required rows={3} value={editForm.description}
              onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
              className="w-full border border-black/10 px-3 py-2 text-sm" />
          </div>

          <div className="flex gap-2">
            <button type="submit" disabled={submitting}
              className="flex-1 bg-[#171717] px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-white disabled:opacity-50">
              {submitting ? "Menyimpan..." : "Simpan Perubahan"}
            </button>
            <button type="button" onClick={() => setEditingId(null)}
              className="px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#171717] border border-black/10">
              Batal
            </button>
          </div>
        </form>
      ) : (
        <form onSubmit={handleCreateSubmit} className="mt-8 grid max-w-xl gap-4 border border-black/10 bg-white p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#8b4a2f]">Tambah Produk dari Gudang</p>
          {errorMsg && <p className="text-xs text-red-600">{errorMsg}</p>}

          <div>
            <label className="mb-1 block text-xs text-[#77736d]">Pilih Model dari Gudang</label>
            <select required value={selectedInventoryId}
              onChange={(e) => setSelectedInventoryId(e.target.value)}
              className="w-full border border-black/10 px-3 py-2 text-sm">
              <option value="">-- Pilih produk --</option>
              {inventoryItems.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name} ({item.category}) — Stok Gudang: {item.stock_gudang}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-1 block text-xs text-[#77736d]">Harga Jual</label>
            <input required type="number" placeholder="Harga" value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full border border-black/10 px-3 py-2 text-sm" />
          </div>

          <div>
            <label className="mb-1 block text-xs text-[#77736d]">Deskripsi</label>
            <textarea required rows={3} placeholder="Deskripsi produk" value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border border-black/10 px-3 py-2 text-sm" />
          </div>

          <button type="submit" disabled={submitting}
            className="bg-[#171717] px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-white disabled:opacity-50">
            {submitting ? "Menyimpan..." : "Tambah Produk"}
          </button>
        </form>
      )}

      <div className="mt-10">
        <h2 className="font-serif text-xl text-[#171717]">Daftar Produk ({products.length})</h2>
        {loading ? (
          <p className="mt-4 text-sm text-[#77736d]">Memuat...</p>
        ) : (
          <div className="mt-4 grid gap-3">
            {products.map((p) => (
              <div key={p.id} className="border border-black/10 bg-white p-3 text-sm">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img src={p.image} alt={p.name} className="h-12 w-12 object-cover" />
                    <div>
                      <p className="font-medium">{p.name}</p>
                      <p className="text-xs text-[#77736d]">
                        {p.category} · Rp {p.price.toLocaleString("id-ID")} · Stok Etalase: {p.stock_product}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button onClick={() => handleEditClick(p)}
                      className="border border-black/10 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#171717] hover:border-black">
                      Edit
                    </button>
                    <button onClick={() => handleDelete(p.id)}
                      className="border border-red-200 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-red-600 hover:border-red-600">
                      Hapus
                    </button>
                  </div>
                </div>

                <div className="mt-3 flex items-center gap-2 border-t border-black/5 pt-3">
                  <input
                    type="number"
                    placeholder="Jumlah tambah stok"
                    value={stockInputs[p.id] || ""}
                    onChange={(e) => setStockInputs((prev) => ({ ...prev, [p.id]: e.target.value }))}
                    className="w-40 border border-black/10 px-2 py-1.5 text-xs"
                  />
                  <button
                    onClick={() => handleAddStock(p.id)}
                    className="bg-[#8b4a2f] px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-white"
                  >
                    Tambah Stok
                  </button>
                  {stockError[p.id] && <span className="text-[10px] text-red-600">{stockError[p.id]}</span>}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}