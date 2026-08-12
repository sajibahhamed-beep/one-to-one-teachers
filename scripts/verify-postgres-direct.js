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

async function verify() {
  console.log("=== Supabase Real PostgreSQL Connection Verification ===");
  console.log("Target Host:", "aws-0-ap-southeast-2.pooler.supabase.com");
  console.log("Project Reference:", "npiajnijdbryvsrsbuyh");

  const client = new Client({
    connectionString: dbUrl,
    ssl: { rejectUnauthorized: false },
  });

  try {
    await client.connect();
    console.log("Connection Status: CONNECTED (SUCCESS)\n");

    // 1. Live server info
    const infoRes = await client.query(`
      SELECT 
        version() AS postgres_version,
        current_database() AS database_name,
        current_user AS db_user,
        now() AS server_time,
        inet_server_addr() AS server_ip;
    `);

    const info = infoRes.rows[0];
    console.log("PostgreSQL Version:", info.postgres_version);
    console.log("Current Database:", info.database_name);
    console.log("Database User:", info.db_user);
    console.log("Supabase Server Time:", info.server_time);

    // 2. Query public tables
    const tableRes = await client.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
      ORDER BY table_name;
    `);

    console.log("\n--- Public Schema Tables Check ---");
    const tables = tableRes.rows.map((r) => r.table_name);
    if (tables.length === 0) {
      console.log("Public Tables Count: 0 (schema.sql has not been run in Supabase yet)");
    } else {
      console.log(`Public Tables Found (${tables.length}):`, tables.join(", "));
      for (const t of tables) {
        const countRes = await client.query(`SELECT COUNT(*) FROM public."${t}"`);
        console.log(`- ${t}: ${countRes.rows[0].count} rows`);
      }
    }

    await client.end();
  } catch (err) {
    console.error("Connection Failed:", err.message);
  }
}

verify();
