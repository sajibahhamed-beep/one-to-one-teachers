const fs = require("fs");
const path = require("path");

function loadEnvFile(filePath) {
  if (fs.existsSync(filePath)) {
    const content = fs.readFileSync(filePath, "utf-8");
    content.split("\n").forEach((line) => {
      const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
      if (match) {
        const key = match[1];
        let value = match[2] || "";
        value = value.trim().replace(/^["']|["']$/g, "");
        if (!process.env[key]) {
          process.env[key] = value;
        }
      }
    });
  }
}

loadEnvFile(path.resolve(process.cwd(), ".env.local"));
loadEnvFile(path.resolve(process.cwd(), ".env"));

const nodemailer = require("nodemailer");

async function testAppNotification() {
  const host = (process.env.SMTP_HOST || "smtp.gmail.com").trim();
  const port = Number(process.env.SMTP_PORT) || 587;
  const rawUser = process.env.SMTP_USER || process.env.EMAIL_USER || "";
  const rawPass = process.env.SMTP_PASS || process.env.EMAIL_PASS || "";
  const user = rawUser.trim().replace(/^["']|["']$/g, "");
  const pass = rawPass.trim().replace(/^["']|["']$/g, "");
  const NOTIFICATION_RECIPIENTS = [
    "sajibahhamed@gmail.com",
    "mahiyaakter148@gmail.com"
  ];

  console.log("=== Testing App Email Notification Service ===");
  console.log(`Host: ${host}`);
  console.log(`Port: ${port}`);
  console.log(`User: ${user}`);
  console.log(`Recipients: ${NOTIFICATION_RECIPIENTS.join(", ")}`);

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  });

  console.log("\nVerifying transporter...");
  await transporter.verify();
  console.log("Verification successful!");

  console.log("\nSending system notification test email...");
  const info = await transporter.sendMail({
    from: `"ototeachers" <${user}>`,
    to: NOTIFICATION_RECIPIENTS.join(", "),
    subject: `[ototeachers] SMTP Setup Verification & Test Report`,
    text: `SMTP configuration test succeeded.\nRecipients: ${NOTIFICATION_RECIPIENTS.join(", ")}\nTimestamp: ${new Date().toISOString()}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 12px; background-color: #ffffff;">
        <div style="background-color: #0D2C4A; padding: 16px; border-radius: 8px; text-align: center; margin-bottom: 20px;">
          <h2 style="color: #ffffff; margin: 0; font-size: 20px; letter-spacing: 0.5px;">ototeachers</h2>
        </div>
        <h3 style="color: #10b981; margin-top: 0;">✓ SMTP System Setup Verified</h3>
        <p style="font-size: 14px; color: #475569; margin-bottom: 6px;"><strong>Status:</strong> Active & Tested</p>
        <p style="font-size: 14px; color: #475569; margin-bottom: 6px;"><strong>Sender Account:</strong> ${user}</p>
        <p style="font-size: 14px; color: #475569; margin-bottom: 6px;"><strong>SMTP Server:</strong> ${host}:${port}</p>
        <p style="font-size: 14px; color: #475569; margin-bottom: 6px;"><strong>Target Recipients:</strong></p>
        <ul style="font-size: 14px; color: #334155;">
          ${NOTIFICATION_RECIPIENTS.map(r => `<li><code>${r}</code></li>`).join("")}
        </ul>
        <p style="font-size: 14px; color: #475569; margin-bottom: 20px;"><strong>Verified At:</strong> ${new Date().toLocaleString("en-US", { timeZone: "Asia/Dhaka" })} (Asia/Dhaka)</p>
        <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 24px 0 16px 0;" />
        <p style="font-size: 12px; color: #94a3b8; text-align: center; margin: 0;">
          This is an automated test report sent from ototeachers SMTP Service.
        </p>
      </div>
    `,
  });

  console.log("✓ Email successfully delivered to SMTP server!");
  console.log("Message ID:", info.messageId);
  console.log("Accepted list:", info.accepted);
  console.log("Server Response:", info.response);
}

testAppNotification().catch(err => {
  console.error("Test failed:", err);
  process.exit(1);
});
