"use client";

import { ReactNode } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import CartDrawer from "./CartDrawer";
import AuthModal from "./AuthModal";
import PaymentModal from "./PaymentModal";
import { useApp } from "../context/AppContext";

export default function AppShell({ children }: { children: ReactNode }) {
  const {
    cart, user, isCartOpen, isAuthOpen, isPaymentOpen, authNotice,
    openCart, closeCart, openAuth, closeAuth, closePayment,
    updateQuantity, removeItem, handleLoginSuccess, handleLogout, clearCart, openPayment,
  } = useApp();

  return (
    <>
      <Navbar
        cartCount={cart.reduce((sum, item) => sum + item.quantity, 0)}
        onOpenCart={openCart}
        user={user}
        onOpenAuth={openAuth}
        onLogout={handleLogout}
      />

      {children}

      <Footer />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={closeCart}
        cart={cart}
        user={user}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeItem}
        onOpenPaymentModal={openPayment}
      />

      <AuthModal
        isOpen={isAuthOpen}
        onClose={closeAuth}
        noticeMessage={authNotice}
        onSuccess={handleLoginSuccess}
      />

      <PaymentModal
        isOpen={isPaymentOpen}
        onClose={closePayment}
        cart={cart}
        user={user}
        onPaymentSuccess={clearCart}
      />
    </>
  );
}