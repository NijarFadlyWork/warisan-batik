import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json({ status: "success", message: "Logout berhasil" });
  response.cookies.delete("auth_token");
  return response;
}