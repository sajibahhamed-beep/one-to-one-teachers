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
  Bell,
  ChevronRight,
  Sparkles,
  BookOpen,
  CheckSquare,
  Award,
  BarChart2,
  User,
  Filter,
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
    if (passcode === "admin123" || passcode === "admin" || passcode === "2026") {
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

  // Update Teacher Application Status
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

  if (!mounted) return null;

  // Passcode Lock Screen
  if (!isAuthenticated) {
    return (
      <main className="min-h-screen bg-[#0D2C4A] flex items-center justify-center p-6 font-sans">
        <div className="bg-white rounded-3xl p-8 sm:p-10 max-w-md w-full shadow-2xl border border-[#00A896]/20 text-center space-y-6">
          <div className="w-16 h-16 bg-[#E6F4F3] text-[#00A896] rounded-2xl flex items-center justify-center mx-auto shadow-inner">
            <Lock className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold text-[#0D2C4A] tracking-tight">ototeacher Admin</h1>
            <p className="text-xs text-slate-500 font-mono pt-1">One-to-One Tutoring Platform Control Center</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4 text-left">
            <div>
              <label className="block text-xs font-mono font-bold uppercase text-[#0D2C4A] mb-1.5">
                Passcode / গোপন পিন
              </label>
              <input
                type="password"
                required
                placeholder="Enter admin passcode..."
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                className="w-full px-4 py-3.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#00A896] font-mono text-[#0D2C4A]"
              />
            </div>
            {authError && (
              <p className="text-xs text-rose-500 font-bold">ভুল পিনকোড! Passcode is incorrect.</p>
            )}

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-[#00A896] text-white font-extrabold text-sm hover:bg-[#008075] transition-all shadow-md flex items-center justify-center gap-2"
            >
              <span>প্রবেশ করুন / Login</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </div>
      </main>
    );
  }

  // Filtered lists according to searchQuery
  const filteredEnrollments = enrollments.filter(
    (e) =>
      e.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.phone.includes(searchQuery) ||
      e.district.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const pendingEnrollmentsCount = enrollments.filter((e) => e.status === "Pending").length;
  const pendingTeacherAppsCount = teacherApplications.filter((a) => a.status === "Pending").length;

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0D2C4A] font-sans flex overflow-x-hidden">
      
      {/* ===== LEFT NAVIGATION SIDEBAR ===== */}
      <aside className="w-64 flex-shrink-0 bg-[#0D2C4A] text-white flex flex-col justify-between p-6 shadow-2xl border-r border-[#00A896]/20 z-30">
        <div className="space-y-8">
          
          {/* Brand Logo & Header */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#00A896] to-[#38BDF8] flex items-center justify-center shadow-md">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="font-extrabold text-lg text-white tracking-tight block leading-tight">ototeacher</span>
              <span className="text-[10px] font-mono text-[#00A896] uppercase tracking-wider block font-bold">Admin Portal</span>
            </div>
          </div>

          {/* Navigation Links Menu */}
          <nav className="space-y-1.5 font-sans">
            {[
              { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
              { id: "enrollments", label: "Enrollments", icon: Users, count: pendingEnrollmentsCount },
              { id: "teacher-applications", label: "Applications", icon: GraduationCap, count: pendingTeacherAppsCount },
              { id: "pricing", label: "Pricing Plan", icon: DollarSign },
              { id: "contacts", label: "Messages", icon: Mail },
              { id: "inquiries", label: "Inquiries", icon: MessageSquare },
              { id: "teachers", label: "Teachers Directory", icon: UserCheck },
              { id: "blogs", label: "Blog Posts", icon: FileText },
              { id: "faqs", label: "FAQ Items", icon: HelpCircle },
              { id: "settings", label: "Settings", icon: Settings },
            ].map((item) => {
              const IconComp = item.icon;
              const active = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id as any)}
                  className={`w-full relative flex items-center justify-between px-4 py-3 rounded-2xl text-sm font-extrabold transition-all duration-200 cursor-pointer ${
                    active
                      ? "bg-white/12 text-[#00A896] shadow-sm"
                      : "text-slate-300 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  {/* Left Active Indicator Bar */}
                  {active && (
                    <span className="absolute left-0 top-2 bottom-2 w-1.5 bg-[#00A896] rounded-r-full" />
                  )}
                  <div className="flex items-center gap-3">
                    <IconComp className={`w-4 h-4 ${active ? "text-[#00A896]" : "text-slate-400"}`} />
                    <span>{item.label}</span>
                  </div>
                  {item.count !== undefined && item.count > 0 && (
                    <span className="bg-[#FFB627] text-[#0D2C4A] text-[10px] font-mono font-bold px-2 py-0.5 rounded-full">
                      {item.count}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer Logout Button */}
        <div className="pt-6 border-t border-white/10 space-y-3">
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-xs font-bold text-slate-300 hover:bg-white/10 hover:text-white transition-colors"
          >
            <ExternalLink className="w-4 h-4 text-[#00A896]" />
            <span>View Live Website</span>
          </Link>

          <button
            onClick={() => {
              sessionStorage.clear();
              setIsAuthenticated(false);
            }}
            className="w-full flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-xs font-bold text-rose-400 hover:bg-rose-500/10 transition-colors cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>Log Out</span>
          </button>
        </div>
      </aside>

      {/* ===== MAIN CONTENT FEED ===== */}
      <main className="flex-1 flex flex-col min-w-0 bg-[#F8FAFC] overflow-y-auto">
        
        {/* TOP HEADER BAR */}
        <header className="bg-white border-b border-[#0D2C4A]/10 px-8 py-4 sticky top-0 z-20 flex items-center justify-between gap-6 shadow-sm">
          {/* Search Input Box */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search students, teachers, phone or district..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-2.5 rounded-2xl bg-[#F8FAFC] border border-[#0D2C4A]/10 text-sm focus:outline-none focus:border-[#00A896] font-sans text-[#0D2C4A] shadow-inner"
            />
          </div>

          {/* Right Header Status Badges */}
          <div className="flex items-center gap-5">
            {/* Live Date Badge */}
            <div className="hidden md:flex items-center gap-2 text-xs font-mono font-bold text-slate-600 bg-slate-100 px-3.5 py-1.5 rounded-full border border-slate-200">
              <Calendar className="w-3.5 h-3.5 text-[#00A896]" />
              <span>Friday, August 07, 2026</span>
            </div>

            {/* Refresh Data Button */}
            <button
              onClick={fetchAllData}
              title="Refresh Data"
              className="p-2.5 rounded-xl text-slate-500 hover:bg-slate-100 active:scale-95 transition-all border border-slate-200 cursor-pointer"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin text-[#00A896]" : ""}`} />
            </button>

            {/* Notification Icon */}
            <div className="relative p-2.5 rounded-xl bg-slate-100 text-[#0D2C4A] border border-slate-200 cursor-pointer">
              <Bell className="w-4 h-4" />
              {pendingEnrollmentsCount > 0 && (
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-rose-500 rounded-full animate-ping" />
              )}
            </div>

            {/* Admin Profile User Badge */}
            <div className="flex items-center gap-3 pl-2 border-l border-slate-200">
              <div className="w-9 h-9 rounded-full bg-[#0D2C4A] text-white flex items-center justify-center font-extrabold text-sm shadow-md">
                A
              </div>
              <div className="hidden sm:block">
                <strong className="block text-xs font-extrabold text-[#0D2C4A] leading-tight">Admin User</strong>
                <span className="text-[10px] text-slate-400 font-mono">Platform Manager</span>
              </div>
            </div>
          </div>
        </header>

        {/* BODY CONTAINER (Matching Reference 3-Column Grid Layout) */}
        <div className="p-6 md:p-8 grid grid-cols-1 xl:grid-cols-12 gap-8">
          
          {/* CENTER COLUMN (XL 8 Columns) */}
          <div className="xl:col-span-8 space-y-8">
            
            {/* GREETING & HERO HEADER */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#0D2C4A]/10 shadow-sm flex items-center justify-between gap-6">
              <div className="space-y-1">
                <span className="text-xs font-mono font-bold text-[#00A896] uppercase tracking-wider block">
                  Good Morning
                </span>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0D2C4A] tracking-tight">
                  Welcome, Admin!
                </h1>
                <p className="text-xs sm:text-sm text-slate-500 font-normal pt-0.5">
                  Here is your 1-on-1 online tutoring platform overview for today.
                </p>
              </div>

              {/* Action Badge */}
              <div className="hidden sm:flex items-center gap-2 bg-[#E6F4F3] border border-[#00A896]/20 px-4 py-2 rounded-2xl text-xs font-extrabold text-[#00A896]">
                <ShieldCheck className="w-4 h-4 text-[#00A896]" />
                <span>100% Verified System</span>
              </div>
            </div>

            {/* LAST OPENED / PRIORITY REGISTRATIONS (Matching Reference 2-Card Row) */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-extrabold text-[#0D2C4A]">Last Opened Registrations</h2>
                <button
                  onClick={() => setActiveTab("enrollments")}
                  className="text-xs font-extrabold text-[#00A896] hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <span>View All</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {enrollments.slice(0, 2).map((item) => (
                  <div
                    key={item.id}
                    className="bg-white rounded-3xl p-6 border border-[#0D2C4A]/10 shadow-sm hover:shadow-md transition-all space-y-4 flex flex-col justify-between"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-mono font-bold text-[#00A896] bg-[#00A896]/10 px-3 py-1 rounded-full border border-[#00A896]/20">
                          {item.grade}
                        </span>
                        <span
                          className={`text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full ${
                            item.status === "Pending"
                              ? "bg-amber-100 text-amber-800"
                              : item.status === "Enrolled"
                              ? "bg-emerald-100 text-emerald-800"
                              : "bg-slate-100 text-slate-700"
                          }`}
                        >
                          {item.status}
                        </span>
                      </div>

                      {/* Card Preview Banner */}
                      <div className="h-28 bg-[#0D2C4A]/5 rounded-2xl flex items-center justify-center p-4 relative overflow-hidden border border-slate-100">
                        <div className="w-12 h-12 rounded-full bg-[#0D2C4A] text-white flex items-center justify-center font-extrabold text-lg shadow-md">
                          {item.studentName.charAt(0)}
                        </div>
                        <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-md px-3 py-0.5 rounded-full text-[10px] font-mono font-bold text-[#0D2C4A]">
                          📍 {item.district}
                        </div>
                      </div>

                      <div>
                        <h3 className="font-bold text-base text-[#0D2C4A]">{item.studentName}</h3>
                        <p className="text-xs text-slate-500 font-mono">{item.phone}</p>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs font-bold">
                      <span className="text-[#00A896]">৳{item.fee} / mo</span>
                      <button
                        onClick={() => setActiveTab("enrollments")}
                        className="px-3.5 py-1.5 rounded-xl bg-[#00A896] text-white text-xs font-extrabold hover:bg-[#008075] transition-all cursor-pointer"
                      >
                        Manage
                      </button>
                    </div>
                  </div>
                ))}

                {enrollments.length === 0 && (
                  <div className="col-span-2 bg-white rounded-3xl p-8 text-center text-slate-400 text-sm border border-slate-200">
                    No recent enrollment registrations found.
                  </div>
                )}
              </div>
            </div>

            {/* DYNAMIC TAB MAIN DATA CONTENT */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#0D2C4A]/10 shadow-sm space-y-6">
              
              {/* ===== TAB 1: DASHBOARD OVERVIEW ===== */}
              {activeTab === "dashboard" && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-xl font-extrabold text-[#0D2C4A]">Student Enrollments Overview</h2>
                      <p className="text-xs text-slate-500">Live feed of student tutor requests nationwide</p>
                    </div>
                    <button
                      onClick={() => setActiveTab("enrollments")}
                      className="px-4 py-2 rounded-xl bg-[#0D2C4A] text-white text-xs font-extrabold hover:bg-[#16385C] transition-all cursor-pointer"
                    >
                      View All Enrollments
                    </button>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs font-sans">
                      <thead>
                        <tr className="bg-slate-50 text-[#0D2C4A] font-mono uppercase font-bold border-b border-slate-200">
                          <th className="p-3.5">Student</th>
                          <th className="p-3.5">Phone</th>
                          <th className="p-3.5">Grade</th>
                          <th className="p-3.5">District</th>
                          <th className="p-3.5">Fee</th>
                          <th className="p-3.5">Status</th>
                          <th className="p-3.5 text-right">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 text-slate-700">
                        {enrollments.slice(0, 5).map((e) => (
                          <tr key={e.id} className="hover:bg-slate-50/80 transition-colors">
                            <td className="p-3.5 font-bold text-[#0D2C4A]">{e.studentName}</td>
                            <td className="p-3.5 font-mono">{e.phone}</td>
                            <td className="p-3.5">{e.grade}</td>
                            <td className="p-3.5 font-semibold text-[#00A896]">{e.district}</td>
                            <td className="p-3.5 font-mono font-bold">৳{e.fee}</td>
                            <td className="p-3.5">
                              <span
                                className={`px-2.5 py-1 rounded-full text-[10px] font-mono font-bold ${
                                  e.status === "Pending"
                                    ? "bg-amber-100 text-amber-800"
                                    : e.status === "Enrolled"
                                    ? "bg-emerald-100 text-emerald-800"
                                    : "bg-slate-100 text-slate-700"
                                }`}
                              >
                                {e.status}
                              </span>
                            </td>
                            <td className="p-3.5 text-right space-x-2">
                              <button
                                onClick={() => handleUpdateEnrollmentStatus(e.id, "Enrolled")}
                                className="p-1.5 rounded-lg bg-emerald-50 text-emerald-600 hover:bg-emerald-100 transition-colors"
                                title="Mark Enrolled"
                              >
                                <CheckCircle className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleDeleteEnrollment(e.id)}
                                className="p-1.5 rounded-lg bg-rose-50 text-rose-600 hover:bg-rose-100 transition-colors"
                                title="Delete"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </td>
                          </tr>
                        ))}
                        {enrollments.length === 0 && (
                          <tr>
                            <td colSpan={7} className="p-6 text-center text-slate-400">
                              No student enrollments submitted yet.
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* ===== TAB 2: ENROLLMENTS MANAGEMENT ===== */}
              {activeTab === "enrollments" && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-xl font-extrabold text-[#0D2C4A]">Student Registrations ({filteredEnrollments.length})</h2>
                      <p className="text-xs text-slate-500">Manage all student 1-on-1 tutoring requests</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {filteredEnrollments.map((e) => (
                      <div key={e.id} className="bg-slate-50 rounded-2xl p-5 border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-3">
                            <h3 className="font-extrabold text-base text-[#0D2C4A]">{e.studentName}</h3>
                            <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-full bg-[#00A896]/10 text-[#00A896]">
                              {e.grade}
                            </span>
                          </div>
                          <p className="text-xs text-slate-600 font-mono">
                            📞 {e.phone} · 📍 {e.district} · 🕒 {e.preferredTime}
                          </p>
                          <p className="text-xs font-bold text-slate-500">
                            Subjects: {e.selectedSubjects ? e.selectedSubjects.join(", ") : "All"}
                          </p>
                        </div>

                        <div className="flex items-center gap-3">
                          <select
                            value={e.status}
                            onChange={(ev) => handleUpdateEnrollmentStatus(e.id, ev.target.value)}
                            className="text-xs font-bold px-3 py-2 rounded-xl border border-slate-300 bg-white"
                          >
                            <option value="Pending">Pending</option>
                            <option value="Contacted">Contacted</option>
                            <option value="Enrolled">Enrolled</option>
                            <option value="Rejected">Rejected</option>
                          </select>

                          <button
                            onClick={() => handleDeleteEnrollment(e.id)}
                            className="p-2 rounded-xl bg-rose-100 text-rose-600 hover:bg-rose-200 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* ===== TAB 3: TEACHER APPLICATIONS ===== */}
              {activeTab === "teacher-applications" && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-xl font-extrabold text-[#0D2C4A]">Mentor Applications ({teacherApplications.length})</h2>
                      <p className="text-xs text-slate-500">Review teacher join requests from BUET, DU & DMC</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {teacherApplications.map((app) => (
                      <div key={app.id} className="bg-slate-50 rounded-2xl p-5 border border-slate-200 space-y-3 flex flex-col justify-between">
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-mono font-bold text-[#00A896] bg-[#00A896]/10 px-2.5 py-0.5 rounded-full">
                              {app.id}
                            </span>
                            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-slate-200">
                              {app.status || "Pending"}
                            </span>
                          </div>
                          <h3 className="font-extrabold text-base text-[#0D2C4A]">{app.fullName}</h3>
                          <p className="text-xs font-bold text-[#00A896]">🎓 {app.institution}</p>
                          <p className="text-xs text-slate-600 font-mono">📞 {app.phone} · 📧 {app.email}</p>
                          <p className="text-xs text-slate-500 font-medium">Subject: {app.subjectExpertise}</p>
                        </div>

                        <div className="pt-3 border-t border-slate-200 flex items-center justify-between gap-2">
                          <button
                            onClick={() => handleUpdateTeacherApplicationStatus(app.id, "Approved")}
                            className="flex-1 py-2 rounded-xl bg-emerald-600 text-white font-bold text-xs hover:bg-emerald-700 transition-colors"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => handleDeleteTeacherApplication(app.id)}
                            className="p-2 rounded-xl bg-rose-100 text-rose-600 hover:bg-rose-200 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* ===== OTHER TABS FALLBACK CONTENT ===== */}
              {["pricing", "contacts", "inquiries", "teachers", "blogs", "faqs", "settings"].includes(activeTab) && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-xl font-extrabold text-[#0D2C4A] capitalize">{activeTab} Management</h2>
                      <p className="text-xs text-slate-500 font-mono">Control center for {activeTab}</p>
                    </div>
                  </div>

                  {activeTab === "teachers" && (
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      {teachers.map((t) => (
                        <div key={t.id} className="bg-slate-50 rounded-2xl p-4 border border-slate-200 space-y-2">
                          <h3 className="font-bold text-sm text-[#0D2C4A]">{t.nameBn} ({t.nameEn})</h3>
                          <p className="text-xs font-bold text-[#00A896]">{t.universityBn}</p>
                          <p className="text-xs text-slate-500">{t.subjectBn}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  {activeTab === "blogs" && (
                    <div className="space-y-3">
                      {blogs.map((b) => (
                        <div key={b.id} className="bg-slate-50 rounded-2xl p-4 border border-slate-200 flex items-center justify-between">
                          <div>
                            <h3 className="font-bold text-sm text-[#0D2C4A]">{b.titleBn}</h3>
                            <p className="text-xs text-slate-500 font-mono">{b.publishedDateBn}</p>
                          </div>
                          <button onClick={() => handleDeleteBlog(b.id)} className="p-2 text-rose-600 hover:bg-rose-50 rounded-xl">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  {activeTab === "settings" && (
                    <form onSubmit={handleSaveSettings} className="space-y-4 max-w-xl">
                      <div>
                        <label className="block text-xs font-mono font-bold text-[#0D2C4A] mb-1">Phone Number</label>
                        <input
                          type="text"
                          value={settings.phone}
                          onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                          className="w-full p-3 rounded-xl border text-xs font-mono"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-mono font-bold text-[#0D2C4A] mb-1">Support Email</label>
                        <input
                          type="text"
                          value={settings.email}
                          onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                          className="w-full p-3 rounded-xl border text-xs font-mono"
                        />
                      </div>
                      <button type="submit" className="px-6 py-3 rounded-xl bg-[#00A896] text-white font-extrabold text-xs">
                        Save Settings
                      </button>
                      {settingsSaved && <p className="text-xs text-emerald-600 font-bold">Settings saved successfully!</p>}
                    </form>
                  )}
                </div>
              )}

            </div>
          </div>

          {/* ===== RIGHT SIDE ANALYTICS & QUICK TASK COLUMN (XL 4 Columns) ===== */}
          <div className="xl:col-span-4 space-y-6">
            
            {/* CARD 1: LEARNING PROGRESS / MATCH PROGRESS DONUT (Matching Reference Right Top Card) */}
            <div className="bg-white rounded-3xl p-6 border border-[#0D2C4A]/10 shadow-sm space-y-5">
              <div className="flex items-center justify-between">
                <h3 className="font-extrabold text-base text-[#0D2C4A]">Learning Progress</h3>
                <span className="text-xs font-bold text-[#00A896] bg-[#00A896]/10 px-3 py-1 rounded-full font-mono">
                  Daily
                </span>
              </div>

              {/* Progress Summary Metrics Row */}
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="bg-slate-50 p-2.5 rounded-2xl border border-slate-100">
                  <strong className="block font-mono text-sm font-extrabold text-[#0D2C4A]">10/75</strong>
                  <span className="text-[10px] text-slate-400 font-medium block pt-0.5">Completed</span>
                </div>
                <div className="bg-slate-50 p-2.5 rounded-2xl border border-slate-100">
                  <strong className="block font-mono text-sm font-extrabold text-[#00A896]">45/75</strong>
                  <span className="text-[10px] text-slate-400 font-medium block pt-0.5">In progress</span>
                </div>
                <div className="bg-slate-50 p-2.5 rounded-2xl border border-slate-100">
                  <strong className="block font-mono text-sm font-extrabold text-amber-600">20/75</strong>
                  <span className="text-[10px] text-slate-400 font-medium block pt-0.5">Not started</span>
                </div>
              </div>

              {/* SVG Donut Ring Graphic (Matching Reference Center Circle) */}
              <div className="flex flex-col items-center justify-center pt-2">
                <div className="relative w-36 h-36 flex items-center justify-center">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="38" stroke="#F1F5F9" strokeWidth="8" fill="transparent" />
                    <circle cx="50" cy="50" r="38" stroke="#00A896" strokeWidth="8" strokeDasharray="238" strokeDashoffset="60" strokeLinecap="round" fill="transparent" />
                    <circle cx="50" cy="50" r="28" stroke="#38BDF8" strokeWidth="6" strokeDasharray="175" strokeDashoffset="50" strokeLinecap="round" fill="transparent" />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-xs text-slate-400 font-mono">Total Hours</span>
                    <strong className="text-sm font-extrabold text-[#0D2C4A]">19h 29min</strong>
                  </div>
                </div>
              </div>
            </div>

            {/* CARD 2: COURSE TASK / ADMINISTRATIVE ACTION LIST (Matching Reference Task Stack) */}
            <div className="bg-white rounded-3xl p-6 border border-[#0D2C4A]/10 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-extrabold text-base text-[#0D2C4A]">Course Task</h3>
                <span className="text-xs font-bold text-[#00A896] hover:underline cursor-pointer">View All</span>
              </div>

              <div className="space-y-3">
                {[
                  { title: "Assign BUET Mentor to Student", time: "2 days remaining", icon: GraduationCap },
                  { title: "Verify DU Graduate Credentials", time: "3 days remaining", icon: ShieldCheck },
                  { title: "Confirm Pay-what-you-can Fee", time: "4 days remaining", icon: DollarSign },
                  { title: "Publish Weekly Mentorship Article", time: "6 days remaining", icon: FileText },
                ].map((task, i) => {
                  const TaskIcon = task.icon;
                  return (
                    <div
                      key={i}
                      className="bg-slate-50 hover:bg-[#E6F4F3]/50 p-3.5 rounded-2xl border border-slate-100 flex items-center justify-between gap-3 transition-colors cursor-pointer group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-[#E6F4F3] text-[#00A896] flex items-center justify-center flex-shrink-0 group-hover:bg-[#00A896] group-hover:text-white transition-colors">
                          <TaskIcon className="w-4.5 h-4.5" />
                        </div>
                        <div>
                          <strong className="block text-xs font-bold text-[#0D2C4A] group-hover:text-[#00A896] transition-colors">
                            {task.title}
                          </strong>
                          <span className="text-[10px] text-slate-400 font-mono block pt-0.5">
                            {task.time}
                          </span>
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  );
                })}
              </div>
            </div>

            {/* CARD 3: LEARNING STATISTICS / MONTHLY BAR CHART GRAPHIC (Matching Reference Bottom Chart) */}
            <div className="bg-white rounded-3xl p-6 border border-[#0D2C4A]/10 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-extrabold text-base text-[#0D2C4A]">Learning Statistic</h3>
                <span className="text-xs font-bold text-[#00A896] bg-[#00A896]/10 px-3 py-1 rounded-full font-mono">
                  Yearly
                </span>
              </div>

              {/* Chart Legends */}
              <div className="flex items-center justify-center gap-4 text-[10px] font-mono font-bold">
                <span className="flex items-center gap-1.5 text-[#0D2C4A]">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#0D2C4A]" /> SSC/HSC
                </span>
                <span className="flex items-center gap-1.5 text-[#00A896]">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#00A896]" /> Science
                </span>
                <span className="flex items-center gap-1.5 text-[#38BDF8]">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#38BDF8]" /> Spoken English
                </span>
              </div>

              {/* Multi-Bar Graphic Visualization */}
              <div className="pt-4 flex items-end justify-between h-40 px-2 border-b border-slate-100 font-mono text-[9px] text-slate-400">
                {["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"].map((m, idx) => {
                  const h1 = [30, 45, 60, 40, 75, 50, 65, 80, 55, 70, 85, 90][idx];
                  const h2 = [20, 30, 40, 25, 50, 35, 45, 60, 40, 50, 60, 70][idx];
                  return (
                    <div key={m} className="flex flex-col items-center gap-1">
                      <div className="w-2 rounded-t-full bg-[#38BDF8]" style={{ height: `${h2}%` }} />
                      <div className="w-2 rounded-t-full bg-[#00A896]" style={{ height: `${h1}%` }} />
                      <span className="pt-1">{m}</span>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

        </div>

      </main>

    </div>
  );
}
