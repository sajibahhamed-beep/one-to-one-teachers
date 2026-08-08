import { NextResponse } from "next/server";
import { cookies } from "next/headers";

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "sajib@sajib.com";

export async function GET() {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get("admin_auth_token")?.value;

    if (token === "admin_session_valid") {
      return NextResponse.json({
        authenticated: true,
        user: {
          email: ADMIN_EMAIL,
          name: "Sajib Ahmed",
          role: "Super Admin",
        },
      });
    }

    return NextResponse.json({ authenticated: false }, { status: 401 });
  } catch (error) {
    return NextResponse.json({ authenticated: false }, { status: 500 });
  }
}
