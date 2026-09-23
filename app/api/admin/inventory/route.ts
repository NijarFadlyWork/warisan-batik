import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";
import { verifyJwtToken } from "@/app/lib/auth";

function getAuthorized(req: Request) {
  const cookie = req.headers.get("cookie") || "";
  const token = cookie.match(/auth_token=([^;]+)/)?.[1];
  if (!token) return null;
  const payload = verifyJwtToken(token);
  return payload?.role === "ADMIN" || payload?.role === "GUDANG" ? payload : null;
}

export async function GET(req: Request) {
  if (!getAuthorized(req)) {
    return NextResponse.json({ message: "Akses ditolak" }, { status: 403 });
  }
  const items = await prisma.inventory.findMany({ orderBy: { createdAt: "desc" } });
  return NextResponse.json(items);
}

export async function POST(req: Request) {
  if (!getAuthorized(req)) {
    return NextResponse.json({ message: "Akses ditolak" }, { status: 403 });
  }

  const {
    name, category, price, pattern, image, description,
    warna, desain, model, kode_wilayah, kode_jenis, kode_design, stock_gudang,
  } = await req.json();

  if (
    !name || !category || !price || !pattern || !image || !description ||
    !warna || !desain || !model || !kode_wilayah || !kode_jenis || !kode_design
  ) {
    return NextResponse.json({ message: "Semua kolom wajib diisi" }, { status: 400 });
  }

  const kode_barang = `${kode_wilayah}-${kode_jenis}-${kode_design}`;

  const item = await prisma.inventory.create({
    data: {
      name,
      category,
      price: Number(price),
      pattern,
      image,
      description,
      warna,
      desain,
      model,
      kode_wilayah,
      kode_jenis,
      kode_design,
      kode_barang,
      stock_gudang: Number(stock_gudang) || 0,
    },
  });

  return NextResponse.json({ status: "success", item });
}