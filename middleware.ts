import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

const secret = new TextEncoder().encode(process.env.JWT_SECRET);

export const config = {
  matcher: ["/admin/:path*"],
};

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("auth_token")?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  try {
    const { payload } = await jwtVerify(token, secret);
    const role = payload.role as string;
    const { pathname } = req.nextUrl;

    // Halaman gudang cuma buat role GUDANG
    if (pathname.startsWith("/admin/gudang")) {
      if (role !== "GUDANG") {
        return NextResponse.redirect(new URL("/", req.url));
      }
      return NextResponse.next();
    }

    // Halaman produk (etalase) cuma buat role ADMIN
    if (pathname.startsWith("/admin/products")) {
      if (role !== "ADMIN") {
        return NextResponse.redirect(new URL("/", req.url));
      }
      return NextResponse.next();
    }

    // Akses /admin polos → lempar otomatis ke halaman sesuai role-nya
    if (role === "ADMIN") {
      return NextResponse.redirect(new URL("/admin/products", req.url));
    }
    if (role === "GUDANG") {
      return NextResponse.redirect(new URL("/admin/gudang", req.url));
    }

    return NextResponse.redirect(new URL("/", req.url));
  } catch {
    return NextResponse.redirect(new URL("/", req.url));
  }
}