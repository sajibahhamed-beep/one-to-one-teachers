import { NextResponse } from "next/server";

export async function GET() {
  return new NextResponse("google-site-verification: googlea44abe15352927c7.html", {
    status: 200,
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "public, max-age=86400, must-revalidate",
    },
  });
}
