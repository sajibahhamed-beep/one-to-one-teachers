const fs = require("fs");
const path = require("path");
const { Client } = require("pg");

// Load .env.local
const envPath = path.join(process.cwd(), ".env.local");
let dbUrl = process.env.DIRECT_URL || process.env.DATABASE_URL;
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, "utf-8");
  envContent.split("\n").forEach((line) => {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith("#")) {
      const idx = trimmed.indexOf("=");
      if (idx !== -1) {
        const key = trimmed.substring(0, idx).trim();
        let value = trimmed.substring(idx + 1).trim();
        if (value.startsWith('"') && value.endsWith('"')) {
          value = value.slice(1, -1);
        }
        if (key === "DIRECT_URL" || key === "DATABASE_URL") {
          dbUrl = value;
        }
      }
    }
  });
}

if (!dbUrl) {
  console.error("DIRECT_URL / DATABASE_URL not found in .env.local");
  process.exit(1);
}

const client = new Client({
  connectionString: dbUrl,
  ssl: { rejectUnauthorized: false },
});

async function apply() {
  console.log("=== Applying Supabase Schema & Seed Data ===");
  await client.connect();
  console.log("✓ Connected to Supabase PostgreSQL.\n");

  // 1. Apply schema.sql
  const schemaPath = path.join(process.cwd(), "supabase", "schema.sql");
  console.log("1. Executing supabase/schema.sql...");
  const schemaSql = fs.readFileSync(schemaPath, "utf-8");
  await client.query(schemaSql);
  console.log("✓ Schema executed successfully (All tables, indexes, and RLS policies created).\n");

  // 2. Apply seed.sql
  const seedPath = path.join(process.cwd(), "supabase", "seed.sql");
  console.log("2. Executing supabase/seed.sql...");
  const seedSql = fs.readFileSync(seedPath, "utf-8");
  await client.query(seedSql);
  console.log("✓ Seed data inserted successfully.\n");

  // 3. Verify all tables in public schema
  console.log("3. Verifying created tables and records:");
  const tables = [
    "enrollments",
    "pricing_requests",
    "contacts",
    "teachers",
    "faqs",
    "blogs",
    "settings",
    "teacher_applications",
    "inquiries",
    "payments",
  ];

  for (const table of tables) {
    const countRes = await client.query(`SELECT COUNT(*) FROM public."${table}"`);
    const count = parseInt(countRes.rows[0].count, 10);
    const sampleRes = await client.query(`SELECT * FROM public."${table}" LIMIT 1`);
    const sample = sampleRes.rows[0];
    const sampleInfo = sample
      ? sample.student_name || sample.name_bn || sample.title_bn || sample.name || sample.phone || sample.id
      : "Empty (Ready for writes)";
    console.log(`- Table [${table}]: ${count} records (Sample: "${sampleInfo}")`);
  }

  await client.end();
  console.log("\n✅ Supabase PostgreSQL Schema & Seed Migration Completed 100% Successfully!");
}

apply().catch(async (err) => {
  console.error("Migration error:", err.message);
  try {
    await client.end();
  } catch (e) {}
  process.exit(1);
});
