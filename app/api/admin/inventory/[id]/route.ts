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

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!getAuthorized(req)) {
    return NextResponse.json({ message: "Akses ditolak" }, { status: 403 });
  }

  const { id } = await params;
  const { name, category, price, pattern, image, description, warna, desain, model, stock_gudang } = await req.json();

  if (!name || !category || !price || !pattern || !image || !description || !warna || !desain || !model) {
    return NextResponse.json({ message: "Semua kolom wajib diisi" }, { status: 400 });
  }

  const item = await prisma.inventory.update({
    where: { id },
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
      stock_gudang: Number(stock_gudang) || 0,
    },
  });

  return NextResponse.json({ status: "success", item });
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!getAuthorized(req)) {
    return NextResponse.json({ message: "Akses ditolak" }, { status: 403 });
  }

  const { id } = await params;

  const linkedProduct = await prisma.product.findFirst({ where: { inventoryId: id } });
  if (linkedProduct) {
    return NextResponse.json(
      { message: "Tidak bisa dihapus — data ini masih dipakai oleh produk di etalase" },
      { status: 400 }
    );
  }

  await prisma.inventory.delete({ where: { id } });
  return NextResponse.json({ status: "success" });
}