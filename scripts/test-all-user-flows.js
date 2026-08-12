const baseUrl = "http://localhost:3000";

async function testEverything() {
  console.log("=== Testing All User Flows and Pages ===");

  // 1. Check all blog routes
  const blogSlugs = [
    "hsc-board-prep-guide",
    "ssc-math-fear-elimination",
    "1-on-1-mentorship-vs-coaching",
    "female-tutor-math-science",
    "online-tuition-safety-bangladesh",
  ];

  for (const slug of blogSlugs) {
    try {
      const res = await fetch(`${baseUrl}/blogs/${slug}`);
      console.log(`/blogs/${slug} ->`, res.status);
      if (res.status !== 200) {
        console.error(`❌ ERROR on /blogs/${slug}: Status ${res.status}`);
      }
    } catch (e) {
      console.error(`❌ EXCEPTION on /blogs/${slug}:`, e.message);
    }
  }

  // 2. Test exact EnrollModal submission payload with "Others"
  console.log("\n--- Testing EnrollModal Submission Payload ---");
  try {
    const enrollPayload = {
      studentName: "User Flow Tester",
      phone: "01711223344",
      grade: "Others",
      district: "Dhaka",
      selectedSubjects: ["Mathematics", "Others"],
      preferredTime: "7:00 PM Evening (Recommended)",
      medium: "Bangla Medium",
      selectedPlan: "Pay-what-you-can",
      fee: 600,
    };
    const res = await fetch(`${baseUrl}/api/enrollments`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(enrollPayload),
    });
    console.log("POST /api/enrollments (with Others) ->", res.status);
    const data = await res.json();
    console.log("Response:", data);
  } catch (e) {
    console.error("❌ Exception on enrollments POST:", e.message);
  }

  // 3. Test Contact page form submission
  console.log("\n--- Testing Contact Form Submission ---");
  try {
    const contactPayload = {
      name: "Contact User",
      email: "user@example.com",
      phone: "01811223344",
      subject: "General Question",
      message: "Need 1-on-1 tutor for Class 8",
    };
    const res = await fetch(`${baseUrl}/api/contacts`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(contactPayload),
    });
    console.log("POST /api/contacts ->", res.status);
    const data = await res.json();
    console.log("Response:", data);
  } catch (e) {
    console.error("❌ Exception on contacts POST:", e.message);
  }

  // 4. Test Teacher Application form submission
  console.log("\n--- Testing Teacher Application Submission ---");
  try {
    const teacherPayload = {
      fullName: "Prospective Teacher",
      phone: "01911223344",
      email: "teacher@example.com",
      institution: "BUET",
      subjectExpertise: "Mathematics (SSC & HSC)",
      hoursPerWeek: "4-6 hours",
    };
    const res = await fetch(`${baseUrl}/api/teacher-applications`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(teacherPayload),
    });
    console.log("POST /api/teacher-applications ->", res.status);
    const data = await res.json();
    console.log("Response:", data);
  } catch (e) {
    console.error("❌ Exception on teacher-applications POST:", e.message);
  }

  // 5. Test Pricing Modal submission
  console.log("\n--- Testing Pricing Request Submission ---");
  try {
    const pricingPayload = {
      studentName: "Pricing Student",
      phone: "01611223344",
      planName: "সাশ্রয়ী ২-বিষয় প্যাক",
      duration: "৬ মাস",
      monthlyFee: 5500,
    };
    const res = await fetch(`${baseUrl}/api/pricing-requests`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(pricingPayload),
    });
    console.log("POST /api/pricing-requests ->", res.status);
    const data = await res.json();
    console.log("Response:", data);
  } catch (e) {
    console.error("❌ Exception on pricing-requests POST:", e.message);
  }

  // 6. Test Settings updates
  console.log("\n--- Testing Settings Update ---");
  try {
    const res = await fetch(`${baseUrl}/api/settings`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ phone: "01775551325" }),
    });
    console.log("POST /api/settings ->", res.status);
    const data = await res.json();
    console.log("Response:", data);
  } catch (e) {
    console.error("❌ Exception on settings POST:", e.message);
  }
}

testEverything();
