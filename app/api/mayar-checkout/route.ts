import { NextResponse } from "next/server";
import { CartItem } from "@/app/types/product";

export async function POST(req: Request) {
  try {
    const { cart, user } = await req.json();

    const apiKey = process.env.MAYAR_API_KEY?.trim();

    if (!apiKey) {
      return NextResponse.json(
        { message: "MAYAR_API_KEY belum terpasang di .env.local" },
        { status: 401 }
      );
    }

    if (!cart || cart.length === 0 || !user) {
      return NextResponse.json(
        { message: "Data keranjang atau user tidak valid" },
        { status: 400 }
      );
    }

    const totalAmount = cart.reduce(
      (sum: number, item: CartItem) => sum + item.price * item.quantity,
      0
    );

    const description = cart
      .map((item: CartItem) => `${item.name} (${item.quantity}x)`)
      .join(", ")
      .slice(0, 200);

    // Ganti ke https://api.sandbox.mayar.id jika menggunakan akun sandbox
    const MAYAR_ENDPOINT = "https://api.mayar.id/hl/v1/payment/create";

    const payload = {
      name: user.name || "Customer Batik",
      email: user.email,
      amount: Math.round(totalAmount),
      description: `Batik: ${description}`,
      mobile: "081234567890",
      redirectUrl: "http://localhost:3000",
    };

    const response = await fetch("https://api.mayar.id/hl/v1/payment/create", {
  method: "POST",
  headers: {
    "api-key": apiKey,                 // Sebagian endpoint Mayar menggunakan header ini
    "Authorization": `Bearer ${apiKey}`, // Fallback standar
    "Content-Type": "application/json",
    "Accept": "application/json",
  },
  body: JSON.stringify(payload),
});

    const data = await response.json();

    console.log("MAYAR STATUS:", response.status);
    console.log("MAYAR RESPONSE BODY:", JSON.stringify(data, null, 2));

    if (!response.ok || !data.data?.link) {
      return NextResponse.json(
        {
          message:
            data.messages ||
            data.message ||
            "Gagal membuat transaksi di Mayar (401)",
        },
        { status: response.status }
      );
    }

    return NextResponse.json({
      status: "success",
      paymentUrl: data.data.link,
    });
  } catch (error: unknown) {
    console.error("Server Checkout Error:", error);
    return NextResponse.json(
      { message: "Terjadi kesalahan pada server checkout" },
      { status: 500 }
    );
  }
}