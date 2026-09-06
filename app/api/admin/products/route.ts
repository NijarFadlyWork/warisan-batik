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

export async function GET(req: Request) {
  if (!getAdmin(req)) {
    return NextResponse.json({ message: "Akses ditolak" }, { status: 403 });
  }
  const products = await prisma.product.findMany({ orderBy: { createdAt: "desc" } });
  return NextResponse.json(products);
}

export async function POST(req: Request) {
  if (!getAdmin(req)) {
    return NextResponse.json({ message: "Akses ditolak" }, { status: 403 });
  }

  const { inventoryId, price, description } = await req.json();

  if (!inventoryId || !price || !description) {
    return NextResponse.json({ message: "Semua kolom wajib diisi" }, { status: 400 });
  }

  const inventoryItem = await prisma.inventory.findUnique({ where: { id: inventoryId } });

  if (!inventoryItem) {
    return NextResponse.json({ message: "Data gudang tidak ditemukan" }, { status: 404 });
  }

  const product = await prisma.product.create({
    data: {
      name: inventoryItem.name,
      category: inventoryItem.category,
      pattern: inventoryItem.pattern,
      image: inventoryItem.image,
      price: Number(price),
      description,
      inventoryId: inventoryItem.id,
    },
  });

  return NextResponse.json({ status: "success", product });
}