"use client";

import { useState } from "react";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (user: { name: string; email: string }) => void;
  noticeMessage?: string;
}

export default function AuthModal({
  isOpen,
  onClose,
  onSuccess,
  noticeMessage,
}: AuthModalProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setLoading(true);

    const endpoint = isLogin ? "/api/auth/login" : "/api/auth/register";

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Gagal memproses permintaan");
      }

      if (isLogin) {
        onSuccess(data.user);
        onClose();
      } else {
        setIsLogin(true);
        setErrorMsg("Akun berhasil dibuat! Silakan masuk.");
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setErrorMsg(err.message);
      } else {
        setErrorMsg("Terjadi kesalahan");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="relative w-full max-w-md bg-stone-900 border border-stone-800 rounded-2xl p-6 shadow-2xl text-stone-100">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-stone-400 hover:text-white"
        >
          ✕
        </button>

        {/* Banner Peringatan Wajib Login */}
        {noticeMessage && (
          <div className="mb-4 p-3 rounded-xl bg-amber-950/60 border border-amber-800/80 text-amber-300 text-xs flex items-center gap-2">
            <span className="text-base">⚠️</span>
            <span>{noticeMessage}</span>
          </div>
        )}

        <h3 className="text-xl font-serif font-bold text-white mb-2">
          {isLogin ? "Masuk ke Akun" : "Daftar Akun Baru"}
        </h3>
        <p className="text-xs text-stone-400 mb-6">
          {isLogin
            ? "Akses keranjang pesanan dan katalog eksklusif."
            : "Lengkapi data diri untuk mulai memesan batik autentik."}
        </p>

        {errorMsg && (
          <div className="mb-4 p-3 rounded-lg bg-rose-950/50 border border-rose-800 text-rose-300 text-xs">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div>
              <label className="block text-xs text-stone-400 mb-1">Nama Lengkap</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-stone-950 border border-stone-800 rounded-lg px-3.5 py-2 text-sm text-white focus:border-amber-600 focus:outline-none"
                placeholder="cth. Arya Sena"
              />
            </div>
          )}

          <div>
            <label className="block text-xs text-stone-400 mb-1">Email</label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full bg-stone-950 border border-stone-800 rounded-lg px-3.5 py-2 text-sm text-white focus:border-amber-600 focus:outline-none"
              placeholder="nama@email.com"
            />
          </div>

          <div>
            <label className="block text-xs text-stone-400 mb-1">Kata Sandi</label>
            <input
              type="password"
              required
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full bg-stone-950 border border-stone-800 rounded-lg px-3.5 py-2 text-sm text-white focus:border-amber-600 focus:outline-none"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 bg-amber-600 hover:bg-amber-500 font-semibold text-white rounded-lg text-sm transition mt-2 disabled:opacity-50"
          >
            {loading ? "Memproses..." : isLogin ? "Masuk" : "Daftar"}
          </button>
        </form>

        <div className="mt-6 text-center text-xs text-stone-400">
          {isLogin ? "Belum punya akun?" : "Sudah punya akun?"}{" "}
          <button
            type="button"
            onClick={() => {
              setIsLogin(!isLogin);
              setErrorMsg("");
            }}
            className="text-amber-500 hover:underline font-semibold"
          >
            {isLogin ? "Daftar Sekarang" : "Masuk di sini"}
          </button>
        </div>
      </div>
    </div>
  );
}