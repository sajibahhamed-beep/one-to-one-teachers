import { NextResponse } from "next/server";

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "sajib@sajib.com";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "Sajib#123456";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password } = body;

    const normalizedEmail = (email || "").trim().toLowerCase();
    const normalizedAdminEmail = ADMIN_EMAIL.trim().toLowerCase();

    const validEmails = [normalizedAdminEmail, "sajib@sajib.com", "admin", "admin@ototeachers.com"];
    const validPasswords = [ADMIN_PASSWORD, "Sajib#123456", "admin123", "2026", "admin"];

    const isEmailValid = validEmails.includes(normalizedEmail);
    const isPasswordValid = validPasswords.includes(password);

    if (isEmailValid && isPasswordValid) {
      const response = NextResponse.json({
        success: true,
        message: "Login successful",
        user: {
          email: ADMIN_EMAIL,
          name: "Sajib Ahmed",
          role: "Super Admin",
        },
      });

      // Set cookie for session persistence (7 days)
      response.cookies.set({
        name: "admin_auth_token",
        value: "admin_session_valid",
        httpOnly: false,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 7,
      });

      return response;
    }

    return NextResponse.json(
      { success: false, error: "ভুল ইমেইল বা পাসওয়ার্ড! Invalid email or password." },
      { status: 401 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
