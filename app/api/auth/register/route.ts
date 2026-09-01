import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { usersDb } from "@/app/lib/auth";

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json({ message: "Semua kolom wajib diisi" }, { status: 400 });
    }

    const existingUser = usersDb.find((u) => u.email === email);
    if (existingUser) {
      return NextResponse.json({ message: "Email sudah terdaftar" }, { status: 400 });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const newUser = {
      id: Date.now().toString(),
      name,
      email,
      passwordHash,
    };

    usersDb.push(newUser);

    return NextResponse.json({ status: "success", message: "Registrasi berhasil, silakan login" });
  } catch {
    return NextResponse.json({ message: "Terjadi kesalahan server" }, { status: 500 });
  }
}