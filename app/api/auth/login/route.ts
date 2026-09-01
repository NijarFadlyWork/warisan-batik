import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { usersDb, signJwtToken } from "@/app/lib/auth";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    const user = usersDb.find((u) => u.email === email);
    if (!user) {
      return NextResponse.json({ message: "Email atau password salah" }, { status: 401 });
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      return NextResponse.json({ message: "Email atau password salah" }, { status: 401 });
    }

    const token = signJwtToken({ id: user.id, email: user.email, name: user.name });

    const response = NextResponse.json({
      status: "success",
      user: { id: user.id, name: user.name, email: user.email },
    });

    // Simpan token ke HTTP-only cookie
    response.cookies.set("auth_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7, // 7 hari
      path: "/",
    });

    return response;
  } catch {
    return NextResponse.json({ message: "Terjadi kesalahan server" }, { status: 500 });
  }
}