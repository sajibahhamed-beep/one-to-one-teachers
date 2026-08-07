"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Users,
  FileText,
  HelpCircle,
  Mail,
  GraduationCap,
  Settings,
  DollarSign,
  Plus,
  Trash2,
  CheckCircle,
  Clock,
  X,
  Edit,
  ExternalLink,
  ShieldCheck,
  Search,
  Lock,
  ArrowRight,
  RefreshCw,
  LayoutDashboard,
  LogOut,
  Calendar,
  MessageSquare,
  PhoneCall,
  UserCheck,
  Megaphone,
  Globe,
  CreditCard,
  XCircle,
  TrendingUp,
} from "lucide-react";
import { SettingData, Enrollment, PricingRequest, ContactMessage, Teacher, FAQItem, TeacherApplication, Inquiry, Payment } from "@/lib/db";
import { BlogPost } from "@/lib/blogsData";

export default function AdminDashboardPage() {
  const [mounted, setMounted] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState("");
  const [authError, setAuthError] = useState(false);

  const [activeTab, setActiveTab] = useState<
    | "dashboard"
    | "enrollments"
    | "contacts"
    | "inquiries"
    | "pricing"
    | "teachers"
    | "teacher-applications"
    | "blogs"
    | "faqs"
    | "settings"
    | "payments"
  >("dashboard");
  const [loading, setLoading] = useState(true);

  // Data states
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [pricingRequests, setPricingRequests] = useState<PricingRequest[]>([]);
  const [contacts, setContacts] = useState<ContactMessage[]>([]);
  const [teacherApplications, setTeacherApplications] = useState<TeacherApplication[]>([]);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [faqs, setFaqs] = useState<FAQItem[]>([]);
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [settings, setSettings] = useState<SettingData>({
    facebookUrl: "https://facebook.com",
    instagramUrl: "https://instagram.com",
    youtubeUrl: "https://youtube.com",
    phone: "01775551325",
    email: "support@aloshikkha.org",
    addressBn: "ধানমণ্ডি, ঢাকা, বাংলাদেশ",
    addressEn: "Dhanmondi, Dhaka, Bangladesh",
  });

  // Filter & Search states
  const [searchQuery, setSearchQuery] = useState("");

  // Modal forms
  const [showAddBlog, setShowAddBlog] = useState(false);
  const [showAddFaq, setShowAddFaq] = useState(false);
  const [showAddTeacher, setShowAddTeacher] = useState(false);
  const [showAddInquiry, setShowAddInquiry] = useState(false);
  const [showAddPayment, setShowAddPayment] = useState(false);

  // New Blog State
  const [newBlogTitleBn, setNewBlogTitleBn] = useState("");
  const [newBlogTitleEn, setNewBlogTitleEn] = useState("");
  const [newBlogCategory, setNewBlogCategory] = useState("mentorship");
  const [newBlogExcerptBn, setNewBlogExcerptBn] = useState("");
  const [newBlogExcerptEn, setNewBlogExcerptEn] = useState("");

  // New FAQ State
  const [newFaqQBn, setNewFaqQBn] = useState("");
  const [newFaqQEn, setNewFaqQEn] = useState("");
  const [newFaqABn, setNewFaqABn] = useState("");
  const [newFaqAEn, setNewFaqAEn] = useState("");

  // New Teacher State
  const [newTeacherNameBn, setNewTeacherNameBn] = useState("");
  const [newTeacherNameEn, setNewTeacherNameEn] = useState("");
  const [newTeacherUniBn, setNewTeacherUniBn] = useState("বুয়েট (সিএসই)");
  const [newTeacherUniEn, setNewTeacherUniEn] = useState("BUET (CSE)");
  const [newTeacherSubBn, setNewTeacherSubBn] = useState("গণিত ও আইসিটি শিক্ষক");
  const [newTeacherSubEn, setNewTeacherSubEn] = useState("Math & ICT Tutor");

  // New Inquiry State
  const [newInquiryName, setNewInquiryName] = useState("");
  const [newInquiryPhone, setNewInquiryPhone] = useState("");
  const [newInquirySubject, setNewInquirySubject] = useState("");
  const [newInquiryMessage, setNewInquiryMessage] = useState("");

  // New Payment State
  const [newPaymentName, setNewPaymentName] = useState("");
  const [newPaymentPhone, setNewPaymentPhone] = useState("");
  const [newPaymentAmount, setNewPaymentAmount] = useState<number>(6000);
  const [newPaymentType, setNewPaymentType] = useState<"Fee Collection" | "Tutor Honorarium">("Fee Collection");
  const [newPaymentMethod, setNewPaymentMethod] = useState<"bKash" | "Nagad" | "Bank Transfer" | "Cash">("bKash");

  const [settingsSaved, setSettingsSaved] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (sessionStorage.getItem("admin_auth") === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode === "admin123" || passcode === "admin") {
      setIsAuthenticated(true);
      sessionStorage.setItem("admin_auth", "true");
      setAuthError(false);
    } else {
      setAuthError(true);
    }
  };

  const fetchAllData = async () => {
    setLoading(true);
    try {
      const [resEnr, resPrc, resCnt, resBlg, resFaq, resTch, resSet, resApp, resInq, resPay] = await Promise.all([
        fetch("/api/enrollments").then((r) => r.json()),
        fetch("/api/pricing-requests").then((r) => r.json()),
        fetch("/api/contacts").then((r) => r.json()),
        fetch("/api/blogs").then((r) => r.json()),
        fetch("/api/faqs").then((r) => r.json()),
        fetch("/api/teachers").then((r) => r.json()),
        fetch("/api/settings").then((r) => r.json()),
        fetch("/api/teacher-applications").then((r) => r.json()),
        fetch("/api/inquiries").then((r) => r.json()),
        fetch("/api/payments").then((r) => r.json()),
      ]);

      if (Array.isArray(resEnr)) setEnrollments(resEnr);
      if (Array.isArray(resPrc)) setPricingRequests(resPrc);
      if (Array.isArray(resCnt)) setContacts(resCnt);
      if (Array.isArray(resBlg)) setBlogs(resBlg);
      if (Array.isArray(resFaq)) setFaqs(resFaq);
      if (Array.isArray(resTch)) setTeachers(resTch);
      if (resSet && resSet.facebookUrl) setSettings(resSet);
      if (Array.isArray(resApp)) setTeacherApplications(resApp);
      if (Array.isArray(resInq)) setInquiries(resInq);
      if (Array.isArray(resPay)) setPayments(resPay);
    } catch (error) {
      console.error("Failed to load admin data", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchAllData();
    }
  }, [isAuthenticated]);

  // Update Enrollment Status
  const handleUpdateEnrollmentStatus = async (id: string, status: string) => {
    await fetch("/api/enrollments", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });
    fetchAllData();
  };

  // Delete Enrollment
  const handleDeleteEnrollment = async (id: string) => {
    if (confirm("Are you sure you want to delete this request?")) {
      await fetch(`/api/enrollments?id=${id}`, { method: "DELETE" });
      fetchAllData();
    }
  };

  // Update Pricing Request Status
  const handleUpdatePricingStatus = async (id: string, status: string) => {
    await fetch("/api/pricing-requests", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });
    fetchAllData();
  };

  // Delete Contact Message
  const handleDeleteContact = async (id: string) => {
    if (confirm("Delete this message?")) {
      await fetch(`/api/contacts?id=${id}`, { method: "DELETE" });
      fetchAllData();
    }
  };

  // Create Blog
  const handleCreateBlog = async (e: React.FormEvent) => {
    e.preventDefault();
    const slug = newBlogTitleEn.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    await fetch("/api/blogs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        slug,
        titleBn: newBlogTitleBn,
        titleEn: newBlogTitleEn,
        category: newBlogCategory,
        excerptBn: newBlogExcerptBn,
        excerptEn: newBlogExcerptEn,
      }),
    });
    setShowAddBlog(false);
    setNewBlogTitleBn("");
    setNewBlogTitleEn("");
    fetchAllData();
  };

  // Delete Blog
  const handleDeleteBlog = async (id: string) => {
    if (confirm("Delete this blog article?")) {
      await fetch(`/api/blogs?id=${id}`, { method: "DELETE" });
      fetchAllData();
    }
  };

  // Create FAQ
  const handleCreateFaq = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch("/api/faqs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        qBn: newFaqQBn,
        qEn: newFaqQEn,
        aBn: newFaqABn,
        aEn: newFaqAEn,
      }),
    });
    setShowAddFaq(false);
    setNewFaqQBn("");
    setNewFaqQEn("");
    setNewFaqABn("");
    setNewFaqAEn("");
    fetchAllData();
  };

  // Delete FAQ
  const handleDeleteFaq = async (id: string) => {
    if (confirm("Delete this FAQ item?")) {
      await fetch(`/api/faqs?id=${id}`, { method: "DELETE" });
      fetchAllData();
    }
  };

  // Create Teacher
  const handleCreateTeacher = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch("/api/teachers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nameBn: newTeacherNameBn,
        nameEn: newTeacherNameEn,
        universityBn: newTeacherUniBn,
        universityEn: newTeacherUniEn,
        subjectBn: newTeacherSubBn,
        subjectEn: newTeacherSubEn,
      }),
    });
    setShowAddTeacher(false);
    setNewTeacherNameBn("");
    setNewTeacherNameEn("");
    fetchAllData();
  };

  // Delete Teacher
  const handleDeleteTeacher = async (id: string) => {
    if (confirm("Delete this teacher profile?")) {
      await fetch(`/api/teachers?id=${id}`, { method: "DELETE" });
      fetchAllData();
    }
  };

  // Save Settings
  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch("/api/settings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(settings),
    });
    setSettingsSaved(true);
    setTimeout(() => setSettingsSaved(false), 3000);
  };

  // Update Teacher Application Status (Approve/Reject)
  const handleUpdateTeacherApplicationStatus = async (id: string, status: string) => {
    await fetch("/api/teacher-applications", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });
    fetchAllData();
  };

  // Delete Teacher Application
  const handleDeleteTeacherApplication = async (id: string) => {
    if (confirm("Delete this mentor application?")) {
      await fetch(`/api/teacher-applications?id=${id}`, { method: "DELETE" });
      fetchAllData();
    }
  };

  // Create Inquiry
  const handleCreateInquiry = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch("/api/inquiries", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: newInquiryName,
        phone: newInquiryPhone,
        subject: newInquirySubject,
        message: newInquiryMessage,
      }),
    });
    setShowAddInquiry(false);
    setNewInquiryName("");
    setNewInquiryPhone("");
    setNewInquirySubject("");
    setNewInquiryMessage("");
    fetchAllData();
  };

  // Update Inquiry Status
  const handleUpdateInquiryStatus = async (id: string, status: string) => {
    await fetch("/api/inquiries", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });
    fetchAllData();
  };

  // Delete Inquiry
  const handleDeleteInquiry = async (id: string) => {
    if (confirm("Delete this inquiry ticket?")) {
      await fetch(`/api/inquiries?id=${id}`, { method: "DELETE" });
      fetchAllData();
    }
  };

  // Create Payment
  const handleCreatePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch("/api/payments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        studentName: newPaymentName,
        phone: newPaymentPhone,
        amount: newPaymentAmount,
        type: newPaymentType,
        paymentMethod: newPaymentMethod,
        status: "Paid",
      }),
    });
    setShowAddPayment(false);
    setNewPaymentName("");
    setNewPaymentPhone("");
    setNewPaymentAmount(6000);
    fetchAllData();
  };

  // Update Payment Status
  const handleUpdatePaymentStatus = async (id: string, status: string) => {
    await fetch("/api/payments", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });
    fetchAllData();
  };

  // Delete Payment
  const handleDeletePayment = async (id: string) => {
    if (confirm("Delete this payment transaction record?")) {
      await fetch(`/api/payments?id=${id}`, { method: "DELETE" });
      fetchAllData();
    }
  };

  if (!mounted) {
    return <div className="min-h-screen bg-[#F1F5F9]" />;
  }

  if (!isAuthenticated) {
    return (
      <main className="min-h-screen bg-[#0D2C4A] flex items-center justify-center p-4 font-sans text-white">
        <div className="bg-white text-[#0D2C4A] rounded-3xl p-8 max-w-md w-full shadow-2xl space-y-6">
          <div className="text-center space-y-2">
            <div className="w-14 h-14 rounded-2xl bg-[#00A896]/10 text-[#00A896] flex items-center justify-center mx-auto mb-2">
              <ShieldCheck className="w-8 h-8 text-[#00A896]" />
            </div>
            <h1 className="text-2xl font-extrabold text-[#0D2C4A]">Admin Panel Access</h1>
            <p className="text-xs text-gray-500 font-medium">Enter passcode to manage your platform</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-[#0D2C4A] mb-1.5 uppercase font-mono">
                Passcode (Default: admin123)
              </label>
              <div className="relative">
                <input
                  type="password"
                  required
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  placeholder="Enter admin passcode"
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#00A896] text-sm font-mono text-[#0D2C4A]"
                />
                <Lock className="w-4 h-4 text-gray-400 absolute right-3.5 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            {authError && (
              <p className="text-xs text-red-500 font-bold bg-red-50 p-2.5 rounded-lg border border-red-200">
                Invalid passcode! Default passcode is <code className="font-mono">admin123</code>
              </p>
            )}

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-[#00A896] hover:bg-[#008075] text-white font-extrabold text-sm transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Login to Dashboard</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="pt-4 border-t border-gray-100 text-center">
            <Link href="/" className="text-xs text-[#00A896] font-bold hover:underline">
              ← Return to Main Website
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#F1F5F9] font-sans text-[#0D2C4A] flex flex-col">
      {/* Top Mobile Header */}
      <header className="lg:hidden bg-[#0D2C4A] text-white p-4 sticky top-0 z-40 flex items-center justify-between shadow-md">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#00A896] text-[#0D2C4A] flex items-center justify-center font-bold">
            A
          </div>
          <span className="font-bold text-sm text-white">Alo Shikkha Admin</span>
        </div>
        <button
          onClick={() => {
            sessionStorage.removeItem("admin_auth");
            setIsAuthenticated(false);
          }}
          className="px-3 py-1 bg-red-500/20 text-red-300 text-xs font-bold rounded-lg"
        >
          Logout
        </button>
      </header>

      {/* Main 2-Column Sidebar Layout */}
      <div className="max-w-[1440px] w-full mx-auto p-4 sm:p-6 lg:p-8 flex flex-col lg:flex-row gap-8 flex-1">
        
        {/* ================= LEFT SIDEBAR SCROLLING SLIDER (With ALL Navigations) ================= */}
        <aside className="w-full lg:w-72 flex-shrink-0 bg-[#0D2C4A] text-white rounded-3xl p-6 shadow-xl border border-white/10 flex flex-col justify-between space-y-6 self-start sticky top-8 max-h-[calc(100vh-4rem)] overflow-y-auto scrollbar-thin">
          <div className="space-y-6">
            {/* Admin Brand Header */}
            <div className="flex items-center gap-3.5 pb-5 border-b border-white/15">
              <div className="w-11 h-11 rounded-2xl bg-[#00A896] text-white flex items-center justify-center font-extrabold text-xl shadow-md">
                A
              </div>
              <div>
                <h1 className="font-sans text-base font-extrabold text-white leading-tight">
                  Alo Shikkha Admin
                </h1>
                <span className="text-[11px] text-[#38BDF8] font-mono font-semibold block pt-0.5">
                  Backend Control Panel
                </span>
              </div>
            </div>

            {/* Complete Sidebar Navigation Items Slider */}
            <nav className="space-y-1.5 font-medium">
              <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-white/50 px-3 pb-1">
                SIDEBAR NAVIGATION SLIDER
              </div>

              {/* 1. Dashboard Overview */}
              <button
                onClick={() => setActiveTab("dashboard")}
                className={`w-full px-4 py-3 rounded-2xl text-xs font-extrabold transition-all flex items-center justify-between cursor-pointer ${
                  activeTab === "dashboard"
                    ? "bg-[#00A896] text-white shadow-lg shadow-[#00A896]/30 translate-x-1"
                    : "text-white/80 hover:bg-white/10 hover:text-white"
                }`}
              >
                <div className="flex items-center gap-3">
                  <LayoutDashboard className="w-4 h-4 text-[#38BDF8]" />
                  <span>Dashboard Overview</span>
                </div>
              </button>

              {/* 2. Class Requests */}
              <button
                onClick={() => setActiveTab("enrollments")}
                className={`w-full px-4 py-3 rounded-2xl text-xs font-extrabold transition-all flex items-center justify-between cursor-pointer ${
                  activeTab === "enrollments"
                    ? "bg-[#00A896] text-white shadow-lg shadow-[#00A896]/30 translate-x-1"
                    : "text-white/80 hover:bg-white/10 hover:text-white"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Users className="w-4 h-4 text-emerald-400" />
                  <span>Student Requests</span>
                </div>
                <span className={`text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-full ${
                  activeTab === "enrollments" ? "bg-white/20 text-white" : "bg-white/10 text-[#38BDF8]"
                }`}>
                  {enrollments.length}
                </span>
              </button>

              {/* 3. Pricing Plan Requests */}
              <button
                onClick={() => setActiveTab("pricing")}
                className={`w-full px-4 py-3 rounded-2xl text-xs font-extrabold transition-all flex items-center justify-between cursor-pointer ${
                  activeTab === "pricing"
                    ? "bg-[#00A896] text-white shadow-lg shadow-[#00A896]/30 translate-x-1"
                    : "text-white/80 hover:bg-white/10 hover:text-white"
                }`}
              >
                <div className="flex items-center gap-3">
                  <DollarSign className="w-4 h-4 text-amber-400" />
                  <span>Pricing Requests</span>
                </div>
                <span className={`text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-full ${
                  activeTab === "pricing" ? "bg-white/20 text-white" : "bg-white/10 text-amber-300"
                }`}>
                  {pricingRequests.length}
                </span>
              </button>

              {/* 4. Contact Messages */}
              <button
                onClick={() => setActiveTab("contacts")}
                className={`w-full px-4 py-3 rounded-2xl text-xs font-extrabold transition-all flex items-center justify-between cursor-pointer ${
                  activeTab === "contacts"
                    ? "bg-[#00A896] text-white shadow-lg shadow-[#00A896]/30 translate-x-1"
                    : "text-white/80 hover:bg-white/10 hover:text-white"
                }`}
              >
                <div className="flex items-center gap-3">
                  <MessageSquare className="w-4 h-4 text-blue-400" />
                  <span>Contact Messages</span>
                </div>
                <span className={`text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-full ${
                  activeTab === "contacts" ? "bg-white/20 text-white" : "bg-white/10 text-blue-300"
                }`}>
                  {contacts.length}
                </span>
              </button>

              {/* 5. Inquiries & Complaints */}
              <button
                onClick={() => setActiveTab("inquiries")}
                className={`w-full px-4 py-3 rounded-2xl text-xs font-extrabold transition-all flex items-center justify-between cursor-pointer ${
                  activeTab === "inquiries"
                    ? "bg-[#00A896] text-white shadow-lg shadow-[#00A896]/30 translate-x-1"
                    : "text-white/80 hover:bg-white/10 hover:text-white"
                }`}
              >
                <div className="flex items-center gap-3">
                  <PhoneCall className="w-4 h-4 text-rose-400" />
                  <span>Inquiries & Complaints</span>
                </div>
                <span className={`text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-full ${
                  activeTab === "inquiries" ? "bg-white/20 text-white" : "bg-white/10 text-rose-300"
                }`}>
                  {inquiries.length}
                </span>
              </button>

              {/* Teacher Applications */}
              <button
                onClick={() => setActiveTab("teacher-applications")}
                className={`w-full px-4 py-3 rounded-2xl text-xs font-extrabold transition-all flex items-center justify-between cursor-pointer ${
                  activeTab === "teacher-applications"
                    ? "bg-[#00A896] text-white shadow-lg shadow-[#00A896]/30 translate-x-1"
                    : "text-white/80 hover:bg-white/10 hover:text-white"
                }`}
              >
                <div className="flex items-center gap-3">
                  <UserCheck className="w-4 h-4 text-amber-300" />
                  <span>Teacher Applications</span>
                </div>
                <span className={`text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-full ${
                  activeTab === "teacher-applications" ? "bg-white/20 text-white" : "bg-white/10 text-amber-300"
                }`}>
                  {teacherApplications.length}
                </span>
              </button>

              {/* 6. Blog Articles & Announcements */}
              <button
                onClick={() => setActiveTab("blogs")}
                className={`w-full px-4 py-3 rounded-2xl text-xs font-extrabold transition-all flex items-center justify-between cursor-pointer ${
                  activeTab === "blogs"
                    ? "bg-[#00A896] text-white shadow-lg shadow-[#00A896]/30 translate-x-1"
                    : "text-white/80 hover:bg-white/10 hover:text-white"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Megaphone className="w-4 h-4 text-purple-400" />
                  <span>Blog Articles & News</span>
                </div>
                <span className={`text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-full ${
                  activeTab === "blogs" ? "bg-white/20 text-white" : "bg-white/10 text-purple-300"
                }`}>
                  {blogs.length}
                </span>
              </button>

              {/* 7. FAQs Management */}
              <button
                onClick={() => setActiveTab("faqs")}
                className={`w-full px-4 py-3 rounded-2xl text-xs font-extrabold transition-all flex items-center justify-between cursor-pointer ${
                  activeTab === "faqs"
                    ? "bg-[#00A896] text-white shadow-lg shadow-[#00A896]/30 translate-x-1"
                    : "text-white/80 hover:bg-white/10 hover:text-white"
                }`}
              >
                <div className="flex items-center gap-3">
                  <HelpCircle className="w-4 h-4 text-sky-400" />
                  <span>FAQs Management</span>
                </div>
                <span className={`text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-full ${
                  activeTab === "faqs" ? "bg-white/20 text-white" : "bg-white/10 text-emerald-300"
                }`}>
                  {faqs.length}
                </span>
              </button>

              {/* 8. Teachers & Mentors */}
              <button
                onClick={() => setActiveTab("teachers")}
                className={`w-full px-4 py-3 rounded-2xl text-xs font-extrabold transition-all flex items-center justify-between cursor-pointer ${
                  activeTab === "teachers"
                    ? "bg-[#00A896] text-white shadow-lg shadow-[#00A896]/30 translate-x-1"
                    : "text-white/80 hover:bg-white/10 hover:text-white"
                }`}
              >
                <div className="flex items-center gap-3">
                  <GraduationCap className="w-4 h-4 text-teal-300" />
                  <span>Teachers & Mentors</span>
                </div>
                <span className={`text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-full ${
                  activeTab === "teachers" ? "bg-white/20 text-white" : "bg-white/10 text-teal-300"
                }`}>
                  {teachers.length}
                </span>
              </button>

              {/* 9. Website CMS Settings */}
              <button
                onClick={() => setActiveTab("settings")}
                className={`w-full px-4 py-3 rounded-2xl text-xs font-extrabold transition-all flex items-center justify-between cursor-pointer ${
                  activeTab === "settings"
                    ? "bg-[#00A896] text-white shadow-lg shadow-[#00A896]/30 translate-x-1"
                    : "text-white/80 hover:bg-white/10 hover:text-white"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Globe className="w-4 h-4 text-emerald-300" />
                  <span>Website CMS Settings</span>
                </div>
              </button>

              {/* 10. Payments & Financial Reports */}
              <button
                onClick={() => setActiveTab("payments")}
                className={`w-full px-4 py-3 rounded-2xl text-xs font-extrabold transition-all flex items-center justify-between cursor-pointer ${
                  activeTab === "payments"
                    ? "bg-[#00A896] text-white shadow-lg shadow-[#00A896]/30 translate-x-1"
                    : "text-white/80 hover:bg-white/10 hover:text-white"
                }`}
              >
                <div className="flex items-center gap-3">
                  <CreditCard className="w-4 h-4 text-indigo-300" />
                  <span>Payments & Revenue</span>
                </div>
              </button>
            </nav>
          </div>

          {/* Sidebar Bottom Buttons */}
          <div className="pt-4 border-t border-white/15 space-y-2">
            <button
              onClick={fetchAllData}
              className="w-full py-2.5 px-3 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Refresh Data</span>
            </button>

            <Link
              href="/"
              target="_blank"
              className="w-full py-2.5 px-3 rounded-xl bg-[#00A896] hover:bg-[#008075] text-white text-xs font-extrabold transition-colors flex items-center justify-center gap-2 shadow-md cursor-pointer"
            >
              <span>View Main Website</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>

            <button
              onClick={() => {
                sessionStorage.removeItem("admin_auth");
                setIsAuthenticated(false);
              }}
              className="w-full py-2 px-3 rounded-xl bg-red-500/15 hover:bg-red-500/25 text-red-300 text-xs font-bold border border-red-500/20 transition-colors"
            >
              Logout
            </button>
          </div>
        </aside>

        {/* ================= RIGHT MAIN CONTENT AREA ================= */}
        <main className="flex-1 min-w-0 space-y-8">
          
          {/* Top KPI Summary Stat Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm flex flex-col justify-between">
              <div className="flex items-center justify-between text-gray-400 mb-2">
                <span className="text-xs font-bold uppercase font-mono text-[#00A896]">Requests</span>
                <Users className="w-4 h-4 text-[#00A896]" />
              </div>
              <strong className="text-2xl font-extrabold text-[#0D2C4A]">{enrollments.length}</strong>
              <span className="text-[11px] text-gray-500 font-medium pt-1">Student Class Requests</span>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm flex flex-col justify-between">
              <div className="flex items-center justify-between text-gray-400 mb-2">
                <span className="text-xs font-bold uppercase font-mono text-[#D97706]">Pricing</span>
                <DollarSign className="w-4 h-4 text-[#D97706]" />
              </div>
              <strong className="text-2xl font-extrabold text-[#0D2C4A]">{pricingRequests.length}</strong>
              <span className="text-[11px] text-gray-500 font-medium pt-1">Plan Enquiries</span>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm flex flex-col justify-between">
              <div className="flex items-center justify-between text-gray-400 mb-2">
                <span className="text-xs font-bold uppercase font-mono text-[#3B82F6]">Contacts</span>
                <Mail className="w-4 h-4 text-[#3B82F6]" />
              </div>
              <strong className="text-2xl font-extrabold text-[#0D2C4A]">{contacts.length}</strong>
              <span className="text-[11px] text-gray-500 font-medium pt-1">Contact Messages</span>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm flex flex-col justify-between">
              <div className="flex items-center justify-between text-gray-400 mb-2">
                <span className="text-xs font-bold uppercase font-mono text-[#10B981]">Teachers</span>
                <GraduationCap className="w-4 h-4 text-[#10B981]" />
              </div>
              <strong className="text-2xl font-extrabold text-[#0D2C4A]">{teachers.length}</strong>
              <span className="text-[11px] text-gray-500 font-medium pt-1">Active University Tutors</span>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm flex flex-col justify-between">
              <div className="flex items-center justify-between text-gray-400 mb-2">
                <span className="text-xs font-bold uppercase font-mono text-[#8B5CF6]">Blogs</span>
                <FileText className="w-4 h-4 text-[#8B5CF6]" />
              </div>
              <strong className="text-2xl font-extrabold text-[#0D2C4A]">{blogs.length}</strong>
              <span className="text-[11px] text-gray-500 font-medium pt-1">Published Articles</span>
            </div>
          </div>

          {/* ================= TAB 0: DASHBOARD OVERVIEW ================= */}
          {activeTab === "dashboard" && (
            <div className="space-y-6">
              
              {/* Row 1 Charts */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Bar Chart */}
                <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-extrabold text-[#0D2C4A]">Weekly Class Activity</h3>
                    <div className="flex items-center gap-3 text-[10px] font-bold">
                      <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 bg-emerald-500 rounded-sm" />Completed</span>
                      <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 bg-rose-500 rounded-sm" />Cancelled</span>
                      <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 bg-indigo-500 rounded-sm" />Rescheduled</span>
                    </div>
                  </div>

                  <div className="h-44 flex items-end justify-between gap-3 pt-6 border-b border-gray-100 pb-2">
                    {[
                      { day: "Sat", complete: 7, cancel: 2.5, change: 4.5 },
                      { day: "Sun", complete: 6, cancel: 2.1, change: 4 },
                      { day: "Mon", complete: 10, cancel: 3.5, change: 6.5 },
                      { day: "Tue", complete: 9, cancel: 3.2, change: 6 },
                      { day: "Wed", complete: 8, cancel: 2.8, change: 5.5 },
                      { day: "Thu", complete: 7, cancel: 2.4, change: 4.5 },
                      { day: "Fri", complete: 4, cancel: 1.4, change: 2.5 },
                    ].map((item) => (
                      <div key={item.day} className="flex-1 flex flex-col items-center gap-1">
                        <div className="w-full flex items-end justify-center gap-1 h-32">
                          <div className="w-2.5 bg-emerald-500 rounded-t-sm" style={{ height: `${item.complete * 9}px` }} />
                          <div className="w-2.5 bg-rose-500 rounded-t-sm" style={{ height: `${item.cancel * 9}px` }} />
                          <div className="w-2.5 bg-indigo-500 rounded-t-sm" style={{ height: `${item.change * 9}px` }} />
                        </div>
                        <span className="text-[10px] text-gray-500 font-bold">{item.day}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Line Trend Chart */}
                <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-extrabold text-[#0D2C4A]">Revenue & Growth Trend</h3>
                    <span className="text-xs font-mono font-bold text-gray-400">৳60,000 max</span>
                  </div>

                  <div className="h-44 relative flex flex-col justify-between pt-2">
                    <div className="w-full border-b border-gray-100 text-[9px] text-gray-400 font-mono">60000</div>
                    <div className="w-full border-b border-gray-100 text-[9px] text-gray-400 font-mono">45000</div>
                    <div className="w-full border-b border-gray-100 text-[9px] text-gray-400 font-mono">30000</div>
                    <div className="w-full border-b border-gray-100 text-[9px] text-gray-400 font-mono">15000</div>
                    <div className="w-full border-b border-gray-100 text-[9px] text-gray-400 font-mono">0</div>

                    <svg className="absolute inset-0 w-full h-full p-2 overflow-visible">
                      <path
                        d="M 10 90 Q 60 70, 120 75 T 240 60 T 360 30"
                        fill="none"
                        stroke="#00A896"
                        strokeWidth="3"
                      />
                      <path
                        d="M 10 95 Q 60 75, 120 70 T 240 65 T 360 25"
                        fill="none"
                        stroke="#E54D2E"
                        strokeWidth="2"
                      />
                    </svg>
                  </div>

                  <div className="flex justify-between text-[10px] font-bold text-gray-400 pt-1 font-mono">
                    <span>Jan</span>
                    <span>Feb</span>
                    <span>Mar</span>
                    <span>Apr</span>
                    <span>May</span>
                    <span>Jun</span>
                    <span>Jul</span>
                  </div>
                </div>
              </div>

              {/* Activity Feed */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-sm space-y-4">
                <h3 className="text-base font-extrabold text-[#0D2C4A]">Recent Platform Activity</h3>

                <div className="space-y-3.5 pt-1">
                  <div className="flex items-center gap-3 text-xs font-medium text-gray-700">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 flex-shrink-0" />
                    <div>
                      <span className="font-bold text-[#0D2C4A]">New Student Registration (Rakib Hasan)</span>
                      <span className="text-[10px] text-gray-400 block font-mono">10 minutes ago</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 text-xs font-medium text-gray-700">
                    <span className="w-2.5 h-2.5 rounded-full bg-blue-500 flex-shrink-0" />
                    <div>
                      <span className="font-bold text-[#0D2C4A]">Tutor Rafat Tanvir completed Class X Physics Live Session</span>
                      <span className="text-[10px] text-gray-400 block font-mono">23 minutes ago</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 text-xs font-medium text-gray-700">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500 flex-shrink-0" />
                    <div>
                      <span className="font-bold text-[#0D2C4A]">Pricing Plan Enquiry Pending (Tanzim Ahmed)</span>
                      <span className="text-[10px] text-gray-400 block font-mono">2 hours ago</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 1: STUDENT REQUESTS */}
          {activeTab === "enrollments" && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-sm space-y-6">
              <div className="flex items-center justify-between flex-wrap gap-4 pb-4 border-b border-gray-100">
                <div>
                  <h3 className="font-sans text-xl font-extrabold text-[#0D2C4A]">
                    Student Booking Requests (Submitted Anywhere on Platform)
                  </h3>
                  <p className="text-xs text-gray-500 font-medium pt-0.5">
                    Requests submitted via Hero, Subjects, Pricing, Batch Schedule, and Navbar forms
                  </p>
                </div>

                <div className="relative w-full sm:w-64">
                  <input
                    type="text"
                    placeholder="Search name, phone, subject..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-gray-300 text-xs focus:outline-none focus:ring-2 focus:ring-[#00A896]"
                  />
                  <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                </div>
              </div>

              {enrollments.length === 0 ? (
                <div className="text-center py-12 text-gray-400">
                  No student requests submitted yet.
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="border-b border-gray-200 text-gray-500 uppercase font-mono">
                        <th className="py-3 px-4 font-bold">ID</th>
                        <th className="py-3 px-4 font-bold">Student Name</th>
                        <th className="py-3 px-4 font-bold">Phone Number</th>
                        <th className="py-3 px-4 font-bold">Class & Subjects</th>
                        <th className="py-3 px-4 font-bold">District / Time</th>
                        <th className="py-3 px-4 font-bold">Plan & Fee</th>
                        <th className="py-3 px-4 font-bold">Status</th>
                        <th className="py-3 px-4 font-bold text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 font-medium text-gray-700">
                      {enrollments
                        .filter(
                          (e) =>
                            e.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            e.phone.includes(searchQuery) ||
                            e.grade.toLowerCase().includes(searchQuery.toLowerCase())
                        )
                        .map((e) => (
                          <tr key={e.id} className="hover:bg-gray-50/80 transition-colors">
                            <td className="py-3.5 px-4 font-mono text-[#00A896] font-bold">{e.id}</td>
                            <td className="py-3.5 px-4 font-bold text-[#0D2C4A]">{e.studentName}</td>
                            <td className="py-3.5 px-4 font-mono font-bold text-blue-600">
                              <a href={`tel:${e.phone}`} className="hover:underline">
                                {e.phone}
                              </a>
                            </td>
                            <td className="py-3.5 px-4">
                              <span className="font-bold block text-[#0D2C4A]">{e.grade}</span>
                              <span className="text-[11px] text-gray-500">
                                {e.selectedSubjects ? e.selectedSubjects.join(", ") : "General"}
                              </span>
                            </td>
                            <td className="py-3.5 px-4">
                              <span className="block">{e.district}</span>
                              <span className="text-[11px] text-gray-400 font-mono">{e.preferredTime}</span>
                            </td>
                            <td className="py-3.5 px-4 font-mono">
                              <span className="font-bold text-[#00A896]">৳{e.fee}</span> / mo
                            </td>
                            <td className="py-3.5 px-4">
                              <select
                                value={e.status}
                                onChange={(evt) => handleUpdateEnrollmentStatus(e.id, evt.target.value)}
                                className={`text-xs font-bold px-2.5 py-1 rounded-full border focus:outline-none ${
                                  e.status === "Pending"
                                    ? "bg-amber-50 text-amber-700 border-amber-300"
                                    : e.status === "Contacted"
                                    ? "bg-blue-50 text-blue-700 border-blue-300"
                                    : e.status === "Enrolled"
                                    ? "bg-emerald-50 text-emerald-700 border-emerald-300"
                                    : "bg-red-50 text-red-700 border-red-300"
                                }`}
                              >
                                <option value="Pending">Pending</option>
                                <option value="Contacted">Contacted</option>
                                <option value="Enrolled">Enrolled</option>
                                <option value="Rejected">Rejected</option>
                              </select>
                            </td>
                            <td className="py-3.5 px-4 text-right">
                              <button
                                onClick={() => handleDeleteEnrollment(e.id)}
                                className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: PRICING PLAN REQUESTS */}
          {activeTab === "pricing" && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-sm space-y-6">
              <div className="pb-4 border-b border-gray-100">
                <h3 className="font-sans text-xl font-extrabold text-[#0D2C4A]">
                  Pricing Plan Enquiries & Custom Budget Bookings
                </h3>
                <p className="text-xs text-gray-500 font-medium pt-0.5">
                  Requests submitted via the flexible fee calculator section
                </p>
              </div>

              {pricingRequests.length === 0 ? (
                <div className="text-center py-12 text-gray-400">
                  No pricing plan requests submitted yet.
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="border-b border-gray-200 text-gray-500 uppercase font-mono">
                        <th className="py-3 px-4 font-bold">ID</th>
                        <th className="py-3 px-4 font-bold">Student Name</th>
                        <th className="py-3 px-4 font-bold">Phone Number</th>
                        <th className="py-3 px-4 font-bold">Plan Name</th>
                        <th className="py-3 px-4 font-bold">Duration</th>
                        <th className="py-3 px-4 font-bold">Monthly Fee</th>
                        <th className="py-3 px-4 font-bold">Status</th>
                        <th className="py-3 px-4 font-bold text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 font-medium text-gray-700">
                      {pricingRequests.map((pr) => (
                        <tr key={pr.id} className="hover:bg-gray-50/80 transition-colors">
                          <td className="py-3.5 px-4 font-mono text-amber-600 font-bold">{pr.id}</td>
                          <td className="py-3.5 px-4 font-bold text-[#0D2C4A]">{pr.studentName}</td>
                          <td className="py-3.5 px-4 font-mono font-bold text-blue-600">{pr.phone}</td>
                          <td className="py-3.5 px-4 font-bold text-[#0D2C4A]">{pr.planName}</td>
                          <td className="py-3.5 px-4">{pr.duration}</td>
                          <td className="py-3.5 px-4 font-mono font-bold text-[#00A896]">৳{pr.monthlyFee}</td>
                          <td className="py-3.5 px-4">
                            <select
                              value={pr.status}
                              onChange={(evt) => handleUpdatePricingStatus(pr.id, evt.target.value)}
                              className="text-xs font-bold px-2.5 py-1 rounded-full border border-gray-300"
                            >
                              <option value="Pending">Pending</option>
                              <option value="Contacted">Contacted</option>
                              <option value="Completed">Completed</option>
                              <option value="Cancelled">Cancelled</option>
                            </select>
                          </td>
                          <td className="py-3.5 px-4 text-right">
                            <button
                              onClick={() => {
                                if (confirm("Delete pricing request?")) {
                                  fetch(`/api/pricing-requests?id=${pr.id}`, { method: "DELETE" }).then(
                                    fetchAllData
                                  );
                                }
                              }}
                              className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: CONTACT MESSAGES */}
          {activeTab === "contacts" && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-sm space-y-6">
              <div className="pb-4 border-b border-gray-100">
                <h3 className="font-sans text-xl font-extrabold text-[#0D2C4A]">
                  Contact Us Page User Submissions
                </h3>
                <p className="text-xs text-gray-500 font-medium pt-0.5">
                  Inquiries submitted via the /contact form
                </p>
              </div>

              {contacts.length === 0 ? (
                <div className="text-center py-12 text-gray-400">
                  No contact messages received yet.
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {contacts.map((msg) => (
                    <div
                      key={msg.id}
                      className="p-6 rounded-2xl border border-gray-200 bg-[#F8FAFC] space-y-4 relative flex flex-col justify-between"
                    >
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-mono font-bold text-[#00A896] bg-[#00A896]/10 px-2.5 py-1 rounded-md">
                            {msg.id}
                          </span>
                          <span className="text-[11px] text-gray-400 font-mono">
                            {new Date(msg.createdAt).toLocaleDateString()}
                          </span>
                        </div>

                        <h4 className="font-bold text-[#0D2C4A] text-base">{msg.name}</h4>
                        <div className="text-xs text-gray-600 font-mono space-y-0.5">
                          <p>📧 {msg.email}</p>
                          <p>📞 {msg.phone}</p>
                        </div>

                        <div className="pt-2">
                          <strong className="block text-xs text-[#0D2C4A] font-bold">
                            Subject: {msg.subject}
                          </strong>
                          <p className="text-xs text-gray-600 leading-relaxed pt-1 bg-white p-3 rounded-xl border border-gray-200 mt-1">
                            "{msg.message}"
                          </p>
                        </div>
                      </div>

                      <div className="pt-3 border-t border-gray-200 flex items-center justify-between">
                        <a
                          href={`mailto:${msg.email}`}
                          className="text-xs font-bold text-[#00A896] hover:underline flex items-center gap-1"
                        >
                          <Mail className="w-3.5 h-3.5" />
                          <span>Reply Email</span>
                        </a>

                        <button
                          onClick={() => handleDeleteContact(msg.id)}
                          className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition-colors text-xs flex items-center gap-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Delete</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 4: INQUIRIES & COMPLAINTS */}
          {activeTab === "inquiries" && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-sm space-y-6">
              <div className="flex items-center justify-between flex-wrap gap-4 pb-4 border-b border-gray-100">
                <div>
                  <h3 className="font-sans text-xl font-extrabold text-[#0D2C4A]">
                    Inquiries & Support Hotline Tickets
                  </h3>
                  <p className="text-xs text-gray-500 font-medium pt-0.5">
                    Direct phone inquiries and complaint tickets logged by guardians
                  </p>
                </div>

                <button
                  onClick={() => setShowAddInquiry(true)}
                  className="px-4 py-2.5 rounded-xl bg-[#00A896] hover:bg-[#008075] text-white text-xs font-extrabold flex items-center gap-1.5 shadow-md cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Log Support Ticket</span>
                </button>
              </div>

              {/* Add Inquiry Form Modal */}
              {showAddInquiry && (
                <form onSubmit={handleCreateInquiry} className="p-6 bg-[#F8FAFC] rounded-2xl border border-[#00A896]/30 space-y-4">
                  <h4 className="font-bold text-[#0D2C4A] text-base">New Support / Hotline Ticket</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-[#0D2C4A] mb-1">Name</label>
                      <input
                        type="text"
                        required
                        value={newInquiryName}
                        onChange={(e) => setNewInquiryName(e.target.value)}
                        placeholder="Inquirer name..."
                        className="w-full p-2.5 rounded-xl border border-gray-300 text-xs focus:outline-none focus:ring-2 focus:ring-[#00A896]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-[#0D2C4A] mb-1">Phone Number</label>
                      <input
                        type="text"
                        required
                        value={newInquiryPhone}
                        onChange={(e) => setNewInquiryPhone(e.target.value)}
                        placeholder="017XXXXXXXX"
                        className="w-full p-2.5 rounded-xl border border-gray-300 text-xs focus:outline-none focus:ring-2 focus:ring-[#00A896]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#0D2C4A] mb-1">Subject</label>
                    <input
                      type="text"
                      required
                      value={newInquirySubject}
                      onChange={(e) => setNewInquirySubject(e.target.value)}
                      placeholder="e.g. Class Schedule Change Request"
                      className="w-full p-2.5 rounded-xl border border-gray-300 text-xs focus:outline-none focus:ring-2 focus:ring-[#00A896]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#0D2C4A] mb-1">Details / Note</label>
                    <textarea
                      required
                      rows={3}
                      value={newInquiryMessage}
                      onChange={(e) => setNewInquiryMessage(e.target.value)}
                      placeholder="Describe the query or resolution needed..."
                      className="w-full p-2.5 rounded-xl border border-gray-300 text-xs focus:outline-none focus:ring-2 focus:ring-[#00A896]"
                    />
                  </div>

                  <div className="flex justify-end gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setShowAddInquiry(false)}
                      className="px-4 py-2 rounded-xl bg-gray-200 text-gray-700 text-xs font-bold"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 rounded-xl bg-[#00A896] text-white text-xs font-bold hover:bg-[#008075]"
                    >
                      Save Ticket
                    </button>
                  </div>
                </form>
              )}

              {inquiries.length === 0 ? (
                <div className="text-center py-12 text-gray-400">
                  No inquiries logged yet.
                </div>
              ) : (
                <div className="space-y-4">
                  {inquiries.map((inq) => (
                    <div key={inq.id} className="p-5 rounded-2xl bg-[#F8FAFC] border border-gray-200 space-y-3 flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="space-y-1.5">
                        <div className="flex items-center gap-3">
                          <span className="text-xs font-mono font-bold text-rose-600 bg-rose-50 px-2.5 py-0.5 rounded-md border border-rose-200">
                            {inq.id}
                          </span>
                          <span className="text-[11px] text-gray-400 font-mono">
                            {new Date(inq.createdAt || Date.now()).toLocaleDateString()}
                          </span>
                        </div>
                        <h4 className="font-bold text-[#0D2C4A] text-base">{inq.name} ({inq.phone})</h4>
                        <p className="text-xs font-bold text-[#00A896]">Subject: {inq.subject}</p>
                        <p className="text-xs text-gray-600 bg-white p-3 rounded-xl border border-gray-200 leading-relaxed">
                          "{inq.message}"
                        </p>
                      </div>

                      <div className="flex items-center gap-3 self-end md:self-center">
                        <select
                          value={inq.status}
                          onChange={(evt) => handleUpdateInquiryStatus(inq.id, evt.target.value)}
                          className={`text-xs font-bold px-3 py-1.5 rounded-full border focus:outline-none ${
                            inq.status === "Open"
                              ? "bg-rose-50 text-rose-700 border-rose-300"
                              : inq.status === "In Progress"
                              ? "bg-amber-50 text-amber-700 border-amber-300"
                              : "bg-emerald-50 text-emerald-700 border-emerald-300"
                          }`}
                        >
                          <option value="Open">Open</option>
                          <option value="In Progress">In Progress</option>
                          <option value="Resolved">Resolved</option>
                        </select>

                        <button
                          onClick={() => handleDeleteInquiry(inq.id)}
                          className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB: TEACHER APPLICATIONS */}
          {activeTab === "teacher-applications" && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-sm space-y-6">
              <div className="pb-4 border-b border-gray-100">
                <h3 className="font-sans text-xl font-extrabold text-[#0D2C4A]">
                  Mentor & Teacher Onboarding Applications
                </h3>
                <p className="text-xs text-gray-500 font-medium pt-0.5">
                  Applications submitted via the "Become a Teacher" flow. Approving an applicant automatically adds them to public tutors.
                </p>
              </div>

              {teacherApplications.length === 0 ? (
                <div className="text-center py-12 text-gray-400">
                  No teacher applications submitted yet.
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {teacherApplications.map((app) => (
                    <div
                      key={app.id}
                      className="p-6 rounded-2xl border border-gray-200 bg-[#F8FAFC] space-y-4 flex flex-col justify-between"
                    >
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-mono font-bold text-amber-600 bg-amber-50 px-2.5 py-1 rounded-md border border-amber-200">
                            {app.id}
                          </span>
                          <select
                            value={app.status}
                            onChange={(evt) => handleUpdateTeacherApplicationStatus(app.id, evt.target.value)}
                            className={`text-xs font-bold px-3 py-1 rounded-full border focus:outline-none ${
                              app.status === "Pending"
                                ? "bg-amber-50 text-amber-700 border-amber-300"
                                : app.status === "Approved"
                                ? "bg-emerald-50 text-emerald-700 border-emerald-300"
                                : "bg-red-50 text-red-700 border-red-300"
                            }`}
                          >
                            <option value="Pending">Pending</option>
                            <option value="Approved">Approved</option>
                            <option value="Rejected">Rejected</option>
                          </select>
                        </div>

                        <div>
                          <h4 className="font-bold text-[#0D2C4A] text-lg">{app.fullName}</h4>
                          <p className="text-xs font-bold text-[#00A896]">{app.institution}</p>
                        </div>

                        <div className="bg-white p-3.5 rounded-xl border border-gray-200 text-xs space-y-1.5">
                          <p className="font-bold text-[#0D2C4A]">Subject: {app.subjectExpertise}</p>
                          <p className="text-gray-600">Weekly Hours: {app.hoursPerWeek}</p>
                          <p className="text-gray-600 font-mono">📧 {app.email}</p>
                          <p className="text-gray-600 font-mono">📞 {app.phone}</p>
                        </div>
                      </div>

                      <div className="pt-3 border-t border-gray-200 flex items-center justify-between">
                        {app.status !== "Approved" ? (
                          <button
                            onClick={() => handleUpdateTeacherApplicationStatus(app.id, "Approved")}
                            className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold transition-colors flex items-center gap-1"
                          >
                            <CheckCircle className="w-3.5 h-3.5" />
                            <span>Approve Applicant</span>
                          </button>
                        ) : (
                          <span className="text-xs font-bold text-emerald-600 flex items-center gap-1">
                            <CheckCircle className="w-4 h-4" /> Approved & Added to Tutors
                          </span>
                        )}

                        <button
                          onClick={() => handleDeleteTeacherApplication(app.id)}
                          className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition-colors text-xs flex items-center gap-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Delete</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 5: BLOG ARTICLES */}
          {activeTab === "blogs" && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-sm space-y-6">
              <div className="flex items-center justify-between flex-wrap gap-4 pb-4 border-b border-gray-100">
                <div>
                  <h3 className="font-sans text-xl font-extrabold text-[#0D2C4A]">
                    Blog Articles & Announcements Management
                  </h3>
                  <p className="text-xs text-gray-500 font-medium pt-0.5">
                    Create, view, and delete articles published on /blogs
                  </p>
                </div>

                <button
                  onClick={() => setShowAddBlog(true)}
                  className="px-4 py-2.5 rounded-xl bg-[#00A896] hover:bg-[#008075] text-white text-xs font-extrabold flex items-center gap-1.5 shadow-md cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Create New Article</span>
                </button>
              </div>

              {/* Add Blog Form Modal */}
              {showAddBlog && (
                <form onSubmit={handleCreateBlog} className="p-6 bg-[#F8FAFC] rounded-2xl border border-[#00A896]/30 space-y-4">
                  <h4 className="font-bold text-[#0D2C4A] text-base">New Blog Article</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-[#0D2C4A] mb-1">Title (Bangla)</label>
                      <input
                        type="text"
                        required
                        value={newBlogTitleBn}
                        onChange={(e) => setNewBlogTitleBn(e.target.value)}
                        placeholder="নিবন্ধের শিরোনাম..."
                        className="w-full p-2.5 rounded-xl border border-gray-300 text-xs focus:outline-none focus:ring-2 focus:ring-[#00A896]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-[#0D2C4A] mb-1">Title (English)</label>
                      <input
                        type="text"
                        required
                        value={newBlogTitleEn}
                        onChange={(e) => setNewBlogTitleEn(e.target.value)}
                        placeholder="Article Title..."
                        className="w-full p-2.5 rounded-xl border border-gray-300 text-xs focus:outline-none focus:ring-2 focus:ring-[#00A896]"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setShowAddBlog(false)}
                      className="px-4 py-2 rounded-xl bg-gray-200 text-gray-700 text-xs font-bold"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 rounded-xl bg-[#00A896] text-white text-xs font-bold hover:bg-[#008075]"
                    >
                      Publish Article
                    </button>
                  </div>
                </form>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {blogs.map((b) => (
                  <div key={b.id} className="bg-[#F8FAFC] rounded-2xl overflow-hidden border border-gray-200 shadow-sm p-5 space-y-3 flex flex-col justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#00A896] bg-[#00A896]/10 px-2.5 py-1 rounded-md">
                          {b.category}
                        </span>
                        <Link
                          href={`/blogs/${b.id}`}
                          target="_blank"
                          className="text-xs text-blue-600 font-bold hover:underline flex items-center gap-1"
                        >
                          <span>View Page</span>
                          <ExternalLink className="w-3 h-3" />
                        </Link>
                      </div>

                      <h4 className="font-bold text-[#0D2C4A] text-sm leading-snug line-clamp-2">{b.titleBn}</h4>
                      <p className="text-xs text-gray-500 line-clamp-2">{b.excerptBn}</p>
                    </div>

                    <div className="pt-3 border-t border-gray-200 flex items-center justify-between">
                      <span className="text-[11px] text-gray-400 font-mono">{b.publishedDateBn}</span>
                      <button
                        onClick={() => handleDeleteBlog(b.id)}
                        className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 6: FAQS MANAGEMENT */}
          {activeTab === "faqs" && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-sm space-y-6">
              <div className="flex items-center justify-between flex-wrap gap-4 pb-4 border-b border-gray-100">
                <div>
                  <h3 className="font-sans text-xl font-extrabold text-[#0D2C4A]">
                    Frequently Asked Questions (FAQ) Management
                  </h3>
                  <p className="text-xs text-gray-500 font-medium pt-0.5">
                    Add, edit, or delete questions rendered in the FAQ section
                  </p>
                </div>

                <button
                  onClick={() => setShowAddFaq(true)}
                  className="px-4 py-2.5 rounded-xl bg-[#00A896] hover:bg-[#008075] text-white text-xs font-extrabold flex items-center gap-1.5 shadow-md cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add New FAQ</span>
                </button>
              </div>

              {/* Add FAQ Form */}
              {showAddFaq && (
                <form onSubmit={handleCreateFaq} className="p-6 bg-[#F8FAFC] rounded-2xl border border-[#00A896]/30 space-y-4">
                  <h4 className="font-bold text-[#0D2C4A] text-base">New FAQ Item</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-[#0D2C4A] mb-1">Question (Bangla)</label>
                      <input
                        type="text"
                        required
                        value={newFaqQBn}
                        onChange={(e) => setNewFaqQBn(e.target.value)}
                        placeholder="প্রশ্ন..."
                        className="w-full p-2.5 rounded-xl border border-gray-300 text-xs focus:outline-none focus:ring-2 focus:ring-[#00A896]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-[#0D2C4A] mb-1">Question (English)</label>
                      <input
                        type="text"
                        required
                        value={newFaqQEn}
                        onChange={(e) => setNewFaqQEn(e.target.value)}
                        placeholder="Question..."
                        className="w-full p-2.5 rounded-xl border border-gray-300 text-xs focus:outline-none focus:ring-2 focus:ring-[#00A896]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-[#0D2C4A] mb-1">Answer (Bangla)</label>
                      <textarea
                        required
                        rows={3}
                        value={newFaqABn}
                        onChange={(e) => setNewFaqABn(e.target.value)}
                        placeholder="উত্তর..."
                        className="w-full p-2.5 rounded-xl border border-gray-300 text-xs focus:outline-none focus:ring-2 focus:ring-[#00A896]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-[#0D2C4A] mb-1">Answer (English)</label>
                      <textarea
                        required
                        rows={3}
                        value={newFaqAEn}
                        onChange={(e) => setNewFaqAEn(e.target.value)}
                        placeholder="Answer..."
                        className="w-full p-2.5 rounded-xl border border-gray-300 text-xs focus:outline-none focus:ring-2 focus:ring-[#00A896]"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setShowAddFaq(false)}
                      className="px-4 py-2 rounded-xl bg-gray-200 text-gray-700 text-xs font-bold"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 rounded-xl bg-[#00A896] text-white text-xs font-bold hover:bg-[#008075]"
                    >
                      Save FAQ Item
                    </button>
                  </div>
                </form>
              )}

              <div className="space-y-4">
                {faqs.map((faq, idx) => (
                  <div key={faq.id} className="p-5 rounded-2xl bg-[#F8FAFC] border border-gray-200 space-y-2 flex items-start justify-between gap-4">
                    <div className="space-y-1.5">
                      <span className="text-xs font-mono font-bold text-[#00A896]">FAQ #{idx + 1}</span>
                      <h4 className="font-bold text-[#0D2C4A] text-base">{faq.qBn}</h4>
                      <p className="text-xs text-gray-600 leading-relaxed">{faq.aBn}</p>
                    </div>
                    <button
                      onClick={() => handleDeleteFaq(faq.id)}
                      className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition-colors flex-shrink-0"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 7: TEACHERS MANAGEMENT */}
          {activeTab === "teachers" && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-sm space-y-6">
              <div className="flex items-center justify-between flex-wrap gap-4 pb-4 border-b border-gray-100">
                <div>
                  <h3 className="font-sans text-xl font-extrabold text-[#0D2C4A]">
                    University Tutors & Mentors Management
                  </h3>
                  <p className="text-xs text-gray-500 font-medium pt-0.5">
                    Manage teachers displayed across Mentors sections
                  </p>
                </div>

                <button
                  onClick={() => setShowAddTeacher(true)}
                  className="px-4 py-2.5 rounded-xl bg-[#00A896] hover:bg-[#008075] text-white text-xs font-extrabold flex items-center gap-1.5 shadow-md cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Teacher Profile</span>
                </button>
              </div>

              {/* Add Teacher Form */}
              {showAddTeacher && (
                <form onSubmit={handleCreateTeacher} className="p-6 bg-[#F8FAFC] rounded-2xl border border-[#00A896]/30 space-y-4">
                  <h4 className="font-bold text-[#0D2C4A] text-base">New Teacher Profile</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-[#0D2C4A] mb-1">Name (Bangla)</label>
                      <input
                        type="text"
                        required
                        value={newTeacherNameBn}
                        onChange={(e) => setNewTeacherNameBn(e.target.value)}
                        placeholder="শিক্ষকের নাম..."
                        className="w-full p-2.5 rounded-xl border border-gray-300 text-xs focus:outline-none focus:ring-2 focus:ring-[#00A896]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-[#0D2C4A] mb-1">Name (English)</label>
                      <input
                        type="text"
                        required
                        value={newTeacherNameEn}
                        onChange={(e) => setNewTeacherNameEn(e.target.value)}
                        placeholder="Tutor Name..."
                        className="w-full p-2.5 rounded-xl border border-gray-300 text-xs focus:outline-none focus:ring-2 focus:ring-[#00A896]"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setShowAddTeacher(false)}
                      className="px-4 py-2 rounded-xl bg-gray-200 text-gray-700 text-xs font-bold"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 rounded-xl bg-[#00A896] text-white text-xs font-bold hover:bg-[#008075]"
                    >
                      Save Teacher
                    </button>
                  </div>
                </form>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {teachers.map((t) => (
                  <div key={t.id} className="p-5 rounded-2xl bg-[#F8FAFC] border border-gray-200 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3.5">
                      <img
                        src={t.avatar}
                        alt={t.nameEn}
                        className="w-12 h-12 rounded-xl object-cover border border-[#00A896]"
                      />
                      <div>
                        <h4 className="font-bold text-[#0D2C4A] text-sm">{t.nameBn}</h4>
                        <p className="text-xs text-[#00A896] font-bold">{t.universityBn}</p>
                        <p className="text-[11px] text-gray-500">{t.subjectBn}</p>
                      </div>
                    </div>

                    <button
                      onClick={() => handleDeleteTeacher(t.id)}
                      className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 8: WEBSITE SETTINGS */}
          {activeTab === "settings" && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-sm space-y-6">
              <div className="pb-4 border-b border-gray-100">
                <h3 className="font-sans text-xl font-extrabold text-[#0D2C4A]">
                  Website & Social Media Platform Settings
                </h3>
                <p className="text-xs text-gray-500 font-medium pt-0.5">
                  Update Facebook, Instagram, YouTube links and Institute Contact details shown in footer & header
                </p>
              </div>

              <form onSubmit={handleSaveSettings} className="space-y-6 max-w-2xl">
                <div className="space-y-4">
                  <h4 className="font-bold text-[#0D2C4A] text-sm font-mono uppercase text-[#00A896]">
                    Social Media Links
                  </h4>

                  <div>
                    <label className="block text-xs font-bold text-[#0D2C4A] mb-1">
                      Facebook Page / Group URL
                    </label>
                    <input
                      type="url"
                      required
                      value={settings.facebookUrl}
                      onChange={(e) => setSettings({ ...settings, facebookUrl: e.target.value })}
                      className="w-full p-3 rounded-xl border border-gray-300 text-xs font-mono focus:outline-none focus:ring-2 focus:ring-[#00A896]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#0D2C4A] mb-1">
                      Instagram Profile URL
                    </label>
                    <input
                      type="url"
                      required
                      value={settings.instagramUrl}
                      onChange={(e) => setSettings({ ...settings, instagramUrl: e.target.value })}
                      className="w-full p-3 rounded-xl border border-gray-300 text-xs font-mono focus:outline-none focus:ring-2 focus:ring-[#00A896]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#0D2C4A] mb-1">
                      YouTube Channel URL
                    </label>
                    <input
                      type="url"
                      required
                      value={settings.youtubeUrl}
                      onChange={(e) => setSettings({ ...settings, youtubeUrl: e.target.value })}
                      className="w-full p-3 rounded-xl border border-gray-300 text-xs font-mono focus:outline-none focus:ring-2 focus:ring-[#00A896]"
                    />
                  </div>
                </div>

                <div className="space-y-4 pt-4 border-t border-gray-200">
                  <h4 className="font-bold text-[#0D2C4A] text-sm font-mono uppercase text-[#00A896]">
                    Institute Contact Details
                  </h4>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-[#0D2C4A] mb-1">Phone Number</label>
                      <input
                        type="text"
                        value={settings.phone}
                        onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                        className="w-full p-3 rounded-xl border border-gray-300 text-xs font-mono focus:outline-none focus:ring-2 focus:ring-[#00A896]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-[#0D2C4A] mb-1">Support Email</label>
                      <input
                        type="email"
                        value={settings.email}
                        onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                        className="w-full p-3 rounded-xl border border-gray-300 text-xs font-mono focus:outline-none focus:ring-2 focus:ring-[#00A896]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#0D2C4A] mb-1">Address (Bangla)</label>
                    <input
                      type="text"
                      value={settings.addressBn}
                      onChange={(e) => setSettings({ ...settings, addressBn: e.target.value })}
                      className="w-full p-3 rounded-xl border border-gray-300 text-xs focus:outline-none focus:ring-2 focus:ring-[#00A896]"
                    />
                  </div>
                </div>

                {settingsSaved && (
                  <div className="p-3 bg-emerald-50 text-emerald-700 font-bold text-xs rounded-xl border border-emerald-200 flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-600" />
                    <span>Website settings updated successfully! Changes reflected across site.</span>
                  </div>
                )}

                <button
                  type="submit"
                  className="px-6 py-3.5 rounded-xl bg-[#00A896] hover:bg-[#008075] text-white font-extrabold text-xs shadow-md transition-all cursor-pointer"
                >
                  Save Settings
                </button>
              </form>
            </div>
          )}

          {/* TAB 9: PAYMENTS */}
          {activeTab === "payments" && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-sm space-y-6">
              <div className="flex items-center justify-between flex-wrap gap-4 pb-4 border-b border-gray-100">
                <div>
                  <h3 className="font-sans text-xl font-extrabold text-[#0D2C4A]">
                    Payments & Revenue Ledger Reports
                  </h3>
                  <p className="text-xs text-gray-500 font-medium pt-0.5">
                    Complete financial record of student fee collection and tutor honorarium disbursements
                  </p>
                </div>

                <button
                  onClick={() => setShowAddPayment(true)}
                  className="px-4 py-2.5 rounded-xl bg-[#00A896] hover:bg-[#008075] text-white text-xs font-extrabold flex items-center gap-1.5 shadow-md cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Log New Transaction</span>
                </button>
              </div>

              {/* Dynamic KPI Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-1">
                  <span className="text-xs font-bold text-emerald-700 font-mono uppercase">Total Collected Fees</span>
                  <strong className="text-2xl font-black text-emerald-800 block">
                    ৳{payments
                      .filter((p) => p.type === "Fee Collection" && p.status === "Paid")
                      .reduce((sum, p) => sum + (p.amount || 0), 0)
                      .toLocaleString()}
                  </strong>
                </div>

                <div className="p-5 rounded-2xl bg-amber-50 border border-amber-200 space-y-1">
                  <span className="text-xs font-bold text-amber-700 font-mono uppercase">Pending Payments</span>
                  <strong className="text-2xl font-black text-amber-800 block">
                    ৳{payments
                      .filter((p) => p.status === "Pending")
                      .reduce((sum, p) => sum + (p.amount || 0), 0)
                      .toLocaleString()}
                  </strong>
                </div>

                <div className="p-5 rounded-2xl bg-blue-50 border border-blue-200 space-y-1">
                  <span className="text-xs font-bold text-blue-700 font-mono uppercase">Tutor Honorarium Disbursed</span>
                  <strong className="text-2xl font-black text-blue-800 block">
                    ৳{payments
                      .filter((p) => p.type === "Tutor Honorarium" && p.status === "Paid")
                      .reduce((sum, p) => sum + (p.amount || 0), 0)
                      .toLocaleString()}
                  </strong>
                </div>
              </div>

              {/* Add Payment Form Modal */}
              {showAddPayment && (
                <form onSubmit={handleCreatePayment} className="p-6 bg-[#F8FAFC] rounded-2xl border border-[#00A896]/30 space-y-4">
                  <h4 className="font-bold text-[#0D2C4A] text-base">Log Financial Transaction</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-[#0D2C4A] mb-1">Student / Tutor Name</label>
                      <input
                        type="text"
                        required
                        value={newPaymentName}
                        onChange={(e) => setNewPaymentName(e.target.value)}
                        placeholder="e.g. Rakib Hasan"
                        className="w-full p-2.5 rounded-xl border border-gray-300 text-xs focus:outline-none focus:ring-2 focus:ring-[#00A896]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-[#0D2C4A] mb-1">Phone Number</label>
                      <input
                        type="text"
                        required
                        value={newPaymentPhone}
                        onChange={(e) => setNewPaymentPhone(e.target.value)}
                        placeholder="017XXXXXXXX"
                        className="w-full p-2.5 rounded-xl border border-gray-300 text-xs focus:outline-none focus:ring-2 focus:ring-[#00A896]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-[#0D2C4A] mb-1">Amount (৳)</label>
                      <input
                        type="number"
                        required
                        value={newPaymentAmount}
                        onChange={(e) => setNewPaymentAmount(Number(e.target.value))}
                        className="w-full p-2.5 rounded-xl border border-gray-300 text-xs focus:outline-none focus:ring-2 focus:ring-[#00A896]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#0D2C4A] mb-1">Transaction Type</label>
                      <select
                        value={newPaymentType}
                        onChange={(e) => setNewPaymentType(e.target.value as any)}
                        className="w-full p-2.5 rounded-xl border border-gray-300 text-xs focus:outline-none focus:ring-2 focus:ring-[#00A896] bg-white"
                      >
                        <option value="Fee Collection">Fee Collection (Student)</option>
                        <option value="Tutor Honorarium">Tutor Honorarium (Teacher)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#0D2C4A] mb-1">Payment Method</label>
                      <select
                        value={newPaymentMethod}
                        onChange={(e) => setNewPaymentMethod(e.target.value as any)}
                        className="w-full p-2.5 rounded-xl border border-gray-300 text-xs focus:outline-none focus:ring-2 focus:ring-[#00A896] bg-white"
                      >
                        <option value="bKash">bKash</option>
                        <option value="Nagad">Nagad</option>
                        <option value="Bank Transfer">Bank Transfer</option>
                        <option value="Cash">Cash</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex justify-end gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setShowAddPayment(false)}
                      className="px-4 py-2 rounded-xl bg-gray-200 text-gray-700 text-xs font-bold"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 rounded-xl bg-[#00A896] text-white text-xs font-bold hover:bg-[#008075]"
                    >
                      Save Record
                    </button>
                  </div>
                </form>
              )}

              {/* Transactions Table */}
              {payments.length === 0 ? (
                <div className="text-center py-12 text-gray-400">
                  No payment records found.
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="border-b border-gray-200 text-gray-500 uppercase font-mono">
                        <th className="py-3 px-4 font-bold">ID</th>
                        <th className="py-3 px-4 font-bold">Payer / Recipient</th>
                        <th className="py-3 px-4 font-bold">Phone</th>
                        <th className="py-3 px-4 font-bold">Type</th>
                        <th className="py-3 px-4 font-bold">Method</th>
                        <th className="py-3 px-4 font-bold">Amount</th>
                        <th className="py-3 px-4 font-bold">Status</th>
                        <th className="py-3 px-4 font-bold text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 font-medium text-gray-700">
                      {payments.map((p) => (
                        <tr key={p.id} className="hover:bg-gray-50/80 transition-colors">
                          <td className="py-3.5 px-4 font-mono text-[#00A896] font-bold">{p.id}</td>
                          <td className="py-3.5 px-4 font-bold text-[#0D2C4A]">{p.studentName}</td>
                          <td className="py-3.5 px-4 font-mono font-bold text-blue-600">{p.phone}</td>
                          <td className="py-3.5 px-4">
                            <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                              p.type === "Fee Collection" ? "bg-emerald-50 text-emerald-700" : "bg-blue-50 text-blue-700"
                            }`}>
                              {p.type}
                            </span>
                          </td>
                          <td className="py-3.5 px-4 font-mono font-bold text-gray-600">{p.paymentMethod}</td>
                          <td className="py-3.5 px-4 font-mono font-bold text-[#0D2C4A]">৳{p.amount?.toLocaleString()}</td>
                          <td className="py-3.5 px-4">
                            <select
                              value={p.status}
                              onChange={(evt) => handleUpdatePaymentStatus(p.id, evt.target.value)}
                              className={`text-xs font-bold px-2.5 py-1 rounded-full border focus:outline-none ${
                                p.status === "Paid"
                                  ? "bg-emerald-50 text-emerald-700 border-emerald-300"
                                  : p.status === "Pending"
                                  ? "bg-amber-50 text-amber-700 border-amber-300"
                                  : "bg-red-50 text-red-700 border-red-300"
                              }`}
                            >
                              <option value="Paid">Paid</option>
                              <option value="Pending">Pending</option>
                              <option value="Refunded">Refunded</option>
                            </select>
                          </td>
                          <td className="py-3.5 px-4 text-right">
                            <button
                              onClick={() => handleDeletePayment(p.id)}
                              className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}
        </main>
      </div>
    </main>
  );
}
