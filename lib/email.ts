import nodemailer from "nodemailer";

export const NOTIFICATION_RECIPIENTS = [
  "mahiyaakter148@gmail.com",
  "sajibahhamed@gmail.com",
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
  const host = (process.env.SMTP_HOST || "").trim();
  const port = Number(process.env.SMTP_PORT) || 465;
  const rawUser = process.env.SMTP_USER || process.env.EMAIL_USER || "";
  const rawPass = process.env.SMTP_PASS || process.env.EMAIL_PASS || "";
  const user = rawUser.trim().replace(/^["']|["']$/g, "");
  const pass = rawPass.trim().replace(/^["']|["']$/g, "");

  if (user && pass) {
    // Determine transport options: prefer port 465 or Gmail service for serverless reliability
    const isGmail = !host || host.includes("gmail");
    
    const transportOptions: nodemailer.TransportOptions = isGmail && (!host || port === 465)
      ? ({
          service: "gmail",
          auth: { user, pass },
          connectionTimeout: 10000,
          greetingTimeout: 8000,
          socketTimeout: 15000,
        } as any)
      : ({
          host: host || "smtp.gmail.com",
          port: port,
          secure: port === 465,
          auth: { user, pass },
          connectionTimeout: 10000,
          greetingTimeout: 8000,
          socketTimeout: 15000,
          tls: {
            rejectUnauthorized: false,
          },
        } as any);

    try {
      const transporter = nodemailer.createTransport(transportOptions);

      const info = await transporter.sendMail({
        from: `"ototeachers" <${user}>`,
        to: NOTIFICATION_RECIPIENTS.join(", "),
        subject: emailSubject,
        text: textContent,
        html: htmlContent,
      });
      console.log(`[ototeachers email] Notification sent to ${NOTIFICATION_RECIPIENTS.join(", ")} (Message ID: ${info.messageId})`);
      return true;
    } catch (primaryError) {
      console.error("[ototeachers email] Primary SMTP attempt failed:", primaryError);

      // Fallback attempt on port 587 if port 465 was used or vice versa
      try {
        const fallbackPort = port === 465 ? 587 : 465;
        console.log(`[ototeachers email] Retrying with fallback port ${fallbackPort}...`);
        const fallbackTransporter = nodemailer.createTransport({
          host: host || "smtp.gmail.com",
          port: fallbackPort,
          secure: fallbackPort === 465,
          auth: { user, pass },
          connectionTimeout: 10000,
          greetingTimeout: 8000,
          socketTimeout: 15000,
          tls: {
            rejectUnauthorized: false,
          },
        });

        const fallbackInfo = await fallbackTransporter.sendMail({
          from: `"ototeachers" <${user}>`,
          to: NOTIFICATION_RECIPIENTS.join(", "),
          subject: emailSubject,
          text: textContent,
          html: htmlContent,
        });
        console.log(`[ototeachers email] Fallback notification sent successfully (Message ID: ${fallbackInfo.messageId})`);
        return true;
      } catch (fallbackError) {
        console.error("[ototeachers email] Fallback SMTP attempt also failed:", fallbackError);
      }
    }
  } else {
    console.warn(`[ototeachers email] ⚠️ SMTP credentials missing in environment variables!`);
    console.warn(`Please configure SMTP_USER (or EMAIL_USER) and SMTP_PASS (or EMAIL_PASS) in your production hosting dashboard (e.g. Vercel Project Settings > Environment Variables).`);
    console.log(`Payload was: Subject="${emailSubject}", Recipients="${NOTIFICATION_RECIPIENTS.join(", ")}"`);
  }

  return false;
}
