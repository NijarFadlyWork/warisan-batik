import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    status: "success",
    message: "Endpoint backend Next.js berhasil diakses!",
  });
}