import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";
import { verifyJwtToken } from "@/app/lib/auth";

function getAdmin(req: Request) {
  const cookie = req.headers.get("cookie") || "";
  const token = cookie.match(/auth_token=([^;]+)/)?.[1];
  if (!token) return null;
  const payload = verifyJwtToken(token);
  return payload?.role === "ADMIN" ? payload : null;
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!getAdmin(req)) {
    return NextResponse.json({ message: "Akses ditolak" }, { status: 403 });
  }

  const { id } = await params;
  const { amount } = await req.json();
  const jumlah = Number(amount);

  if (!jumlah || jumlah <= 0) {
    return NextResponse.json({ message: "Jumlah harus lebih dari 0" }, { status: 400 });
  }

  const product = await prisma.product.findUnique({ where: { id } });

  if (!product) {
    return NextResponse.json({ message: "Produk tidak ditemukan" }, { status: 404 });
  }

  if (!product.inventoryId) {
    return NextResponse.json({ message: "Produk ini tidak terhubung ke data gudang" }, { status: 400 });
  }

  const inventoryItem = await prisma.inventory.findUnique({ where: { id: product.inventoryId } });

  if (!inventoryItem) {
    return NextResponse.json({ message: "Data gudang tidak ditemukan" }, { status: 404 });
  }

  if (inventoryItem.stock_gudang < jumlah) {
    return NextResponse.json(
      { message: `Stok gudang tidak cukup (tersisa ${inventoryItem.stock_gudang})` },
      { status: 400 }
    );
  }

  const [updatedProduct] = await prisma.$transaction([
    prisma.product.update({
      where: { id },
      data: { stock_product: { increment: jumlah } },
    }),
    prisma.inventory.update({
      where: { id: product.inventoryId },
      data: { stock_gudang: { decrement: jumlah } },
    }),
  ]);

  return NextResponse.json({ status: "success", product: updatedProduct });
}