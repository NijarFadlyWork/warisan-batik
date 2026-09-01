"use client";

import { useState } from "react";
import { CartItem } from "@/app/types/product";

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  user: { name: string; email: string } | null;
  onPaymentSuccess: () => void;
}

export default function PaymentModal({
  isOpen,
  onClose,
  cart,
  user,
  onPaymentSuccess,
}: PaymentModalProps) {
  const [method, setMethod] = useState<"qris" | "bca_va">("qris");
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen || !user) return null;

  const totalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const formattedTotal = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(totalAmount);

  // Generate nomor VA simulasi berdasarkan ID user / tanggal
  const dummyVaNumber = `80777${Date.now().toString().slice(-8)}`;

  const handleSimulateSuccess = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      onPaymentSuccess();
      onClose();
      alert("✅ Pembayaran Berhasil Dikonfirmasi! Pesanan batik Anda sedang diproses oleh pengrajin.");
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="relative w-full max-w-lg bg-stone-900 border border-stone-800 rounded-2xl p-6 shadow-2xl text-stone-100">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-stone-400 hover:text-white"
        >
          ✕
        </button>

        {/* Header */}
        <div className="flex items-center gap-2 mb-4">
          <span className="text-xl">💳</span>
          <h3 className="text-xl font-serif font-bold text-white">Pembayaran Pesanan</h3>
        </div>

        {/* Info Ringkasan */}
        <div className="bg-stone-950 p-4 rounded-xl border border-stone-800/80 mb-5 flex justify-between items-center">
          <div>
            <p className="text-xs text-stone-400">Total Pembayaran</p>
            <p className="text-lg font-bold text-amber-500 font-mono">{formattedTotal}</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-stone-400">Atas Nama</p>
            <p className="text-xs font-semibold text-stone-200">{user.name}</p>
          </div>
        </div>

        {/* Pilihan Metode */}
        <div className="grid grid-cols-2 gap-2 mb-5">
          <button
            type="button"
            onClick={() => setMethod("qris")}
            className={`py-2.5 px-3 rounded-lg border text-xs font-semibold transition ${
              method === "qris"
                ? "border-amber-500 bg-amber-950/40 text-amber-300"
                : "border-stone-800 bg-stone-950 text-stone-400 hover:border-stone-700"
            }`}
          >
            QRIS (Semua E-Wallet)
          </button>
          <button
            type="button"
            onClick={() => setMethod("bca_va")}
            className={`py-2.5 px-3 rounded-lg border text-xs font-semibold transition ${
              method === "bca_va"
                ? "border-amber-500 bg-amber-950/40 text-amber-300"
                : "border-stone-800 bg-stone-950 text-stone-400 hover:border-stone-700"
            }`}
          >
            BCA Virtual Account
          </button>
        </div>

        {/* Konten Metode Bayar */}
        <div className="bg-stone-950/80 p-5 rounded-xl border border-stone-800 flex flex-col items-center justify-center text-center">
          {method === "qris" ? (
            <div className="space-y-3">
              <div className="bg-white p-3 rounded-xl inline-block shadow-md">
                {/* Dummy QR Code menggunakan placeholder SVG */}
                <img
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=WARISAN-BATIK-${totalAmount}`}
                  alt="QRIS Code"
                  className="w-40 h-40 object-contain mx-auto"
                />
              </div>
              <p className="text-xs text-stone-400">
                Buka aplikasi BCA Mobile, GoPay, OVO, atau ShopeePay dan scan kode QR di atas.
              </p>
            </div>
          ) : (
            <div className="space-y-3 w-full text-left">
              <div>
                <span className="text-xs text-stone-400">Nomor Virtual Account BCA:</span>
                <div className="flex items-center justify-between bg-stone-900 border border-stone-800 px-3.5 py-2.5 rounded-lg mt-1">
                  <span className="font-mono text-base font-bold text-amber-400 tracking-wider">
                    {dummyVaNumber}
                  </span>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(dummyVaNumber);
                      alert("Nomor VA disalin!");
                    }}
                    className="text-xs bg-stone-800 hover:bg-stone-700 text-stone-200 px-2.5 py-1 rounded transition"
                  >
                    Salin
                  </button>
                </div>
              </div>
              <ul className="text-[11px] text-stone-400 list-disc list-inside space-y-1 pt-1">
                <li>Buka m-BCA $\rightarrow$ m-Transfer $\rightarrow$ BCA Virtual Account.</li>
                <li>Masukkan nomor VA di atas dan konfirmasi pembayaran.</li>
              </ul>
            </div>
          )}
        </div>

        {/* Action Button */}
        <button
          onClick={handleSimulateSuccess}
          disabled={isProcessing}
          className="mt-6 w-full py-3 rounded-xl bg-amber-600 hover:bg-amber-500 active:scale-[0.99] text-white font-semibold text-sm transition disabled:opacity-50 flex items-center justify-center gap-2 shadow-lg shadow-amber-950"
        >
          {isProcessing ? "Memverifikasi Pembayaran..." : "Saya Sudah Bayar 🚀"}
        </button>
      </div>
    </div>
  );
}