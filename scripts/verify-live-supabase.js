const fs = require("fs");
const path = require("path");
const { createClient } = require("@supabase/supabase-js");

// Load .env.local
const envPath = path.join(process.cwd(), ".env.local");
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
        process.env[key] = value;
      }
    }
  });
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

console.log("=== Supabase Connection Status ===");
console.log("Supabase URL configured:", Boolean(supabaseUrl && supabaseUrl.startsWith("http")));
if (supabaseUrl && supabaseUrl.startsWith("http")) {
  try {
    const parsed = new URL(supabaseUrl);
    console.log("Supabase Project Host:", parsed.host);
  } catch (e) {}
}
console.log("Anon Key present:", Boolean(anonKey && anonKey.length > 20));
console.log("Service Key present:", Boolean(serviceKey && serviceKey.length > 20));

if (!supabaseUrl || (!serviceKey && !anonKey)) {
  console.log("\n[STATUS]: Credentials are missing or empty in .env.local.");
  process.exit(0);
}

const client = createClient(supabaseUrl, serviceKey || anonKey, {
  auth: { persistSession: false, autoRefreshToken: false },
});

async function runLiveCheck() {
  console.log("\n=== Live PostgreSQL Database Read Queries ===");
  const tables = [
    "teachers",
    "faqs",
    "blogs",
    "settings",
    "enrollments",
    "pricing_requests",
    "contacts",
    "teacher_applications",
    "inquiries",
    "payments",
  ];

  let totalTablesConnected = 0;
  let totalRowsFound = 0;

  for (const table of tables) {
    try {
      const { data, error, count } = await client
        .from(table)
        .select("*", { count: "exact" });

      if (error) {
        console.log(`❌ Table [${table}]: ERROR (${error.code || "ERR"}): ${error.message}`);
      } else {
        totalTablesConnected++;
        const rowCount = count !== null ? count : (data ? data.length : 0);
        totalRowsFound += rowCount;
        console.log(`✅ Table [${table}]: Connected -> ${rowCount} rows found`);
        if (data && data.length > 0) {
          const sample = data[0];
          const sampleDetail = sample.name_bn || sample.title_bn || sample.student_name || sample.name || sample.full_name || sample.meta_title || sample.id;
          console.log(`   Sample item (ID: ${sample.id}): "${sampleDetail}"`);
        }
      }
    } catch (e) {
      console.log(`❌ Table [${table}]: Exception -> ${e.message}`);
    }
  }

  console.log("\n=== Verification Summary ===");
  console.log(`Tables Accessible: ${totalTablesConnected} / ${tables.length}`);
  console.log(`Total Database Records: ${totalRowsFound}`);
  if (totalTablesConnected === tables.length) {
    console.log("OVERALL RESULT: Connected to live Supabase PostgreSQL database successfully!");
  } else {
    console.log("OVERALL RESULT: Partial or failed connection.");
  }
}

runLiveCheck().catch((err) => {
  console.error("Live check failed:", err);
});
