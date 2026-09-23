import { NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { verifyJwtToken } from "@/app/lib/auth";

export const runtime = "nodejs";

function getAdmin(req: Request) {
  const cookie = req.headers.get("cookie") || "";
  const token = cookie.match(/auth_token=([^;]+)/)?.[1];
  if (!token) return null;
  const payload = verifyJwtToken(token);
  return payload?.role === "ADMIN" ? payload : null;
}

export async function POST(req: Request) {
  if (!getAdmin(req)) {
    return NextResponse.json({ message: "Akses ditolak" }, { status: 403 });
  }

  const formData = await req.formData();
  const file = formData.get("file") as File | null;

  if (!file) {
    return NextResponse.json({ message: "File tidak ditemukan" }, { status: 400 });
  }
  if (file.type !== "video/mp4") {
    return NextResponse.json({ message: "File harus berformat .mp4" }, { status: 400 });
  }
  const MAX_SIZE = 20 * 1024 * 1024;
  if (file.size > MAX_SIZE) {
    return NextResponse.json({ message: "Ukuran file maksimal 20MB" }, { status: 400 });
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const safeName = file.name.replace(/[^a-zA-Z0-9.\-_]/g, "");
  const fileName = `${Date.now()}-${safeName}`;

  const uploadDir = path.join(process.cwd(), "public", "uploads", "videos");
  await mkdir(uploadDir, { recursive: true });
  await writeFile(path.join(uploadDir, fileName), buffer);

  return NextResponse.json({ status: "success", url: `/uploads/videos/${fileName}` });
}