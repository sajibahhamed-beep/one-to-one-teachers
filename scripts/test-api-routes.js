const baseUrl = process.env.TEST_URL || "http://localhost:3005";

async function testApi() {
  const results = [];
  const timestamp = Date.now().toString().slice(-4);

  let authCookie = "";

  async function check(name, method, url, body = null, expectedStatus = 200) {
    try {
      const headers = { "Content-Type": "application/json" };
      if (authCookie) headers["Cookie"] = authCookie;
      const opts = {
        method,
        headers,
      };
      if (body) opts.body = JSON.stringify(body);
      const res = await fetch(`${baseUrl}${url}`, opts);
      const setCookie = res.headers.get("set-cookie");
      if (setCookie) {
        authCookie = setCookie.split(";")[0];
      }
      const rawText = await res.text();
      let data = null;
      try {
        data = JSON.parse(rawText);
      } catch (e) {
        data = rawText;
      }
      const statusMatch = res.status === expectedStatus || (res.status >= 200 && res.status < 300);
      const passed = statusMatch;
      results.push({ name, method, url, status: res.status, passed, data: typeof data === "object" ? JSON.stringify(data).slice(0, 100) : data });
      console.log(`${passed ? "✅ PASS" : "❌ FAIL"}: [${method}] ${url} -> Status ${res.status}`);
      return data;
    } catch (e) {
      results.push({ name, method, url, status: 0, passed: false, error: e.message });
      console.log(`❌ ERROR: [${method}] ${url} -> ${e.message}`);
      return null;
    }
  }

  console.log("=== Testing All 10 Application API Routes ===\n");

  // 1. Enrollments
  console.log("--- 1. Enrollments API ---");
  await check("Get Enrollments", "GET", "/api/enrollments");
  const enrPost = await check("Create Enrollment", "POST", "/api/enrollments", {
    studentName: "API Test Student",
    phone: "01700000001",
    grade: "Class X",
    district: "Dhaka",
    selectedSubjects: ["Physics"],
    preferredTime: "Evening",
    fee: 5000,
  });
  const createdEnrId = enrPost?.data?.id;
  if (createdEnrId) {
    await check("Update Enrollment", "PUT", "/api/enrollments", { id: createdEnrId, status: "Enrolled" });
    await check("Delete Enrollment", "DELETE", `/api/enrollments?id=${createdEnrId}`);
  }

  // 2. Pricing Requests
  console.log("\n--- 2. Pricing Requests API ---");
  await check("Get Pricing Requests", "GET", "/api/pricing-requests");
  const prPost = await check("Create Pricing Request", "POST", "/api/pricing-requests", {
    studentName: "API Pricing Student",
    phone: "01700000002",
    planName: "Test Plan",
    duration: "1 Month",
    monthlyFee: 3000,
  });
  const createdPrId = prPost?.data?.id;
  if (createdPrId) {
    await check("Update Pricing Request", "PUT", "/api/pricing-requests", { id: createdPrId, status: "Contacted" });
    await check("Delete Pricing Request", "DELETE", `/api/pricing-requests?id=${createdPrId}`);
  }

  // 3. Contacts
  console.log("\n--- 3. Contacts API ---");
  await check("Get Contacts", "GET", "/api/contacts");
  const contactPost = await check("Create Contact", "POST", "/api/contacts", {
    name: "API Contact",
    email: "contact@test.com",
    phone: "01700000003",
    subject: "API Test Subject",
    message: "API Test Message",
  });
  const createdMsgId = contactPost?.data?.id;
  if (createdMsgId) {
    await check("Delete Contact", "DELETE", `/api/contacts?id=${createdMsgId}`);
  }

  // 4. Teachers
  console.log("\n--- 4. Teachers API ---");
  await check("Get Teachers", "GET", "/api/teachers");
  const teacherPost = await check("Add Teacher", "POST", "/api/teachers", {
    nameBn: "এপিআই শিক্ষক",
    nameEn: "API Teacher",
    universityBn: "বুয়েট",
    universityEn: "BUET",
    subjectBn: "পদার্থবিজ্ঞান",
    subjectEn: "Physics",
  });
  const createdTchId = teacherPost?.data?.id;
  if (createdTchId) {
    await check("Delete Teacher", "DELETE", `/api/teachers?id=${createdTchId}`);
  }

  // 5. FAQs
  console.log("\n--- 5. FAQs API ---");
  await check("Get FAQs", "GET", "/api/faqs");
  const faqPost = await check("Add FAQ", "POST", "/api/faqs", {
    qBn: "প্রশ্ন কি?",
    qEn: "What is question?",
    aBn: "উত্তর এটি।",
    aEn: "This is answer.",
  });
  const createdFaqId = faqPost?.data?.id;
  if (createdFaqId) {
    await check("Delete FAQ", "DELETE", `/api/faqs?id=${createdFaqId}`);
  }

  // 6. Blogs
  console.log("\n--- 6. Blogs API ---");
  await check("Get Blogs", "GET", "/api/blogs");
  const blogPost = await check("Create Blog", "POST", "/api/blogs", {
    slug: `api-test-blog-${timestamp}`,
    titleBn: "এপিআই টেস্ট ব্লগ",
    titleEn: "API Test Blog",
    category: "mentorship",
    excerptBn: "টেস্ট বিবরণ",
  });
  const createdBlogId = blogPost?.data?.id;
  if (createdBlogId) {
    await check("Delete Blog", "DELETE", `/api/blogs?id=${createdBlogId}`);
  }

  // 7. Settings
  console.log("\n--- 7. Settings API ---");
  await check("Get Settings", "GET", "/api/settings");
  await check("Update Settings", "POST", "/api/settings", {
    phone: "01775551325",
  });

  // 8. Teacher Applications
  console.log("\n--- 8. Teacher Applications API ---");
  await check("Get Teacher Applications", "GET", "/api/teacher-applications");
  const appPost = await check("Submit Teacher Application", "POST", "/api/teacher-applications", {
    fullName: "API Applicant",
    phone: "01700000004",
    email: "app@test.com",
    institution: "BUET",
    subjectExpertise: "Chemistry",
    hoursPerWeek: "5 hours",
  });
  const createdAppId = appPost?.application?.id;
  if (createdAppId) {
    await check("Update Teacher Application", "PUT", "/api/teacher-applications", { id: createdAppId, status: "Reviewed" });
    await check("Delete Teacher Application", "DELETE", `/api/teacher-applications?id=${createdAppId}`);
  }

  // 9. Inquiries
  console.log("\n--- 9. Inquiries API ---");
  await check("Get Inquiries", "GET", "/api/inquiries");
  const inqPost = await check("Create Inquiry", "POST", "/api/inquiries", {
    name: "API Inquirer",
    phone: "01700000005",
    subject: "Pricing Inquiry",
    message: "Looking for math mentor",
  });
  const createdInqId = inqPost?.inquiry?.id;
  if (createdInqId) {
    await check("Update Inquiry", "PUT", "/api/inquiries", { id: createdInqId, status: "Contacted" });
    await check("Delete Inquiry", "DELETE", `/api/inquiries?id=${createdInqId}`);
  }

  // 10. Payments
  console.log("\n--- 10. Payments API ---");
  await check("Get Payments", "GET", "/api/payments");
  const payPost = await check("Create Payment", "POST", "/api/payments", {
    studentName: "API Payer",
    phone: "01700000006",
    amount: 6000,
    trxId: `TRXAPI${timestamp}`,
    paymentMethod: "bKash",
  });
  const createdPayId = payPost?.payment?.id;
  if (createdPayId) {
    await check("Update Payment", "PUT", "/api/payments", { id: createdPayId, status: "Verified" });
    await check("Delete Payment", "DELETE", `/api/payments?id=${createdPayId}`);
  }

  // 11. Auth endpoints
  console.log("\n--- 11. Auth APIs ---");
  await check("Admin Login (Invalid)", "POST", "/api/auth/login", { email: "wrong@email.com", password: "wrong" }, 401);
  await check("Admin Login (Valid)", "POST", "/api/auth/login", { email: "sajib@sajib.com", password: "Sajib#123456" }, 200);
  await check("Admin Verify", "GET", "/api/auth/verify");
  await check("Admin Logout", "POST", "/api/auth/logout");

  console.log("\n=== Summary ===");
  const allPassed = results.every((r) => r.passed);
  console.log(`Total tests: ${results.length}`);
  console.log(`Passed: ${results.filter((r) => r.passed).length}`);
  console.log(`Failed: ${results.filter((r) => !r.passed).length}`);
  console.log(`Overall Result: ${allPassed ? "ALL PASS" : "SOME FAILED"}`);
}

testApi();
