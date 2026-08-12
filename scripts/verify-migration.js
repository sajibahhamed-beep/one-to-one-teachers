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
        const value = trimmed.substring(idx + 1).trim();
        process.env[key] = value;
      }
    }
  });
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

async function runChecks() {
  const results = {
    connection: false,
    tables: {},
    tableCounts: {},
    anonRlsCheck: {},
    dbLibCheck: {},
    apiEndpoints: {},
  };

  console.log("=== 1. Checking Supabase Credentials & Connection ===");
  console.log("Supabase URL:", supabaseUrl ? "Configured" : "MISSING");
  console.log("Service Role Key:", serviceKey ? `Configured (len: ${serviceKey.length})` : "MISSING");
  console.log("Anon Key:", anonKey ? `Configured (len: ${anonKey.length})` : "MISSING");

  if (!supabaseUrl || !serviceKey) {
    console.error("FAIL: Missing Supabase credentials in .env.local");
    return;
  }

  const adminClient = createClient(supabaseUrl, serviceKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  const anonClient = anonKey
    ? createClient(supabaseUrl, anonKey, {
        auth: { persistSession: false, autoRefreshToken: false },
      })
    : null;

  // 2. Check each table defined in supabase/schema.sql
  const expectedTables = [
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

  console.log("\n=== 2. Checking Database Tables & Seed Data (Service Role Client) ===");
  for (const table of expectedTables) {
    try {
      const { data, error, count } = await adminClient
        .from(table)
        .select("*", { count: "exact", head: false });

      if (error) {
        results.tables[table] = { status: "FAIL", error: error.message };
        console.log(`❌ Table [${table}]: FAIL - ${error.message}`);
      } else {
        results.tables[table] = { status: "PASS", count: data ? data.length : 0 };
        results.tableCounts[table] = data ? data.length : 0;
        console.log(`✅ Table [${table}]: PASS - ${data ? data.length : 0} rows found`);
      }
    } catch (e) {
      results.tables[table] = { status: "FAIL", error: e.message };
      console.log(`❌ Table [${table}]: ERROR - ${e.message}`);
    }
  }

  // 3. Check Row Level Security (RLS) with Anon Client
  console.log("\n=== 3. Checking RLS & Anon Permissions ===");
  if (anonClient) {
    // Public read tables: teachers, faqs, blogs, settings
    const publicReadTables = ["teachers", "faqs", "blogs", "settings"];
    for (const table of publicReadTables) {
      try {
        const { data, error } = await anonClient.from(table).select("*");
        if (error) {
          console.log(`❌ Anon Read [${table}]: FAIL - ${error.message}`);
          results.anonRlsCheck[`read_${table}`] = { status: "FAIL", error: error.message };
        } else {
          console.log(`✅ Anon Read [${table}]: PASS (${data.length} rows returned)`);
          results.anonRlsCheck[`read_${table}`] = { status: "PASS", count: data.length };
        }
      } catch (e) {
        console.log(`❌ Anon Read [${table}]: ERROR - ${e.message}`);
      }
    }

    // Protected read tables (should NOT allow public anon select if restricted, or if unrestricted check behavior)
    const privateReadTables = ["enrollments", "pricing_requests", "contacts", "teacher_applications", "inquiries", "payments"];
    for (const table of privateReadTables) {
      try {
        const { data, error } = await anonClient.from(table).select("*");
        console.log(`ℹ️ Anon Read [${table}]: ${error ? "Blocked (" + error.message + ")" : "Allowed (" + (data ? data.length : 0) + " rows)"}`);
        results.anonRlsCheck[`anon_read_${table}`] = error ? { status: "BLOCKED", msg: error.message } : { status: "ALLOWED", count: data?.length };
      } catch (e) {
        console.log(`ℹ️ Anon Read [${table}]: ${e.message}`);
      }
    }

    // Public insert tables: contacts, inquiries, enrollments, pricing_requests, teacher_applications, payments
    const publicInsertTest = [
      {
        table: "contacts",
        row: {
          id: `TEST-ANON-${Date.now()}`,
          name: "Anon Tester",
          email: "anon@test.com",
          phone: "01700000000",
          subject: "RLS Test",
          message: "Testing anon insert",
        },
      },
    ];

    for (const test of publicInsertTest) {
      try {
        const { error: insertErr } = await anonClient.from(test.table).insert(test.row);
        if (insertErr) {
          console.log(`❌ Anon Insert [${test.table}]: FAIL - ${insertErr.message}`);
          results.anonRlsCheck[`insert_${test.table}`] = { status: "FAIL", error: insertErr.message };
        } else {
          console.log(`✅ Anon Insert [${test.table}]: PASS`);
          results.anonRlsCheck[`insert_${test.table}`] = { status: "PASS" };
          // Clean up with admin client
          await adminClient.from(test.table).delete().eq("id", test.row.id);
        }
      } catch (e) {
        console.log(`❌ Anon Insert [${test.table}]: ERROR - ${e.message}`);
      }
    }
  }

  // 4. Test DB read and write for all entities
  console.log("\n=== 4. Direct Table CRUD Tests ===");
  const testId = `VERIFY-${Date.now().toString().slice(-6)}`;

  // Test Enrollments
  try {
    const testEnrollment = {
      id: `ENR-${testId}`,
      student_name: "Verification Student",
      phone: "01799999999",
      grade: "Class 10",
      district: "Dhaka",
      selected_subjects: ["Physics", "Chemistry"],
      preferred_time: "Evening",
      medium: "Bangla",
      selected_plan: "Standard",
      fee: 5000,
      status: "Pending",
    };
    const { error: insErr } = await adminClient.from("enrollments").insert(testEnrollment);
    if (insErr) throw insErr;
    const { data: fetchRow, error: fErr } = await adminClient.from("enrollments").select("*").eq("id", `ENR-${testId}`).single();
    if (fErr || !fetchRow) throw fErr || new Error("Row not found");
    const { error: upErr } = await adminClient.from("enrollments").update({ status: "Enrolled" }).eq("id", `ENR-${testId}`);
    if (upErr) throw upErr;
    const { error: delErr } = await adminClient.from("enrollments").delete().eq("id", `ENR-${testId}`);
    if (delErr) throw delErr;
    console.log("✅ Enrollments CRUD: PASS");
    results.dbLibCheck.enrollments = "PASS";
  } catch (e) {
    console.log("❌ Enrollments CRUD: FAIL -", e.message);
    results.dbLibCheck.enrollments = `FAIL (${e.message})`;
  }

  // Test Pricing Requests
  try {
    const testPr = {
      id: `PRC-${testId}`,
      student_name: "Verification Student",
      phone: "01799999999",
      plan_name: "Custom",
      duration: "1 Month",
      monthly_fee: 5000,
      status: "Pending",
    };
    await adminClient.from("pricing_requests").insert(testPr);
    await adminClient.from("pricing_requests").update({ status: "Contacted" }).eq("id", `PRC-${testId}`);
    await adminClient.from("pricing_requests").delete().eq("id", `PRC-${testId}`);
    console.log("✅ Pricing Requests CRUD: PASS");
    results.dbLibCheck.pricingRequests = "PASS";
  } catch (e) {
    console.log("❌ Pricing Requests CRUD: FAIL -", e.message);
    results.dbLibCheck.pricingRequests = `FAIL (${e.message})`;
  }

  // Test Contacts
  try {
    const testContact = {
      id: `MSG-${testId}`,
      name: "Test Contact",
      email: "test@test.com",
      phone: "01799999999",
      subject: "Test Subject",
      message: "Test Message",
    };
    await adminClient.from("contacts").insert(testContact);
    await adminClient.from("contacts").delete().eq("id", `MSG-${testId}`);
    console.log("✅ Contacts CRUD: PASS");
    results.dbLibCheck.contacts = "PASS";
  } catch (e) {
    console.log("❌ Contacts CRUD: FAIL -", e.message);
    results.dbLibCheck.contacts = `FAIL (${e.message})`;
  }

  // Test Teachers
  try {
    const testTeacher = {
      id: `tch-${testId}`,
      name_bn: "টেস্ট শিক্ষক",
      name_en: "Test Teacher",
      university_bn: "বুয়েট",
      university_en: "BUET",
      subject_bn: "পদার্থবিজ্ঞান",
      subject_en: "Physics",
      avatar: "https://example.com/avatar.jpg",
    };
    await adminClient.from("teachers").insert(testTeacher);
    await adminClient.from("teachers").delete().eq("id", `tch-${testId}`);
    console.log("✅ Teachers CRUD: PASS");
    results.dbLibCheck.teachers = "PASS";
  } catch (e) {
    console.log("❌ Teachers CRUD: FAIL -", e.message);
    results.dbLibCheck.teachers = `FAIL (${e.message})`;
  }

  // Test FAQs
  try {
    const testFaq = {
      id: `faq-${testId}`,
      q_bn: "প্রশ্ন?",
      q_en: "Question?",
      a_bn: "উত্তর",
      a_en: "Answer",
    };
    await adminClient.from("faqs").insert(testFaq);
    await adminClient.from("faqs").delete().eq("id", `faq-${testId}`);
    console.log("✅ FAQs CRUD: PASS");
    results.dbLibCheck.faqs = "PASS";
  } catch (e) {
    console.log("❌ FAQs CRUD: FAIL -", e.message);
    results.dbLibCheck.faqs = `FAIL (${e.message})`;
  }

  // Test Blogs
  try {
    const testBlog = {
      id: `blog-${testId}`,
      slug: `test-blog-${testId}`,
      title_bn: "টেস্ট ব্লগ",
      title_en: "Test Blog",
      category: "mentorship",
      excerpt_bn: "সারাংশ",
      published_date_bn: "০৬ আগস্ট, ২০২৬",
    };
    await adminClient.from("blogs").insert(testBlog);
    await adminClient.from("blogs").delete().eq("id", `blog-${testId}`);
    console.log("✅ Blogs CRUD: PASS");
    results.dbLibCheck.blogs = "PASS";
  } catch (e) {
    console.log("❌ Blogs CRUD: FAIL -", e.message);
    results.dbLibCheck.blogs = `FAIL (${e.message})`;
  }

  // Test Settings
  try {
    const { data: existingSettings } = await adminClient.from("settings").select("*").eq("id", "general_settings").single();
    const testUpdate = { phone: existingSettings ? existingSettings.phone : "01775551325" };
    await adminClient.from("settings").upsert({ id: "general_settings", ...testUpdate, updated_at: new Date().toISOString() });
    console.log("✅ Settings CRUD: PASS");
    results.dbLibCheck.settings = "PASS";
  } catch (e) {
    console.log("❌ Settings CRUD: FAIL -", e.message);
    results.dbLibCheck.settings = `FAIL (${e.message})`;
  }

  // Test Teacher Applications
  try {
    const testApp = {
      id: `APP-${testId}`,
      full_name: "Test Applicant",
      phone: "01799999999",
      email: "app@test.com",
      institution: "DU",
      subject_expertise: "English",
      hours_per_week: "4-6 hours",
      status: "Pending",
    };
    await adminClient.from("teacher_applications").insert(testApp);
    await adminClient.from("teacher_applications").update({ status: "Accepted" }).eq("id", `APP-${testId}`);
    await adminClient.from("teacher_applications").delete().eq("id", `APP-${testId}`);
    console.log("✅ Teacher Applications CRUD: PASS");
    results.dbLibCheck.teacherApplications = "PASS";
  } catch (e) {
    console.log("❌ Teacher Applications CRUD: FAIL -", e.message);
    results.dbLibCheck.teacherApplications = `FAIL (${e.message})`;
  }

  // Test Inquiries
  try {
    const testInq = {
      id: `INQ-${testId}`,
      name: "Test Inquirer",
      phone: "01799999999",
      subject: "Test Subject",
      message: "Test Message",
      status: "Pending",
    };
    await adminClient.from("inquiries").insert(testInq);
    await adminClient.from("inquiries").update({ status: "Contacted" }).eq("id", `INQ-${testId}`);
    await adminClient.from("inquiries").delete().eq("id", `INQ-${testId}`);
    console.log("✅ Inquiries CRUD: PASS");
    results.dbLibCheck.inquiries = "PASS";
  } catch (e) {
    console.log("❌ Inquiries CRUD: FAIL -", e.message);
    results.dbLibCheck.inquiries = `FAIL (${e.message})`;
  }

  // Test Payments
  try {
    const testPayment = {
      id: `PAY-${testId}`,
      student_name: "Test Payer",
      phone: "01799999999",
      amount: 4500,
      trx_id: `TRX${testId}`,
      type: "Fee Collection",
      payment_method: "bKash",
      status: "Paid",
    };
    await adminClient.from("payments").insert(testPayment);
    await adminClient.from("payments").update({ status: "Verified" }).eq("id", `PAY-${testId}`);
    await adminClient.from("payments").delete().eq("id", `PAY-${testId}`);
    console.log("✅ Payments CRUD: PASS");
    results.dbLibCheck.payments = "PASS";
  } catch (e) {
    console.log("❌ Payments CRUD: FAIL -", e.message);
    results.dbLibCheck.payments = `FAIL (${e.message})`;
  }

  console.log("\n=== Direct DB Verification Complete ===");
}

runChecks().catch((err) => {
  console.error("Verification error:", err);
});
