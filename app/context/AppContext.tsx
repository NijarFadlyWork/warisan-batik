"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { useRouter } from "next/navigation";
import { Product, CartItem } from "@/app/types/product";

interface User {
  name: string;
  email: string;
  role?: string;
}

interface AppContextType {
  cart: CartItem[];
  user: User | null;
  isCartOpen: boolean;
  isAuthOpen: boolean;
  isPaymentOpen: boolean;
  authNotice: string;
  addToCart: (product: Product) => void;
  updateQuantity: (productId: string, delta: number) => void;
  removeItem: (productId: string) => void;
  openCart: () => void;
  closeCart: () => void;
  openAuth: () => void;
  closeAuth: () => void;
  openPayment: () => void;
  closePayment: () => void;
  handleLoginSuccess: (user: User) => void;
  handleLogout: () => void;
  clearCart: () => void;
}

const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [authNotice, setAuthNotice] = useState("");

  const addToCart = (product: Product) => {
    if (!user) {
      setAuthNotice("Silakan masuk terlebih dahulu untuk menambahkan produk ke keranjang belanja.");
      setIsAuthOpen(true);
      return;
    }
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const updateQuantity = (productId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const removeItem = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== productId));
  };

  const openCart = () => {
    if (!user) {
      setAuthNotice("Silakan login untuk melihat keranjang Anda.");
      setIsAuthOpen(true);
    } else {
      setIsCartOpen(true);
    }
  };

  const closeCart = () => setIsCartOpen(false);

  const openAuth = () => {
    setAuthNotice("");
    setIsAuthOpen(true);
  };

  const closeAuth = () => setIsAuthOpen(false);
  const openPayment = () => setIsPaymentOpen(true);
  const closePayment = () => setIsPaymentOpen(false);

  const handleLoginSuccess = (loggedUser: User) => {
    setUser(loggedUser);
    setAuthNotice("");
    if (loggedUser.role === "ADMIN") {
      router.push("/admin");
    }
  };

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    setUser(null);
    setCart([]);
  };

  const clearCart = () => setCart([]);

  return (
    <AppContext.Provider
      value={{
        cart, user, isCartOpen, isAuthOpen, isPaymentOpen, authNotice,
        addToCart, updateQuantity, removeItem,
        openCart, closeCart, openAuth, closeAuth, openPayment, closePayment,
        handleLoginSuccess, handleLogout, clearCart,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp harus dipakai di dalam AppProvider");
  return ctx;
}