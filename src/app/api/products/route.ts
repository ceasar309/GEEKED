import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const search = searchParams.get("search");
  const sort = searchParams.get("sort");
  const gender = searchParams.get("gender");
  const category = searchParams.get("category");
  const size = searchParams.get("size");
  const color = searchParams.get("color");
  const brand = searchParams.get("brand");
  const sale = searchParams.get("sale");
  const limit = parseInt(searchParams.get("limit") || "50");
  const ids = searchParams.get("ids");

  const where: Record<string, any> = {};

  if (search) {
    where.OR = [
      { name: { contains: search, mode: "insensitive" } },
      { description: { contains: search, mode: "insensitive" } },
      { brand: { contains: search, mode: "insensitive" } },
    ];
  }

  if (gender) where.gender = gender.toLowerCase();
  if (category) where.category = { name: { in: category.split(","), mode: "insensitive" } };
  if (size) where.sizes = { contains: size };
  if (color) where.colors = { contains: color };
  if (brand) where.brand = { in: brand.split(","), mode: "insensitive" };
  if (sale === "true") where.isSale = true;
  if (ids) where.id = { in: ids.split(",") };

  let orderBy: Record<string, any> = { createdAt: "desc" };
  if (sort === "bestselling") orderBy = { reviewCount: "desc" };
  if (sort === "price-asc") orderBy = { price: "asc" };
  if (sort === "price-desc") orderBy = { price: "desc" };
  if (sort === "newest") orderBy = { createdAt: "desc" };

  try {
    const products = await prisma.product.findMany({
      where,
      orderBy,
      take: limit,
      include: {
        category: { select: { id: true, name: true, slug: true } },
        images: { orderBy: { order: "asc" } },
      },
    });

    return NextResponse.json({ products });
  } catch {
    return NextResponse.json({ products: [] });
  }
}
