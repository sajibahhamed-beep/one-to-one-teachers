const { createClient } = require("@supabase/supabase-js");
const fs = require("fs");
const path = require("path");

// Load env variables manually from .env.local
const envContent = fs.readFileSync(path.join(process.cwd(), ".env.local"), "utf-8");
envContent.split("\n").forEach((line) => {
  const [key, ...vals] = line.split("=");
  if (key && vals.length) {
    process.env[key.trim()] = vals.join("=").trim().replace(/^["']|["']$/g, "");
  }
});

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

console.log("Testing Supabase Connection:");
console.log("URL:", url);
console.log("Key Prefix:", key ? key.substring(0, 16) + "..." : "NONE");

const supabase = createClient(url, key);

async function test() {
  try {
    console.log("\n--- Testing SELECT on enrollments table ---");
    const { data: enrollments, error: readError } = await supabase
      .from("enrollments")
      .select("*")
      .limit(5);

    if (readError) {
      console.error("❌ Read Error:", readError.message, readError.details || "");
    } else {
      console.log("✅ Successfully read enrollments table! Count:", enrollments.length);
      console.log("Sample records:", enrollments);
    }

    console.log("\n--- Testing INSERT on enrollments table ---");
    const testRecord = {
      id: `TEST-${Date.now().toString().slice(-4)}`,
      student_name: "Test Student Verification",
      phone: "01700000000",
      grade: "Class 10",
      district: "Dhaka",
      selected_subjects: ["Physics", "Higher Math"],
      preferred_time: "Evening",
      medium: "Bangla",
      selected_plan: "Trial",
      fee: 0,
      status: "Pending",
      created_at: new Date().toISOString()
    };

    const { data: inserted, error: insertError } = await supabase
      .from("enrollments")
      .insert(testRecord)
      .select();

    if (insertError) {
      console.error("❌ Insert Error:", insertError.message, insertError.details || "");
    } else {
      console.log("✅ Successfully inserted test enrollment record into Supabase!", inserted);
    }
  } catch (err) {
    console.error("Unexpected error:", err);
  }
}

test();
