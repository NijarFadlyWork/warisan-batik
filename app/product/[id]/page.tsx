import { prisma } from "@/app/lib/prisma";
import { notFound } from "next/navigation";
import ProductDetailClient from "./ProductDetailClient";
import { Product } from "@/app/types/product";

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await prisma.product.findUnique({ where: { id } });

  if (!product) {
    notFound();
  }

  return (
    <ProductDetailClient
      product={{ ...product, category: product.category as Product["category"] }}
    />
  );
}