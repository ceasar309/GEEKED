import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    const product = await prisma.product.findFirst({
      where: {
        OR: [{ id }, { slug: id }],
      },
      include: {
        category: { select: { id: true, name: true, slug: true } },
        images: { orderBy: { order: "asc" } },
      },
    });

    if (!product) {
      return NextResponse.json(
        { error: "Product not found" },
        { status: 404 }
      );
    }

    const reviews = await prisma.review.findMany({
      where: { productId: product.id },
      include: { user: { select: { name: true, image: true } } },
      orderBy: { createdAt: "desc" },
    });

    const related = await prisma.product.findMany({
      where: {
        categoryId: product.categoryId,
        id: { not: product.id },
      },
      take: 4,
      include: {
        images: { orderBy: { order: "asc" }, take: 1 },
      },
    });

    return NextResponse.json({ product, reviews, related });
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch product" },
      { status: 500 }
    );
  }
}
