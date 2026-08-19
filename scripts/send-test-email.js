const nodemailer = require("nodemailer");
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

async function sendTestEmail() {
  const host = process.env.SMTP_HOST || "smtp.gmail.com";
  const port = Number(process.env.SMTP_PORT) || 587;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  console.log(`Configuring transporter with user: ${user}, host: ${host}, port: ${port}`);

  if (!user || !pass) {
    console.error("Missing SMTP_USER or SMTP_PASS in environment variables.");
    process.exit(1);
  }

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: {
      user: user.trim(),
      pass: pass.trim(),
    },
  });

  const recipients = ["mahiyaakter148@gmail.com", "sajibahhamed@gmail.com"];

  console.log("Verifying SMTP connection...");
  await transporter.verify();
  console.log("SMTP connection verified successfully!");

  console.log(`Sending email to: ${recipients.join(", ")}...`);

  const info = await transporter.sendMail({
    from: `"ototeachers" <${user.trim()}>`,
    to: recipients.join(", "),
    subject: "Test Email from ototeachers (Direct Gmail SMTP)",
    text: `Hello,\n\nThis is a test email sent directly via Gmail SMTP from ${user.trim()}.\nRecipients:\n1. mahiyaakter148@gmail.com\n2. sajibahhamed@gmail.com\n\nTimestamp: ${new Date().toISOString()}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 12px; background-color: #ffffff;">
        <div style="background-color: #0D2C4A; padding: 16px; border-radius: 8px; text-align: center; margin-bottom: 20px;">
          <h2 style="color: #ffffff; margin: 0; font-size: 20px; letter-spacing: 0.5px;">ototeachers</h2>
        </div>
        <p style="font-size: 16px; color: #1e293b; font-weight: bold; margin-bottom: 12px;">Email Configuration Successful</p>
        <p style="font-size: 14px; color: #475569; margin-bottom: 8px;"><strong>Sender:</strong> ${user.trim()}</p>
        <p style="font-size: 14px; color: #475569; margin-bottom: 8px;"><strong>Recipients:</strong></p>
        <ul style="font-size: 14px; color: #475569; margin-top: 4px;">
          <li>mahiyaakter148@gmail.com</li>
          <li>sajibahhamed@gmail.com</li>
        </ul>
        <p style="font-size: 14px; color: #475569; margin-bottom: 20px;"><strong>Time:</strong> ${new Date().toLocaleString("en-US", { timeZone: "Asia/Dhaka" })}</p>
        <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 24px 0 16px 0;" />
        <p style="font-size: 12px; color: #94a3b8; text-align: center; margin: 0;">
          Direct SMTP via Gmail • send from ototeachers
        </p>
      </div>
    `,
  });

  console.log("Email sent successfully!");
  console.log("Message ID:", info.messageId);
  console.log("Accepted:", info.accepted);
  console.log("Response:", info.response);
}

sendTestEmail().catch((err) => {
  console.error("Error sending test email:", err);
  process.exit(1);
});
