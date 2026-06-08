import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const coupons = await prisma.coupon.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json({ coupons });
  } catch {
    return NextResponse.json({ coupons: [] });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const coupon = await prisma.coupon.create({ data: body });
    return NextResponse.json({ coupon });
  } catch {
    return NextResponse.json(
      { error: "Failed to create coupon" },
      { status: 500 }
    );
  }
}
