import nodemailer from "nodemailer";

export const NOTIFICATION_RECIPIENTS = [
  "sajibahhamed@gmail.com",
  "sajibahhamed0@gmail.com",
];

export interface NotificationPayload {
  formName: string;
  details: Record<string, any>;
}

export async function sendNotificationEmail(payload: NotificationPayload) {
  const { formName, details } = payload;
  const emailSubject = `[ototeachers] New Submission: ${formName}`;

  const detailsRows = Object.entries(details)
    .filter(([_, value]) => value !== undefined && value !== null && value !== "")
    .map(
      ([key, value]) =>
        `<tr>
          <td style="padding: 10px; border: 1px solid #e2e8f0; font-weight: bold; background-color: #f8fafc; color: #334155; width: 35%;">${key}</td>
          <td style="padding: 10px; border: 1px solid #e2e8f0; color: #0f172a;">${
            Array.isArray(value) ? value.join(", ") : String(value)
          }</td>
        </tr>`
    )
    .join("");

  const textDetails = Object.entries(details)
    .filter(([_, value]) => value !== undefined && value !== null && value !== "")
    .map(([key, value]) => `${key}: ${Array.isArray(value) ? value.join(", ") : String(value)}`)
    .join("\n");

  const textContent = `send from ototeachers\n\nForm: ${formName}\nTime: ${new Date().toLocaleString("en-US", { timeZone: "Asia/Dhaka" })}\n\nSubmission Details:\n${textDetails}`;

  const htmlContent = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 12px; background-color: #ffffff;">
      <div style="background-color: #0D2C4A; padding: 16px; border-radius: 8px; text-align: center; margin-bottom: 20px;">
        <h2 style="color: #ffffff; margin: 0; font-size: 20px; letter-spacing: 0.5px;">ototeachers</h2>
      </div>
      <p style="font-size: 14px; color: #475569; margin-bottom: 6px;"><strong>Sender:</strong> send from ototeachers</p>
      <p style="font-size: 14px; color: #475569; margin-bottom: 6px;"><strong>Form Type:</strong> ${formName}</p>
      <p style="font-size: 14px; color: #475569; margin-bottom: 20px;"><strong>Time:</strong> ${new Date().toLocaleString("en-US", { timeZone: "Asia/Dhaka" })}</p>

      <table style="width: 100%; border-collapse: collapse; font-size: 14px; margin-top: 10px;">
        <tbody>
          ${detailsRows}
        </tbody>
      </table>

      <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 24px 0 16px 0;" />
      <p style="font-size: 12px; color: #94a3b8; text-align: center; margin: 0;">
        This notification was generated automatically — send from ototeachers.
      </p>
    </div>
  `;

  // Transporter configuration: try env vars first, fallback to standard settings
  const host = process.env.SMTP_HOST || "smtp.gmail.com";
  const port = Number(process.env.SMTP_PORT) || 587;
  const user = process.env.SMTP_USER || process.env.EMAIL_USER;
  const pass = process.env.SMTP_PASS || process.env.EMAIL_PASS;

  if (user && pass) {
    try {
      const transporter = nodemailer.createTransport({
        host,
        port,
        secure: port === 465,
        auth: { user, pass },
      });

      await transporter.sendMail({
        from: `"ototeachers" <${user}>`,
        to: NOTIFICATION_RECIPIENTS.join(", "),
        subject: emailSubject,
        text: textContent,
        html: htmlContent,
      });
      console.log(`[ototeachers email] Notification sent to ${NOTIFICATION_RECIPIENTS.join(", ")}`);
      return true;
    } catch (error) {
      console.error("[ototeachers email] SMTP send error:", error);
    }
  } else {
    console.log(`[ototeachers email] SMTP credentials not set (Set SMTP_USER & SMTP_PASS in .env.local). Logged payload:`);
    console.log(`Recipients: ${NOTIFICATION_RECIPIENTS.join(", ")}`);
    console.log(`Subject: ${emailSubject}`);
    console.log(`Text Body:\n${textContent}`);
  }

  return false;
}
