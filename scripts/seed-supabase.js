const fs = require("fs");
const path = require("path");
const { createClient } = require("@supabase/supabase-js");

// Try reading .env.local
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
const supabaseKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Error: Supabase environment variables not found in .env.local");
  console.log("Please make sure NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are set.");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function seed() {
  console.log("Starting data migration to Supabase...");
  const dbPath = path.join(process.cwd(), "data", "db.json");
  if (!fs.existsSync(dbPath)) {
    console.error("data/db.json not found!");
    process.exit(1);
  }

  const raw = fs.readFileSync(dbPath, "utf-8");
  const data = JSON.parse(raw);

  // 1. Enrollments
  if (data.enrollments && data.enrollments.length > 0) {
    const rows = data.enrollments.map((e) => ({
      id: e.id,
      student_name: e.studentName,
      phone: e.phone || "",
      grade: e.grade,
      district: e.district,
      selected_subjects: e.selectedSubjects || [],
      preferred_time: e.preferredTime,
      medium: e.medium || "",
      selected_plan: e.selectedPlan || "",
      fee: e.fee || 0,
      status: e.status || "Pending",
      created_at: e.createdAt || new Date().toISOString(),
    }));
    const { error } = await supabase.from("enrollments").upsert(rows);
    if (error) console.error("Error seeding enrollments:", error.message);
    else console.log(`✓ Seeded ${rows.length} enrollments`);
  }

  // 2. Pricing Requests
  if (data.pricingRequests && data.pricingRequests.length > 0) {
    const rows = data.pricingRequests.map((p) => ({
      id: p.id,
      student_name: p.studentName,
      phone: p.phone || "",
      plan_name: p.planName,
      duration: p.duration,
      monthly_fee: p.monthlyFee || 0,
      status: p.status || "Pending",
      created_at: p.createdAt || new Date().toISOString(),
    }));
    const { error } = await supabase.from("pricing_requests").upsert(rows);
    if (error) console.error("Error seeding pricing_requests:", error.message);
    else console.log(`✓ Seeded ${rows.length} pricing_requests`);
  }

  // 3. Contacts
  if (data.contacts && data.contacts.length > 0) {
    const rows = data.contacts.map((c) => ({
      id: c.id,
      name: c.name,
      email: c.email || "",
      phone: c.phone || "",
      subject: c.subject,
      message: c.message,
      created_at: c.createdAt || new Date().toISOString(),
    }));
    const { error } = await supabase.from("contacts").upsert(rows);
    if (error) console.error("Error seeding contacts:", error.message);
    else console.log(`✓ Seeded ${rows.length} contacts`);
  }

  // 4. Teachers
  if (data.teachers && data.teachers.length > 0) {
    const rows = data.teachers.map((t) => ({
      id: t.id,
      name_bn: t.nameBn,
      name_en: t.nameEn,
      university_bn: t.universityBn,
      university_en: t.universityEn,
      subject_bn: t.subjectBn,
      subject_en: t.subjectEn,
      avatar: t.avatar,
    }));
    const { error } = await supabase.from("teachers").upsert(rows);
    if (error) console.error("Error seeding teachers:", error.message);
    else console.log(`✓ Seeded ${rows.length} teachers`);
  }

  // 5. FAQs
  if (data.faqs && data.faqs.length > 0) {
    const rows = data.faqs.map((f) => ({
      id: f.id,
      q_bn: f.qBn,
      q_en: f.qEn,
      a_bn: f.aBn,
      a_en: f.aEn,
    }));
    const { error } = await supabase.from("faqs").upsert(rows);
    if (error) console.error("Error seeding faqs:", error.message);
    else console.log(`✓ Seeded ${rows.length} faqs`);
  }

  // 6. Blogs
  if (data.blogs && data.blogs.length > 0) {
    const rows = data.blogs.map((b) => ({
      id: b.id,
      slug: b.slug,
      title_bn: b.titleBn,
      title_en: b.titleEn || "",
      category: b.category || "mentorship",
      excerpt_bn: b.excerptBn || "",
      published_date_bn: b.publishedDateBn || "",
    }));
    const { error } = await supabase.from("blogs").upsert(rows);
    if (error) console.error("Error seeding blogs:", error.message);
    else console.log(`✓ Seeded ${rows.length} blogs`);
  }

  // 7. Settings
  if (data.settings) {
    const row = {
      id: "general_settings",
      social_links: data.settings.socialLinks || [],
      facebook_url: data.settings.facebookUrl || "https://facebook.com",
      instagram_url: data.settings.instagramUrl || "https://instagram.com",
      youtube_url: data.settings.youtubeUrl || "https://youtube.com",
      linkedin_url: data.settings.linkedinUrl || "https://linkedin.com",
      whatsapp_phone: data.settings.whatsappPhone || "8801775551325",
      whatsapp_message_bn: data.settings.whatsappMessageBn || "হ্যালো ototeachers.com টিম, ১-অন-১ অনলাইন শিক্ষক সম্পর্কে জানতে চাই।",
      whatsapp_message_en: data.settings.whatsappMessageEn || "Hello ototeachers.com team, I want to inquire about 1-on-1 online teachers.",
      phone: data.settings.phone || "01775551325",
      email: data.settings.email || "support@ototeachers.com",
      address_bn: data.settings.addressBn || "ধানমণ্ডি, ঢাকা, বাংলাদেশ",
      address_en: data.settings.addressEn || "Dhanmondi, Dhaka, Bangladesh",
      meta_title: data.settings.metaTitle || "ototeachers.com — ১-অন-১ অনলাইন শিক্ষক | One-to-One Teacher for All",
      meta_description: data.settings.metaDescription || "বাংলাদেশের ১-অন-১ অনলাইন শিক্ষক প্ল্যাটফর্ম। বুয়েট, ঢাবি ও মেডিকেলের যাচাইকৃত শিক্ষকদের সাথে সরাসরি লাইভ ক্লাস — ঘরে বসে।",
      keywords: data.settings.keywords || "ototeachers.com, ototeachers, online teacher Bangladesh, ১-অন-১ শিক্ষক, private tutor Bangladesh",
    };
    const { error } = await supabase.from("settings").upsert(row);
    if (error) console.error("Error seeding settings:", error.message);
    else console.log("✓ Seeded settings");
  }

  // 8. Teacher Applications
  if (data.teacherApplications && data.teacherApplications.length > 0) {
    const rows = data.teacherApplications.map((a) => ({
      id: a.id,
      full_name: a.fullName,
      phone: a.phone,
      email: a.email || "",
      institution: a.institution,
      subject_expertise: a.subjectExpertise,
      hours_per_week: a.hoursPerWeek,
      status: a.status || "Pending",
      created_at: a.createdAt || new Date().toISOString(),
    }));
    const { error } = await supabase.from("teacher_applications").upsert(rows);
    if (error) console.error("Error seeding teacher_applications:", error.message);
    else console.log(`✓ Seeded ${rows.length} teacher_applications`);
  }

  // 9. Inquiries
  if (data.inquiries && data.inquiries.length > 0) {
    const rows = data.inquiries.map((i) => ({
      id: i.id,
      name: i.name,
      phone: i.phone || "",
      subject: i.subject,
      message: i.message,
      status: i.status || "Pending",
      created_at: i.createdAt || new Date().toISOString(),
    }));
    const { error } = await supabase.from("inquiries").upsert(rows);
    if (error) console.error("Error seeding inquiries:", error.message);
    else console.log(`✓ Seeded ${rows.length} inquiries`);
  }

  // 10. Payments
  if (data.payments && data.payments.length > 0) {
    const rows = data.payments.map((p) => ({
      id: p.id,
      student_name: p.studentName,
      phone: p.phone || "",
      amount: p.amount || 0,
      trx_id: p.trxId,
      type: p.type || "Fee Collection",
      payment_method: p.paymentMethod || "bKash",
      status: p.status || "Paid",
      created_at: p.createdAt || new Date().toISOString(),
    }));
    const { error } = await supabase.from("payments").upsert(rows);
    if (error) console.error("Error seeding payments:", error.message);
    else console.log(`✓ Seeded ${rows.length} payments`);
  }

  console.log("\nMigration completed successfully!");
}

seed().catch((err) => {
  console.error("Migration failed:", err);
  process.exit(1);
});
