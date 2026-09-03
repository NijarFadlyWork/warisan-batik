"use client";

import { CartItem } from "@/app/types/product";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  user: { name: string; email: string } | null;
  onUpdateQuantity: (productId: string, delta: number) => void;
  onRemoveItem: (productId: string) => void;
  onOpenPaymentModal: () => void;
}

export default function CartDrawer({
  isOpen,
  onClose,
  cart,
  user,
  onUpdateQuantity,
  onRemoveItem,
  onOpenPaymentModal,
}: CartDrawerProps) {
  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const formatRupiah = (num: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(num);
  };

  return (
    <>
      <div
        onClick={onClose}
        className={`fixed inset-0 z-50 bg-black/70 backdrop-blur-xs transition-opacity duration-300 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      />

      <aside
        className={`fixed top-0 right-0 z-50 h-full w-full max-w-md bg-stone-900 border-l border-stone-800 flex flex-col shadow-2xl transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-5 border-b border-stone-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-lg">🛒</span>
            <h2 className="text-base font-serif font-bold text-white">Keranjang Pesanan</h2>
            <span className="text-xs bg-amber-950 text-amber-400 px-2 py-0.5 rounded-full border border-amber-800/60 font-semibold">
              {cart.reduce((sum, item) => sum + item.quantity, 0)} item
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-stone-400 hover:text-white hover:bg-stone-800 transition"
          >
            ✕
          </button>
        </div>

        {/* Daftar Barang */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center text-stone-500 py-12">
              <span className="text-4xl mb-3">🧺</span>
              <p className="text-sm font-medium text-stone-400">Keranjang masih kosong</p>
            </div>
          ) : (
            cart.map((item) => (
              <div
                key={item.id}
                className="flex gap-3 p-3 bg-stone-950/60 rounded-xl border border-stone-800/70"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded-lg bg-stone-900"
                />
                <div className="flex-1 flex flex-col justify-between">
                  <div className="flex justify-between items-start gap-2">
                    <div>
                      <h4 className="text-sm font-semibold text-stone-100 line-clamp-1">
                        {item.name}
                      </h4>
                      <span className="text-[11px] text-amber-500 font-mono">
                        {formatRupiah(item.price)}
                      </span>
                    </div>
                    <button
                      onClick={() => onRemoveItem(item.id)}
                      className="text-stone-500 hover:text-rose-400 text-xs transition"
                    >
                      🗑
                    </button>
                  </div>

                  <div className="flex items-center gap-2 mt-2">
                    <div className="flex items-center border border-stone-700 bg-stone-900 rounded-lg">
                      <button
                        onClick={() => onUpdateQuantity(item.id, -1)}
                        className="px-2 py-0.5 text-xs text-stone-400 hover:text-white"
                      >
                        -
                      </button>
                      <span className="px-2 text-xs font-mono text-stone-200">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(item.id, 1)}
                        className="px-2 py-0.5 text-xs text-stone-400 hover:text-white"
                      >
                        +
                      </button>
                    </div>
                    <span className="text-xs text-stone-400 font-mono ml-auto">
                      {formatRupiah(item.price * item.quantity)}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Drawer */}
        {cart.length > 0 && (
          <div className="p-5 border-t border-stone-800 bg-stone-950/60 space-y-4">
            <div className="flex justify-between items-center text-sm">
              <span className="text-stone-400">Total Pembayaran</span>
              <span className="text-lg font-bold text-amber-500 font-mono">
                {formatRupiah(totalPrice)}
              </span>
            </div>

            <button
              onClick={() => {
                onClose();
                onOpenPaymentModal();
              }}
              className="w-full py-3 px-4 rounded-xl bg-amber-600 hover:bg-amber-500 active:scale-[0.99] text-white font-semibold text-sm transition flex items-center justify-center gap-2 shadow-lg shadow-amber-950"
            >
              Lanjut Pembayaran (QRIS / VA) 💳
            </button>
          </div>
        )}
      </aside>
    </>
  );
}