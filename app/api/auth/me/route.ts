import { NextResponse } from "next/server";
import { verifyJwtToken } from "@/app/lib/auth";

export async function GET(req: Request) {
  const cookie = req.headers.get("cookie") || "";
  const token = cookie.match(/auth_token=([^;]+)/)?.[1];

  if (!token) {
    return NextResponse.json({ user: null }, { status: 401 });
  }

  const payload = verifyJwtToken(token);

  if (!payload) {
    return NextResponse.json({ user: null }, { status: 401 });
  }

  return NextResponse.json({
    user: {
      id: payload.id,
      name: payload.name,
      email: payload.email,
      role: payload.role,
    },
  });
}