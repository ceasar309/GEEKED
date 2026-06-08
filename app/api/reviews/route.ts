import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const review = await prisma.review.create({
      data: {
        rating: body.rating,
        comment: body.comment,
        userId: body.userId,
        productId: body.productId,
      },
    });

    const stats = await prisma.review.aggregate({
      where: { productId: body.productId },
      _avg: { rating: true },
      _count: true,
    });

    await prisma.product.update({
      where: { id: body.productId },
      data: {
        rating: stats._avg.rating || 0,
        reviewCount: stats._count,
      },
    });

    return NextResponse.json({ review });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Failed to create review" },
      { status: 500 }
    );
  }
}
