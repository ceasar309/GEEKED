import { NextRequest, NextResponse } from "next/server";
import { writeFile, unlink, mkdir } from "fs/promises";
import { existsSync } from "fs";
import path from "path";

const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads");

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const type = formData.get("type") as string | null;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    if (!existsSync(UPLOAD_DIR)) {
      await mkdir(UPLOAD_DIR, { recursive: true });
    }

    const ext = path.extname(file.name).toLowerCase();
    const allowedImages = [".jpg", ".jpeg", ".png", ".gif", ".webp", ".svg"];
    const allowedVideos = [".mp4", ".webm", ".mov", ".avi"];

    if (type === "image" && !allowedImages.includes(ext)) {
      return NextResponse.json({ error: "Invalid image format" }, { status: 400 });
    }
    if (type === "video" && !allowedVideos.includes(ext)) {
      return NextResponse.json({ error: "Invalid video format" }, { status: 400 });
    }

    const fileName = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}${ext}`;
    const filePath = path.join(UPLOAD_DIR, fileName);
    const buffer = Buffer.from(await file.arrayBuffer());
    await writeFile(filePath, buffer);

    const url = `/uploads/${fileName}`;

    return NextResponse.json({
      url,
      fileName,
      size: file.size,
      type: type || "other",
    });
  } catch (e) {
    console.error("Upload error:", e);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { fileName } = await req.json();
    const filePath = path.join(UPLOAD_DIR, fileName);

    if (existsSync(filePath)) {
      await unlink(filePath);
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Delete failed" }, { status: 500 });
  }
}

export async function GET() {
  try {
    if (!existsSync(UPLOAD_DIR)) {
      await mkdir(UPLOAD_DIR, { recursive: true });
      return NextResponse.json({ files: [] });
    }

    const fs = await import("fs/promises");
    const files = await fs.readdir(UPLOAD_DIR);

    const mediaFiles = await Promise.all(
      files.map(async (name) => {
        const filePath = path.join(UPLOAD_DIR, name);
        const stat = await fs.stat(filePath);
        const ext = path.extname(name).toLowerCase();
        const isImage = [".jpg", ".jpeg", ".png", ".gif", ".webp", ".svg"].includes(ext);
        const isVideo = [".mp4", ".webm", ".mov", ".avi"].includes(ext);

        return {
          name,
          url: `/uploads/${name}`,
          size: stat.size,
          type: isImage ? "image" : isVideo ? "video" : "other",
          createdAt: stat.birthtime || stat.mtime,
        };
      })
    );

    mediaFiles.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    return NextResponse.json({ files: mediaFiles });
  } catch {
    return NextResponse.json({ files: [] });
  }
}
