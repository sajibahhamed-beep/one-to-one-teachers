import { NextResponse } from "next/server";
import { sendNotificationEmail, NOTIFICATION_RECIPIENTS } from "@/lib/email";

export const dynamic = "force-dynamic";

export async function GET() {
  const host = (process.env.SMTP_HOST || "").trim();
  const port = Number(process.env.SMTP_PORT) || 465;
  const rawUser = process.env.SMTP_USER || process.env.EMAIL_USER || "";
  const rawPass = process.env.SMTP_PASS || process.env.EMAIL_PASS || "";
  const user = rawUser.trim().replace(/^["']|["']$/g, "");
  const pass = rawPass.trim().replace(/^["']|["']$/g, "");

  const envCheck = {
    has_SMTP_USER: Boolean(user),
    has_SMTP_PASS: Boolean(pass),
    host: host || "smtp.gmail.com (default)",
    port: port,
    recipients: NOTIFICATION_RECIPIENTS,
  };

  if (!user || !pass) {
    return NextResponse.json(
      {
        success: false,
        error: "Missing SMTP credentials in environment variables.",
        tip: "Add SMTP_USER and SMTP_PASS to your production hosting dashboard (e.g. Vercel Project Settings > Environment Variables) and redeploy.",
        envCheck,
      },
      { status: 500 }
    );
  }

  try {
    const success = await sendNotificationEmail({
      formName: "Production SMTP Diagnostic Test",
      details: {
        "Test Status": "Triggered via /api/test-email",
        "Environment": process.env.NODE_ENV || "production",
        "Sender": user,
        "Timestamp": new Date().toISOString(),
      },
    });

    if (success) {
      return NextResponse.json({
        success: true,
        message: `Test email successfully dispatched to: ${NOTIFICATION_RECIPIENTS.join(", ")}`,
        envCheck,
      });
    } else {
      return NextResponse.json(
        {
          success: false,
          error: "Nodemailer failed to send email. Check server logs for details.",
          envCheck,
        },
        { status: 500 }
      );
    }
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        error: error?.message || "Unknown error during test email dispatch",
        envCheck,
      },
      { status: 500 }
    );
  }
}
