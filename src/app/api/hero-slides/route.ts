import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const slides = await prisma.heroSlide.findMany({
      where: { isActive: true },
      orderBy: { displayOrder: "asc" },
    });
    return NextResponse.json({ slides });
  } catch {
    return NextResponse.json({ slides: [] });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const slide = await prisma.heroSlide.create({ data: body });
    return NextResponse.json({ slide });
  } catch {
    return NextResponse.json(
      { error: "Failed to create slide" },
      { status: 500 }
    );
  }
}
