import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get("category");
  const featured = searchParams.get("featured");

  const where: Record<string, any> = { isActive: true };
  if (category) where.category = category;
  if (featured === "true") where.isFeatured = true;

  try {
    const videos = await prisma.video.findMany({
      where,
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json({ videos });
  } catch {
    return NextResponse.json({ videos: [] });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const video = await prisma.video.create({ data: body });
    return NextResponse.json({ video });
  } catch {
    return NextResponse.json(
      { error: "Failed to create video" },
      { status: 500 }
    );
  }
}
