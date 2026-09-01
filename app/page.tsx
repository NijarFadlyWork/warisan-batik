"use client";

import { useState } from "react";
import { Product, CartItem } from "./types/product";
import { PRODUCTS } from "./data/products";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Catalog from "./components/Catalog";
import Story from "./components/Story";
import Footer from "./components/Footer";
import CartDrawer from "./components/CartDrawer";
import AuthModal from "./components/AuthModal";
import PaymentModal from "./components/PaymentModal";

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<string>("Semua");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isAuthOpen, setIsAuthOpen] = useState<boolean>(false);
  const [isPaymentOpen, setIsPaymentOpen] = useState<boolean>(false);
  const [authNotice, setAuthNotice] = useState<string>("");
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);

  const handleAddToCart = (product: Product) => {
    if (!user) {
      setAuthNotice("Silakan masuk terlebih dahulu untuk menambahkan produk ke keranjang belanja.");
      setIsAuthOpen(true);
      return;
    }

    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const handleOpenAuthManual = () => {
    setAuthNotice("");
    setIsAuthOpen(true);
  };

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    setUser(null);
    setCart([]);
  };

  const handleUpdateQuantity = (productId: number, delta: number) => {
    setCart((prevCart) =>
      prevCart
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

  const handleRemoveItem = (productId: number) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 selection:bg-amber-700 selection:text-white font-sans">
      <Navbar
        cartCount={cart.reduce((sum, item) => sum + item.quantity, 0)}
        onOpenCart={() => {
          if (!user) {
            setAuthNotice("Silakan login untuk melihat keranjang Anda.");
            setIsAuthOpen(true);
          } else {
            setIsCartOpen(true);
          }
        }}
        user={user}
        onOpenAuth={handleOpenAuthManual}
        onLogout={handleLogout}
      />

      <main>
        <Hero />
        <Catalog
          products={PRODUCTS}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          onAddToCart={handleAddToCart}
          isLoggedIn={!!user}
        />
        <Story />
      </main>

      <Footer />

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        user={user}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onOpenPaymentModal={() => setIsPaymentOpen(true)}
      />

      {/* Modal Autentikasi */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        noticeMessage={authNotice}
        onSuccess={(loggedUser) => {
          setUser(loggedUser);
          setAuthNotice("");
        }}
      />

      {/* Modal Pembayaran QRIS / VA */}
      <PaymentModal
        isOpen={isPaymentOpen}
        onClose={() => setIsPaymentOpen(false)}
        cart={cart}
        user={user}
        onPaymentSuccess={() => setCart([])}
      />
    </div>
  );
}