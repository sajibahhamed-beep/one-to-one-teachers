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
  Eye,
  Share2,
  Upload,
} from "lucide-react";
import { SettingData, SocialLinkItem, Enrollment, PricingRequest, ContactMessage, Teacher, FAQItem, TeacherApplication, Inquiry, Payment } from "@/lib/db";
import { BlogPost } from "@/lib/blogsData";

export default function AdminDashboardPage() {
  const [mounted, setMounted] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState("");
  const [authError, setAuthError] = useState(false);

  const [activeTab, setActiveTab] = useState<
    | "dashboard"
    | "enrollments"
    | "teacher-applications"
    | "teachers"
    | "pricing"
    | "inquiries"
    | "contacts"
    | "payments"
    | "blogs"
    | "faqs"
    | "seo"
    | "whatsapp"
    | "settings"
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
    socialLinks: [
      { id: "soc-1", name: "Facebook", iconUrl: "facebook", url: "https://facebook.com" },
      { id: "soc-2", name: "Instagram", iconUrl: "instagram", url: "https://instagram.com" },
      { id: "soc-3", name: "YouTube", iconUrl: "youtube", url: "https://youtube.com" },
      { id: "soc-4", name: "LinkedIn", iconUrl: "linkedin", url: "https://linkedin.com" },
    ],
    whatsappPhone: "8801775551325",
    whatsappMessageBn: "হ্যালো আলো শিক্ষা টিম, ১-অন-১ অনলাইন শিক্ষক সম্পর্কে জানতে চাই।",
    whatsappMessageEn: "Hello Alo Shikkha team, I want to inquire about 1-on-1 online teachers.",
    phone: "01775551325",
    email: "support@aloshikkha.org",
    addressBn: "ধানমণ্ডি, ঢাকা, বাংলাদেশ",
    addressEn: "Dhanmondi, Dhaka, Bangladesh",
    metaTitle: "ototeacher — ১-অন-১ অনলাইন শিক্ষক | One-to-One Teacher for All",
    metaDescription: "বাংলাদেশের ১-অন-১ অনলাইন শিক্ষক প্ল্যাটফর্ম। বুয়েট, ঢাবি ও মেডিকেলের যাচাইকৃত শিক্ষকদের সাথে সরাসরি লাইভ ক্লাস — ঘরে বসে।",
    keywords: "online teacher Bangladesh, ১-অন-১ শিক্ষক, ototeacher, private tutor Bangladesh",
  });
  const [whatsappSaved, setWhatsappSaved] = useState(false);
  const [seoSaved, setSeoSaved] = useState(false);

  // Filter & Search states
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("All");

  // Modal forms
  const [showAddBlog, setShowAddBlog] = useState(false);
  const [showAddFaq, setShowAddFaq] = useState(false);
  const [showAddTeacher, setShowAddTeacher] = useState(false);
  const [showAddInquiry, setShowAddInquiry] = useState(false);
  const [showAddPayment, setShowAddPayment] = useState(false);
  const [showAddSocialModal, setShowAddSocialModal] = useState(false);

  // New Social Media Modal State
  const [newSocialName, setNewSocialName] = useState("");
  const [newSocialIconUrl, setNewSocialIconUrl] = useState("facebook");
  const [newSocialRedirectUrl, setNewSocialRedirectUrl] = useState("");
  const [newSocialIconFilePreview, setNewSocialIconFilePreview] = useState<string | null>(null);

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
  const [newTeacherAvatar, setNewTeacherAvatar] = useState("https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80");

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
      if (resSet && (resSet.facebookUrl || resSet.phone || resSet.metaTitle)) setSettings((prev) => ({ ...prev, ...resSet }));
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
        avatar: newTeacherAvatar,
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

  // Add new dynamic social link item
  const handleAddSocialLink = () => {
    const newItem: SocialLinkItem = {
      id: "soc-" + Date.now(),
      name: "New Social Media",
      iconUrl: "facebook",
      url: "https://",
    };
    setSettings((prev) => ({
      ...prev,
      socialLinks: [...(prev.socialLinks || []), newItem],
    }));
  };

  // Update dynamic social link item
  const handleUpdateSocialLink = (id: string, field: keyof SocialLinkItem, value: string) => {
    setSettings((prev) => ({
      ...prev,
      socialLinks: (prev.socialLinks || []).map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      ),
    }));
  };

  // Remove social link item
  const handleRemoveSocialLink = async (id: string) => {
    const updatedLinks = (settings.socialLinks || []).filter((item) => item.id !== id);
    const updatedSettings = { ...settings, socialLinks: updatedLinks };
    setSettings(updatedSettings);

    await fetch("/api/settings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedSettings),
    });
  };

  const handleSocialIconFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setNewSocialIconUrl(result);
        setNewSocialIconFilePreview(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveNewSocialMedia = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSocialName || !newSocialRedirectUrl) {
      alert("Please enter both platform name and redirect URL.");
      return;
    }

    const newItem: SocialLinkItem = {
      id: "soc-" + Date.now(),
      name: newSocialName,
      iconUrl: newSocialIconUrl || "facebook",
      url: newSocialRedirectUrl,
    };

    const updatedLinks = [...(settings.socialLinks || []), newItem];
    const updatedSettings = { ...settings, socialLinks: updatedLinks };

    setSettings(updatedSettings);

    await fetch("/api/settings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedSettings),
    });

    setShowAddSocialModal(false);
    setNewSocialName("");
    setNewSocialIconUrl("facebook");
    setNewSocialRedirectUrl("");
    setNewSocialIconFilePreview(null);
    setSettingsSaved(true);
    setTimeout(() => setSettingsSaved(false), 3000);
  };

  // Save WhatsApp Settings
  const handleSaveWhatsapp = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch("/api/settings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(settings),
    });
    setWhatsappSaved(true);
    setTimeout(() => setWhatsappSaved(false), 3000);
  };

  // Save SEO Settings
  const handleSaveSeo = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch("/api/settings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(settings),
    });
    setSeoSaved(true);
    setTimeout(() => setSeoSaved(false), 3000);
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
              className="w-full py-3.5 rounded-xl bg-[#00A896] text-white font-extrabold text-sm hover:bg-[#008075] transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>প্রবেশ করুন / Login</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </div>
      </main>
    );
  }

  // Filtered lists according to searchQuery and statusFilter
  const filteredEnrollments = enrollments.filter(
    (e) =>
      (statusFilter === "All" || e.status === statusFilter) &&
      (e.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        e.phone.includes(searchQuery) ||
        e.district.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const pendingEnrollmentsCount = enrollments.filter((e) => e.status === "Pending").length;
  const pendingTeacherAppsCount = teacherApplications.filter((a) => a.status === "Pending").length;

  return (
    <div className="admin-theme min-h-screen bg-[#F8FAFC] text-[#0D2C4A] font-sans flex" data-admin-theme="true">
      
      {/* ===== FIXED LEFT NAVIGATION SIDEBAR ===== */}
      {/* Locked to screen: fixed left-0 top-0 bottom-0 h-screen w-64 */}
      <aside className="fixed left-0 top-0 bottom-0 h-screen w-64 bg-[#0D2C4A] text-white flex flex-col justify-between p-6 shadow-2xl border-r border-[#00A896]/20 z-30 overflow-y-auto">
        <div className="space-y-8">
          
          {/* Brand Logo & Header */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#00A896] to-[#38BDF8] flex items-center justify-center shadow-md">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="font-extrabold text-lg text-white tracking-tight block leading-tight admin-heading-sm">ototeacher</span>
              <span className="admin-kicker text-[#00A896] block font-bold">Admin Portal</span>
            </div>
          </div>

          {/* Navigation Links Menu */}
          <nav className="space-y-1.5 font-sans">
            {[
              { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
              { id: "enrollments", label: "Student Requests", icon: Users, count: pendingEnrollmentsCount },
              { id: "teacher-applications", label: "Mentor Apps", icon: GraduationCap, count: pendingTeacherAppsCount },
              { id: "teachers", label: "Tutors Directory", icon: UserCheck },
              { id: "pricing", label: "Pricing Plan", icon: DollarSign },
              { id: "inquiries", label: "Support Tickets", icon: MessageSquare },
              { id: "contacts", label: "Messages", icon: Mail },
              { id: "payments", label: "Transactions", icon: CreditCard },
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
                  className={`w-full relative flex items-center justify-between px-4 py-3 rounded-2xl text-xs transition-all duration-200 cursor-pointer ${
                    active
                      ? "bg-[#00A896] text-white font-extrabold shadow-md shadow-[#00A896]/25 border border-[#00A896]"
                      : "text-slate-300 hover:bg-white/10 hover:text-white font-semibold"
                  }`}
                >
                  {/* Left Active Indicator Bar */}
                  {active && (
                    <span className="absolute left-0 top-2 bottom-2 w-1.5 bg-white rounded-r-full shadow-sm" />
                  )}
                  <div className="flex items-center gap-3">
                    <IconComp className={`w-4 h-4 ${active ? "text-white" : "text-slate-400"}`} />
                    <span className={`text-xs ${active ? "font-extrabold text-white tracking-tight" : "font-bold text-slate-300"}`}>
                      {item.label}
                    </span>
                  </div>
                  {item.count !== undefined && item.count > 0 && (
                    <span className={`admin-chip-label px-2 py-0.5 rounded-full ${
                      active ? "bg-white text-[#0D2C4A] font-extrabold" : "bg-[#FFB627] text-[#0D2C4A] font-bold"
                    }`}>
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
            className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-xs font-bold text-slate-300 hover:bg-white/10 hover:text-white transition-colors admin-caption-text"
          >
            <ExternalLink className="w-4 h-4 text-[#00A896]" />
            <span>View Live Website</span>
          </Link>

          <button
            onClick={() => {
              sessionStorage.clear();
              setIsAuthenticated(false);
            }}
            className="w-full flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-xs font-bold text-rose-400 hover:bg-rose-500/10 transition-colors cursor-pointer admin-caption-text"
          >
            <LogOut className="w-4 h-4" />
            <span>Log Out</span>
          </button>
        </div>
      </aside>

      {/* ===== MAIN CONTENT FEED (Margin left: ml-64) ===== */}
      <main className="ml-64 flex-1 flex flex-col min-w-0 bg-[#F8FAFC] min-h-screen overflow-y-auto">
        
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
              className="w-full pl-11 pr-4 py-2.5 rounded-2xl bg-[#F8FAFC] border border-[#0D2C4A]/10 text-sm focus:outline-none focus:border-[#00A896] font-sans text-[#0D2C4A] shadow-inner admin-body-text"
            />
          </div>

          {/* Right Header Status Badges */}
          <div className="flex items-center gap-5">
            {/* Live Date Badge */}
            <div className="hidden md:flex items-center gap-2 admin-chip-label text-slate-600 bg-slate-100 px-3.5 py-1.5 rounded-full border border-slate-200">
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
                <strong className="block admin-caption-text font-extrabold text-[#0D2C4A] leading-tight">Admin User</strong>
                <span className="admin-chip-label text-slate-400">Platform Manager</span>
              </div>
            </div>
          </div>
        </header>

        {/* BODY CONTAINER */}
        <div className="p-6 md:p-8 space-y-8 max-w-7xl w-full">
            
            {/* ===== TAB 1: DASHBOARD OVERVIEW ===== */}
            {activeTab === "dashboard" && (
              <div className="space-y-8">
                {/* HERO COMMAND CENTER CARD (WHITE THEME) */}
                <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#0D2C4A]/10 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden bg-gradient-to-br from-white via-slate-50/50 to-[#E6F4F3]/30">
                  <div className="space-y-2 relative z-10 max-w-2xl">
                    <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#E6F4F3] border border-[#00A896]/30 text-[#00A896] admin-caption-text font-extrabold">
                      <Sparkles className="w-3.5 h-3.5 text-[#00A896]" />
                      Welcome Back, Sajib
                    </span>
                    <h1 className="admin-display-xl text-[#0D2C4A]">
                      Portfolio Command Center
                    </h1>
                    <p className="admin-body-text text-slate-500 font-normal leading-relaxed">
                      Manage your dynamic tutoring platform, student requests, teacher profiles, blogs, inquiries, and global site configurations in one place.
                    </p>
                  </div>

                  {/* Action Buttons Top Right */}
                  <div className="flex flex-wrap items-center gap-3 relative z-10">
                    <button
                      onClick={() => setShowAddTeacher(true)}
                      className="px-5 py-3 rounded-2xl bg-[#00A896] hover:bg-[#008075] text-white admin-caption-text font-extrabold transition-all flex items-center gap-2 shadow-md shadow-[#00A896]/20 active:scale-95 cursor-pointer"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add Mentor</span>
                    </button>
                    <button
                      onClick={() => setShowAddBlog(true)}
                      className="px-5 py-3 rounded-2xl bg-[#0D2C4A] hover:bg-[#16385C] text-white admin-caption-text font-extrabold transition-all flex items-center gap-2 shadow-md active:scale-95 cursor-pointer"
                    >
                      <Plus className="w-4 h-4" />
                      <span>New Blog Post</span>
                    </button>
                  </div>
                </div>

                {/* 4 STAT CARDS GRID (WHITE THEME CARDS) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                  
                  {/* CARD 1: PUBLISHED BLOGS */}
                  <div className="bg-white rounded-3xl p-6 border border-[#0D2C4A]/10 shadow-sm hover:shadow-md hover:border-[#00A896]/30 transition-all flex items-center justify-between">
                    <div className="space-y-1">
                      <span className="admin-kicker text-slate-400 block">
                        PUBLISHED BLOGS
                      </span>
                      <div className="admin-stat-num text-[#0D2C4A] pt-1">
                        {blogs.length}
                      </div>
                      <span className="admin-caption-text text-slate-500 block pt-1">
                        Active CMS Articles
                      </span>
                    </div>
                    <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 shadow-sm shrink-0">
                      <FileText className="w-6 h-6" />
                    </div>
                  </div>

                  {/* CARD 2: INQUIRIES RECEIVED */}
                  <div className="bg-white rounded-3xl p-6 border border-[#0D2C4A]/10 shadow-sm hover:shadow-md hover:border-[#00A896]/30 transition-all flex items-center justify-between">
                    <div className="space-y-1">
                      <span className="admin-kicker text-slate-400 block">
                        INQUIRIES RECEIVED
                      </span>
                      <div className="admin-stat-num text-[#0D2C4A] pt-1">
                        {inquiries.length + contacts.length}
                      </div>
                      <span className="admin-caption-text text-slate-500 block pt-1">
                        {inquiries.filter((i) => i.status === "Pending").length} Unread Inquiries
                      </span>
                    </div>
                    <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600 shadow-sm shrink-0">
                      <Mail className="w-6 h-6" />
                    </div>
                  </div>

                  {/* CARD 3: PORTFOLIO VISITORS */}
                  <div className="bg-white rounded-3xl p-6 border border-[#0D2C4A]/10 shadow-sm hover:shadow-md hover:border-[#00A896]/30 transition-all flex items-center justify-between">
                    <div className="space-y-1">
                      <span className="admin-kicker text-slate-400 block">
                        PORTFOLIO VISITORS
                      </span>
                      <div className="admin-stat-num text-[#0D2C4A] pt-1">
                        12,480
                      </div>
                      <span className="admin-caption-text text-[#00A896] block font-bold pt-1">
                        +18.4% this month
                      </span>
                    </div>
                    <div className="w-12 h-12 rounded-2xl bg-[#E6F4F3] border border-[#00A896]/30 flex items-center justify-center text-[#00A896] shadow-sm shrink-0">
                      <Eye className="w-6 h-6" />
                    </div>
                  </div>

                  {/* CARD 4: ACTIVE FAQS */}
                  <div className="bg-white rounded-3xl p-6 border border-[#0D2C4A]/10 shadow-sm hover:shadow-md hover:border-[#00A896]/30 transition-all flex items-center justify-between">
                    <div className="space-y-1">
                      <span className="admin-kicker text-slate-400 block">
                        ACTIVE FAQS
                      </span>
                      <div className="admin-stat-num text-[#0D2C4A] pt-1">
                        {faqs.length}
                      </div>
                      <span className="admin-caption-text text-slate-500 block pt-1">
                        Customer Q&A items
                      </span>
                    </div>
                    <div className="w-12 h-12 rounded-2xl bg-rose-50 border border-rose-200 flex items-center justify-center text-rose-600 shadow-sm shrink-0">
                      <HelpCircle className="w-6 h-6" />
                    </div>
                  </div>
                </div>

                {/* BOTTOM TWO PANELS (WHITE THEME) */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  
                  {/* LEFT PANEL: RECENT CLIENT INQUIRIES */}
                  <div className="bg-white rounded-3xl p-6 border border-[#0D2C4A]/10 shadow-sm space-y-4">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600">
                          <Mail className="w-4 h-4" />
                        </div>
                        <h3 className="font-extrabold text-base text-[#0D2C4A]">Recent Client Inquiries</h3>
                      </div>
                      <button
                        onClick={() => setActiveTab("inquiries")}
                        className="text-xs font-extrabold text-[#00A896] hover:underline flex items-center gap-1 cursor-pointer"
                      >
                        <span>View All</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="space-y-3">
                      {inquiries.slice(0, 4).map((inq) => (
                        <div key={inq.id} className="p-4 rounded-2xl bg-slate-50/90 border border-slate-200/80 flex items-center justify-between gap-3 hover:border-[#00A896]/30 transition-all">
                          <div className="space-y-0.5 min-w-0">
                            <h4 className="font-extrabold text-xs text-[#0D2C4A] truncate">{inq.name}</h4>
                            <p className="text-[11px] text-slate-500 font-mono truncate">{inq.subject || inq.phone}</p>
                          </div>
                          <span className={`text-[10px] font-mono font-bold px-2.5 py-1 rounded-full ${
                            inq.status === "Pending" ? "bg-amber-100 text-amber-800 border border-amber-200" : "bg-emerald-100 text-emerald-800 border border-emerald-200"
                          }`}>
                            {inq.status}
                          </span>
                        </div>
                      ))}
                      {inquiries.length === 0 && (
                        <div className="text-xs text-slate-400 text-center py-6">No recent inquiries recorded yet.</div>
                      )}
                    </div>
                  </div>

                  {/* RIGHT PANEL: RECENT STUDENT REQUESTS */}
                  <div className="bg-white rounded-3xl p-6 border border-[#0D2C4A]/10 shadow-sm space-y-4">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-[#E6F4F3] border border-[#00A896]/30 flex items-center justify-center text-[#00A896]">
                          <Users className="w-4 h-4" />
                        </div>
                        <h3 className="font-extrabold text-base text-[#0D2C4A]">Student Requests</h3>
                      </div>
                      <button
                        onClick={() => setActiveTab("enrollments")}
                        className="text-xs font-extrabold text-[#00A896] hover:underline flex items-center gap-1 cursor-pointer"
                      >
                        <span>Manage All</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="space-y-3">
                      {enrollments.slice(0, 4).map((enr) => (
                        <div key={enr.id} className="p-4 rounded-2xl bg-slate-50/90 border border-slate-200/80 flex items-center justify-between gap-3 hover:border-[#00A896]/30 transition-all">
                          <div className="space-y-0.5 min-w-0">
                            <div className="flex items-center gap-2">
                              <h4 className="font-extrabold text-xs text-[#0D2C4A] truncate">{enr.studentName}</h4>
                              <span className="text-[10px] font-mono font-bold text-[#00A896] bg-[#00A896]/10 border border-[#00A896]/20 px-2 py-0.5 rounded-md">{enr.grade}</span>
                            </div>
                            <p className="text-[11px] text-slate-500 font-mono truncate">📍 {enr.district} · 📞 {enr.phone}</p>
                          </div>
                          <span className={`text-[10px] font-mono font-bold px-2.5 py-1 rounded-full ${
                            enr.status === "Pending" ? "bg-amber-100 text-amber-800 border border-amber-200" : "bg-emerald-100 text-emerald-800 border border-emerald-200"
                          }`}>
                            {enr.status}
                          </span>
                        </div>
                      ))}
                      {enrollments.length === 0 && (
                        <div className="text-xs text-slate-400 text-center py-6">No student requests submitted yet.</div>
                      )}
                    </div>
                  </div>

                </div>
              </div>
            )}

            {/* OTHER TABS WRAPPER */}
            {activeTab !== "dashboard" && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#0D2C4A]/10 shadow-sm space-y-6">

              {/* ===== TAB 2: ENROLLMENTS MANAGEMENT ===== */}
              {activeTab === "enrollments" && (
                <div className="space-y-6">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div>
                      <h2 className="text-xl font-extrabold text-[#0D2C4A]">Student Tutoring Requests ({filteredEnrollments.length})</h2>
                      <p className="text-xs text-slate-500">Manage 1-on-1 online class enrollment requests</p>
                    </div>

                    {/* Status Filter Dropdown */}
                    <div className="flex items-center gap-2">
                      <Filter className="w-4 h-4 text-slate-400" />
                      <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="text-xs font-bold px-3 py-2 rounded-xl border border-slate-300 bg-white"
                      >
                        <option value="All">All Statuses</option>
                        <option value="Pending">Pending</option>
                        <option value="Contacted">Contacted</option>
                        <option value="Enrolled">Enrolled</option>
                        <option value="Rejected">Rejected</option>
                      </select>
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
                      <h2 className="text-xl font-extrabold text-[#0D2C4A]">Mentor Join Applications ({teacherApplications.length})</h2>
                      <p className="text-xs text-slate-500">Review teacher application requests from BUET, DU & DMC</p>
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

              {/* ===== TAB 4: TEACHERS DIRECTORY ===== */}
              {activeTab === "teachers" && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-xl font-extrabold text-[#0D2C4A]">Verified Tutors Directory ({teachers.length})</h2>
                      <p className="text-xs text-slate-500">Public teacher profiles displayed on the platform</p>
                    </div>
                    <button
                      onClick={() => setShowAddTeacher(true)}
                      className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#00A896] text-white text-xs font-extrabold hover:bg-[#008075] transition-all cursor-pointer"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add Tutor</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
                    {teachers.map((t) => (
                      <div key={t.id} className="bg-slate-50 rounded-2xl p-5 border border-slate-200 space-y-3 flex flex-col justify-between">
                        <div className="flex items-center gap-3">
                          <img src={t.avatar} alt={t.nameEn} className="w-12 h-12 rounded-xl object-cover border border-slate-300" />
                          <div>
                            <h3 className="font-extrabold text-sm text-[#0D2C4A]">{t.nameBn}</h3>
                            <p className="text-[11px] text-slate-500 font-mono">{t.nameEn}</p>
                          </div>
                        </div>
                        <div className="space-y-1">
                          <p className="text-xs font-bold text-[#00A896]">🎓 {t.universityBn}</p>
                          <p className="text-xs text-slate-600 font-medium">📚 {t.subjectBn}</p>
                        </div>
                        <div className="pt-2 border-t border-slate-200 flex justify-end">
                          <button
                            onClick={() => handleDeleteTeacher(t.id)}
                            className="p-1.5 rounded-lg bg-rose-100 text-rose-600 hover:bg-rose-200 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* ===== TAB 5: PRICING REQUESTS ===== */}
              {activeTab === "pricing" && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-xl font-extrabold text-[#0D2C4A]">Pricing & Sliding Scale Inquiries ({pricingRequests.length})</h2>
                      <p className="text-xs text-slate-500">Pay-What-You-Can calculator and sponsored track requests</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {pricingRequests.map((p) => (
                      <div key={p.id} className="bg-slate-50 rounded-2xl p-5 border border-slate-200 flex items-center justify-between">
                        <div>
                          <div className="flex items-center gap-3">
                            <h3 className="font-extrabold text-sm text-[#0D2C4A]">{p.planName}</h3>
                            <span className="text-xs font-mono font-bold text-[#00A896]">৳{p.monthlyFee} / mo</span>
                          </div>
                          <p className="text-xs text-slate-600 font-mono">Duration: {p.duration}</p>
                        </div>

                        <select
                          value={p.status}
                          onChange={(e) => handleUpdatePricingStatus(p.id, e.target.value)}
                          className="text-xs font-bold px-3 py-1.5 rounded-xl border border-slate-300 bg-white"
                        >
                          <option value="Pending">Pending</option>
                          <option value="Contacted">Contacted</option>
                          <option value="Completed">Completed</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* ===== TAB 6: SUPPORT TICKETS & INQUIRIES ===== */}
              {activeTab === "inquiries" && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-xl font-extrabold text-[#0D2C4A]">Support Tickets & Inquiries ({inquiries.length})</h2>
                      <p className="text-xs text-slate-500">Parent and student callback tickets</p>
                    </div>
                    <button
                      onClick={() => setShowAddInquiry(true)}
                      className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#00A896] text-white text-xs font-extrabold hover:bg-[#008075] transition-all cursor-pointer"
                    >
                      <Plus className="w-4 h-4" />
                      <span>New Ticket</span>
                    </button>
                  </div>

                  <div className="space-y-4">
                    {inquiries.map((inq) => (
                      <div key={inq.id} className="bg-slate-50 rounded-2xl p-5 border border-slate-200 space-y-2">
                        <div className="flex items-center justify-between">
                          <h3 className="font-extrabold text-sm text-[#0D2C4A]">{inq.name}</h3>
                          <span className="text-xs font-mono text-slate-500">📞 {inq.phone}</span>
                        </div>
                        <p className="text-xs font-bold text-[#00A896]">Subject: {inq.subject}</p>
                        <p className="text-xs text-slate-600 bg-white p-3 rounded-xl border border-slate-100">{inq.message}</p>

                        <div className="flex items-center justify-between pt-2">
                          <select
                            value={inq.status || "Pending"}
                            onChange={(e) => handleUpdateInquiryStatus(inq.id, e.target.value)}
                            className="text-xs font-bold px-3 py-1 rounded-xl border border-slate-300 bg-white"
                          >
                            <option value="Pending">Pending</option>
                            <option value="Contacted">Contacted</option>
                            <option value="Resolved">Resolved</option>
                          </select>

                          <button onClick={() => handleDeleteInquiry(inq.id)} className="p-1.5 text-rose-600 hover:bg-rose-100 rounded-lg">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* ===== TAB 7: CONTACT MESSAGES ===== */}
              {activeTab === "contacts" && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-xl font-extrabold text-[#0D2C4A]">Contact Form Messages ({contacts.length})</h2>
                      <p className="text-xs text-slate-500">Direct inquiries from the website contact page</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {contacts.map((c) => (
                      <div key={c.id} className="bg-slate-50 rounded-2xl p-5 border border-slate-200 space-y-2">
                        <div className="flex items-center justify-between">
                          <h3 className="font-extrabold text-sm text-[#0D2C4A]">{c.name}</h3>
                          <span className="text-xs font-mono text-slate-400">{c.createdAt}</span>
                        </div>
                        <p className="text-xs text-slate-600 font-mono">📞 {c.phone} · 📧 {c.email}</p>
                        <p className="text-xs font-bold text-[#00A896]">Subject: {c.subject}</p>
                        <p className="text-xs text-slate-700 bg-white p-3 rounded-xl border border-slate-100">{c.message}</p>
                        <div className="flex justify-end pt-1">
                          <button onClick={() => handleDeleteContact(c.id)} className="p-1.5 text-rose-600 hover:bg-rose-100 rounded-lg">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* ===== TAB 8: TRANSACTIONS & PAYMENTS ===== */}
              {activeTab === "payments" && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-xl font-extrabold text-[#0D2C4A]">Fee Collections & Payouts ({payments.length})</h2>
                      <p className="text-xs text-slate-500">Financial records of student fees and tutor honorarium</p>
                    </div>
                    <button
                      onClick={() => setShowAddPayment(true)}
                      className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#00A896] text-white text-xs font-extrabold hover:bg-[#008075] transition-all cursor-pointer"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Record Payment</span>
                    </button>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs font-sans">
                      <thead>
                        <tr className="bg-slate-50 text-[#0D2C4A] font-mono uppercase font-bold border-b border-slate-200">
                          <th className="p-3">TRX ID</th>
                          <th className="p-3">Name</th>
                          <th className="p-3">Amount</th>
                          <th className="p-3">Type</th>
                          <th className="p-3">Method</th>
                          <th className="p-3">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {payments.map((p) => (
                          <tr key={p.id}>
                            <td className="p-3 font-mono font-bold text-[#00A896]">{p.trxId}</td>
                            <td className="p-3 font-bold text-[#0D2C4A]">{p.studentName}</td>
                            <td className="p-3 font-mono font-extrabold">৳{p.amount}</td>
                            <td className="p-3">{p.type}</td>
                            <td className="p-3 font-mono">{p.paymentMethod}</td>
                            <td className="p-3">
                              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-100 text-emerald-800">
                                {p.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* ===== TAB 9: BLOG POSTS ===== */}
              {activeTab === "blogs" && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-xl font-extrabold text-[#0D2C4A]">Blog Articles & Guides ({blogs.length})</h2>
                      <p className="text-xs text-slate-500">Academic tips and mentorship articles</p>
                    </div>
                    <button
                      onClick={() => setShowAddBlog(true)}
                      className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#00A896] text-white text-xs font-extrabold hover:bg-[#008075] transition-all cursor-pointer"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Write Article</span>
                    </button>
                  </div>

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
                </div>
              )}

              {/* ===== TAB 10: FAQ ITEMS ===== */}
              {activeTab === "faqs" && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-xl font-extrabold text-[#0D2C4A]">Frequently Asked Questions ({faqs.length})</h2>
                      <p className="text-xs text-slate-500">Bilingual FAQs shown on main landing page</p>
                    </div>
                    <button
                      onClick={() => setShowAddFaq(true)}
                      className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#00A896] text-white text-xs font-extrabold hover:bg-[#008075] transition-all cursor-pointer"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add FAQ</span>
                    </button>
                  </div>

                  <div className="space-y-3">
                    {faqs.map((f) => (
                      <div key={f.id} className="bg-slate-50 rounded-2xl p-4 border border-slate-200 flex items-center justify-between">
                        <div>
                          <h3 className="font-bold text-sm text-[#0D2C4A]">{f.qBn}</h3>
                          <p className="text-xs text-slate-500">{f.aBn}</p>
                        </div>
                        <button onClick={() => handleDeleteFaq(f.id)} className="p-2 text-rose-600 hover:bg-rose-50 rounded-xl">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* ===== TAB 11: SETTINGS & PLATFORM PREFERENCES ===== */}
              {activeTab === "settings" && (
                <div className="space-y-8">
                  {/* Header title */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
                    <div>
                      <div className="flex items-center gap-2.5">
                        <Settings className="w-5.5 h-5.5 text-[#00A896]" />
                        <h2 className="admin-heading-md text-[#0D2C4A]">Platform Settings & SEO Controls</h2>
                      </div>
                      <p className="admin-body-text text-slate-500 pt-0.5">
                        Configure Search Engine SEO metadata, Floating WhatsApp Hotline number, custom Social Media links, Support Phone number, and Physical Address.
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => setShowAddSocialModal(true)}
                      className="px-5 py-3 rounded-2xl bg-[#00A896] hover:bg-[#008075] text-white text-xs font-extrabold flex items-center gap-2 shadow-md cursor-pointer active:scale-95 transition-all"
                    >
                      <Plus className="w-4 h-4" />
                      <span>+ Add Social Media</span>
                    </button>
                  </div>

                  {/* SECTION 1: SEO & METADATA CONFIGURATION */}
                  <div className="bg-white p-6 sm:p-7 rounded-3xl border border-[#0D2C4A]/10 shadow-sm space-y-6">
                    <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                      <div className="flex items-center gap-2.5">
                        <div className="w-9 h-9 rounded-2xl bg-[#E6F4F3] text-[#00A896] flex items-center justify-center border border-[#00A896]/20">
                          <Search className="w-5 h-5" />
                        </div>
                        <div>
                          <h3 className="admin-heading-sm text-[#0D2C4A]">SEO & Search Engine Optimization</h3>
                          <p className="text-xs text-slate-500 font-normal">Configure website Title Tag, Meta Description & Keywords for Google ranking</p>
                        </div>
                      </div>
                    </div>

                    <form onSubmit={handleSaveSeo} className="space-y-5">
                      <div>
                        <label className="admin-kicker text-slate-500 block mb-2">WEBSITE META TITLE (GOOGLE SEARCH TITLE)</label>
                        <input
                          type="text"
                          placeholder="ototeacher — ১-অন-১ অনলাইন শিক্ষক | One-to-One Teacher for All"
                          value={settings.metaTitle || ""}
                          onChange={(e) => setSettings({ ...settings, metaTitle: e.target.value })}
                          className="w-full p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs font-sans font-bold text-[#0D2C4A] focus:outline-none focus:border-[#00A896] shadow-sm"
                        />
                        <span className="text-[11px] text-slate-400 font-mono pt-1 block">
                          Recommended length: 50-60 characters
                        </span>
                      </div>

                      <div>
                        <label className="admin-kicker text-slate-500 block mb-2">WEBSITE META DESCRIPTION (SEARCH RESULT SUMMARY)</label>
                        <textarea
                          rows={3}
                          value={settings.metaDescription || ""}
                          onChange={(e) => setSettings({ ...settings, metaDescription: e.target.value })}
                          placeholder="বাংলাদেশের ১-অন-১ অনলাইন শিক্ষক প্ল্যাটফর্ম। বুয়েট, ঢাবি ও মেডিকেলের যাচাইকৃত শিক্ষকদের সাথে সরাসরি লাইভ ক্লাস — ঘরে বসে।"
                          className="w-full p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs font-sans font-semibold text-[#0D2C4A] focus:outline-none focus:border-[#00A896] shadow-sm"
                        />
                        <span className="text-[11px] text-slate-400 font-mono pt-1 block">
                          Recommended length: 140-160 characters
                        </span>
                      </div>

                      <div>
                        <label className="admin-kicker text-slate-500 block mb-2">TARGET SEARCH KEYWORDS (COMMA SEPARATED)</label>
                        <input
                          type="text"
                          placeholder="online teacher Bangladesh, ১-অন-১ শিক্ষক, ototeacher, private tutor Bangladesh"
                          value={settings.keywords || ""}
                          onChange={(e) => setSettings({ ...settings, keywords: e.target.value })}
                          className="w-full p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs font-mono font-bold text-[#0D2C4A] focus:outline-none focus:border-[#00A896] shadow-sm"
                        />
                      </div>

                      <div className="flex items-center gap-4 pt-2">
                        <button
                          type="submit"
                          className="flex items-center gap-2 px-7 py-3 rounded-2xl bg-[#00A896] hover:bg-[#008075] text-white admin-caption-text font-extrabold transition-all shadow-md cursor-pointer active:scale-95"
                        >
                          <CheckCircle className="w-4 h-4" />
                          <span>Save SEO Settings</span>
                        </button>

                        {seoSaved && (
                          <span className="admin-caption-text text-emerald-600 font-extrabold flex items-center gap-1">
                            ✓ SEO and Metadata updated successfully!
                          </span>
                        )}
                      </div>
                    </form>
                  </div>

                  {/* SECTION 2: FLOATING WHATSAPP HOTLINE SETTINGS */}
                  <div className="bg-white p-6 sm:p-7 rounded-3xl border border-[#0D2C4A]/10 shadow-sm space-y-6">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
                      <div className="flex items-center gap-2.5">
                        <div className="w-9 h-9 rounded-2xl bg-emerald-50 text-[#25D366] flex items-center justify-center border border-emerald-200">
                          <PhoneCall className="w-5 h-5" />
                        </div>
                        <div>
                          <h3 className="admin-heading-sm text-[#0D2C4A]">Floating WhatsApp Hotline Settings</h3>
                          <p className="text-xs text-slate-500 font-normal">Change WhatsApp number & automatic greeting anytime</p>
                        </div>
                      </div>

                      <a
                        href={`https://wa.me/${(settings.whatsappPhone || "8801775551325").replace(/[^0-9]/g, "")}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 rounded-2xl bg-emerald-50 border border-emerald-300 text-emerald-700 hover:bg-emerald-600 hover:text-white transition-all text-xs font-extrabold flex items-center gap-2"
                      >
                        <ExternalLink className="w-4 h-4" />
                        <span>Test WhatsApp Direct ↗</span>
                      </a>
                    </div>

                    <form onSubmit={handleSaveWhatsapp} className="space-y-5">
                      <div>
                        <label className="admin-kicker text-slate-500 block mb-2">WHATSAPP PHONE NUMBER (WITH COUNTRY CODE)</label>
                        <input
                          type="text"
                          placeholder="8801775551325"
                          value={settings.whatsappPhone || ""}
                          onChange={(e) => setSettings({ ...settings, whatsappPhone: e.target.value })}
                          className="w-full p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs font-mono font-bold text-[#0D2C4A] focus:outline-none focus:border-[#25D366] shadow-sm"
                        />
                        <span className="text-[11px] text-slate-400 font-mono pt-1 block">
                          Format example: 8801775551325 (do not use + or spaces)
                        </span>
                      </div>

                      <div>
                        <label className="admin-kicker text-slate-500 block mb-2">AUTOMATIC INITIAL MESSAGE (BENGALI)</label>
                        <textarea
                          rows={2}
                          value={settings.whatsappMessageBn || ""}
                          onChange={(e) => setSettings({ ...settings, whatsappMessageBn: e.target.value })}
                          placeholder="হ্যালো আলো শিক্ষা টিম, ১-অন-১ অনলাইন শিক্ষক সম্পর্কে জানতে চাই।"
                          className="w-full p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs font-sans font-semibold text-[#0D2C4A] focus:outline-none focus:border-[#25D366] shadow-sm"
                        />
                      </div>

                      <div>
                        <label className="admin-kicker text-slate-500 block mb-2">AUTOMATIC INITIAL MESSAGE (ENGLISH)</label>
                        <textarea
                          rows={2}
                          value={settings.whatsappMessageEn || ""}
                          onChange={(e) => setSettings({ ...settings, whatsappMessageEn: e.target.value })}
                          placeholder="Hello Alo Shikkha team, I want to inquire about 1-on-1 online teachers."
                          className="w-full p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs font-sans font-semibold text-[#0D2C4A] focus:outline-none focus:border-[#25D366] shadow-sm"
                        />
                      </div>

                      <div className="flex items-center gap-4 pt-2">
                        <button
                          type="submit"
                          className="flex items-center gap-2 px-7 py-3 rounded-2xl bg-[#25D366] hover:bg-[#1ebd56] text-white admin-caption-text font-extrabold transition-all shadow-md cursor-pointer active:scale-95"
                        >
                          <CheckCircle className="w-4 h-4" />
                          <span>Save WhatsApp Settings</span>
                        </button>

                        {whatsappSaved && (
                          <span className="admin-caption-text text-emerald-600 font-extrabold flex items-center gap-1">
                            ✓ WhatsApp number & messages saved successfully!
                          </span>
                        )}
                      </div>
                    </form>
                  </div>

                  <form onSubmit={handleSaveSettings} className="space-y-8">
                    
                    {/* SECTION 2: DYNAMIC CUSTOM SOCIAL MEDIA LIST */}
                    <div className="space-y-4 pt-4 border-t border-slate-100">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Share2 className="w-5 h-5 text-[#00A896]" />
                          <h3 className="admin-heading-sm text-[#0D2C4A]">Custom Social Media Channels</h3>
                          <span className="admin-chip-label bg-[#E6F4F3] text-[#00A896] px-2.5 py-0.5 rounded-full font-bold">
                            {(settings.socialLinks || []).length} Active Channels
                          </span>
                        </div>
                        
                        <button
                          type="button"
                          onClick={() => setShowAddSocialModal(true)}
                          className="px-4 py-2 rounded-xl bg-[#00A896] hover:bg-[#008075] text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          <span>+ Add Social Media</span>
                        </button>
                      </div>

                      {(!settings.socialLinks || settings.socialLinks.length === 0) ? (
                        <div className="p-8 text-center bg-slate-50 rounded-3xl border border-dashed border-slate-200 space-y-3">
                          <p className="text-xs font-bold text-slate-400">No social media links added yet.</p>
                          <button
                            type="button"
                            onClick={handleAddSocialLink}
                            className="px-4 py-2 bg-[#00A896] text-white text-xs font-bold rounded-xl cursor-pointer"
                          >
                            + Add First Social Media
                          </button>
                        </div>
                      ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                          {settings.socialLinks.map((item) => (
                            <div key={item.id} className="bg-white p-5 rounded-3xl border border-[#0D2C4A]/10 shadow-sm space-y-4 relative group">
                              
                              {/* Top Bar: Title & Delete */}
                              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                                <div className="flex items-center gap-2">
                                  <span className="w-7 h-7 rounded-xl bg-[#E6F4F3] text-[#00A896] flex items-center justify-center text-xs font-extrabold">
                                    {(item.name || "S")[0].toUpperCase()}
                                  </span>
                                  <input
                                    type="text"
                                    placeholder="Platform Name (e.g. Facebook, TikTok)"
                                    value={item.name}
                                    onChange={(e) => handleUpdateSocialLink(item.id, "name", e.target.value)}
                                    className="p-1.5 rounded-lg border border-transparent hover:border-slate-200 focus:border-[#00A896] text-xs font-extrabold text-[#0D2C4A] focus:outline-none"
                                  />
                                </div>

                                <div className="flex items-center gap-2">
                                  {item.url && item.url.startsWith("http") && (
                                    <a
                                      href={item.url}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="p-1.5 text-slate-400 hover:text-[#00A896] transition-colors"
                                      title="Test Target Link"
                                    >
                                      <ExternalLink className="w-4 h-4" />
                                    </a>
                                  )}
                                  <button
                                    type="button"
                                    onClick={() => handleRemoveSocialLink(item.id)}
                                    className="p-1.5 text-rose-500 hover:bg-rose-50 rounded-xl transition-colors cursor-pointer"
                                    title="Delete Social Media"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                                </div>
                              </div>

                              {/* Preset Icon Selector Quick Badges */}
                              <div className="space-y-1.5">
                                <label className="admin-kicker text-slate-400 block">SELECT ICON PRESET OR PASTE CUSTOM IMAGE URL</label>
                                <div className="flex flex-wrap items-center gap-1.5">
                                  {["facebook", "instagram", "youtube", "linkedin", "twitter", "whatsapp", "telegram", "tiktok", "discord", "website"].map((preset) => (
                                    <button
                                      key={preset}
                                      type="button"
                                      onClick={() => handleUpdateSocialLink(item.id, "iconUrl", preset)}
                                      className={`px-2.5 py-1 rounded-lg text-[10px] font-bold capitalize transition-all cursor-pointer ${
                                        (item.iconUrl || "").toLowerCase() === preset
                                          ? "bg-[#00A896] text-white shadow-sm"
                                          : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                                      }`}
                                    >
                                      {preset}
                                    </button>
                                  ))}
                                </div>
                              </div>

                              {/* Custom Icon Image URL Input / File Upload */}
                              <div className="space-y-1.5">
                                <label className="admin-kicker text-slate-400 block">ICON IMAGE URL / KEYWORD</label>
                                <input
                                  type="text"
                                  placeholder="Preset keyword (e.g. facebook) or Custom Icon Image URL (https://...)"
                                  value={item.iconUrl || ""}
                                  onChange={(e) => handleUpdateSocialLink(item.id, "iconUrl", e.target.value)}
                                  className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-mono font-semibold text-[#0D2C4A] focus:outline-none focus:border-[#00A896]"
                                />
                              </div>

                              {/* Target URL Input */}
                              <div className="space-y-1.5">
                                <label className="admin-kicker text-slate-400 block">TARGET URL LINK</label>
                                <input
                                  type="url"
                                  placeholder="https://facebook.com/yourpage"
                                  value={item.url || ""}
                                  onChange={(e) => handleUpdateSocialLink(item.id, "url", e.target.value)}
                                  className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-mono font-semibold text-[#0D2C4A] focus:outline-none focus:border-[#00A896]"
                                />
                              </div>

                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* PLATFORM HOTLINE DETAILS */}
                    <div className="space-y-4 pt-6 border-t border-slate-100">
                      <h3 className="admin-heading-sm text-[#0D2C4A]">General Platform Support Hotline & Address</h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div>
                          <label className="admin-kicker text-slate-500 block mb-2">HOTLINE / PHONE NUMBER</label>
                          <input
                            type="text"
                            value={settings.phone || ""}
                            onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                            className="w-full p-3.5 rounded-2xl bg-white border border-[#0D2C4A]/10 text-xs font-mono font-bold text-[#0D2C4A] focus:outline-none focus:border-[#00A896] shadow-sm"
                          />
                        </div>

                        <div>
                          <label className="admin-kicker text-slate-500 block mb-2">SUPPORT EMAIL ADDRESS</label>
                          <input
                            type="email"
                            value={settings.email || ""}
                            onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                            className="w-full p-3.5 rounded-2xl bg-white border border-[#0D2C4A]/10 text-xs font-mono font-bold text-[#0D2C4A] focus:outline-none focus:border-[#00A896] shadow-sm"
                          />
                        </div>

                        <div>
                          <label className="admin-kicker text-slate-500 block mb-2">OFFICE ADDRESS (BENGALI)</label>
                          <input
                            type="text"
                            value={settings.addressBn || ""}
                            onChange={(e) => setSettings({ ...settings, addressBn: e.target.value })}
                            className="w-full p-3.5 rounded-2xl bg-white border border-[#0D2C4A]/10 text-xs font-sans font-bold text-[#0D2C4A] focus:outline-none focus:border-[#00A896] shadow-sm"
                          />
                        </div>

                        <div>
                          <label className="admin-kicker text-slate-500 block mb-2">OFFICE ADDRESS (ENGLISH)</label>
                          <input
                            type="text"
                            value={settings.addressEn || ""}
                            onChange={(e) => setSettings({ ...settings, addressEn: e.target.value })}
                            className="w-full p-3.5 rounded-2xl bg-white border border-[#0D2C4A]/10 text-xs font-sans font-bold text-[#0D2C4A] focus:outline-none focus:border-[#00A896] shadow-sm"
                          />
                        </div>
                      </div>
                    </div>

                    {/* SAVE BUTTON */}
                    <div className="flex items-center gap-4 pt-4 border-t border-slate-100">
                      <button
                        type="submit"
                        className="flex items-center gap-2 px-7 py-3.5 rounded-2xl bg-[#00A896] hover:bg-[#008075] text-white admin-caption-text font-extrabold transition-all shadow-md cursor-pointer active:scale-95"
                      >
                        <CheckCircle className="w-4 h-4" />
                        <span>Save Social Media & Settings</span>
                      </button>

                      {settingsSaved && (
                        <span className="admin-caption-text text-emerald-600 font-extrabold flex items-center gap-1.5 bg-emerald-50 border border-emerald-200 px-4 py-2 rounded-xl">
                          ✓ Social media links updated and published to footer!
                        </span>
                      )}
                    </div>

                  </form>
                </div>
              )}

              {/* ===== TAB 12: SEO AND METADATA ===== */}
              {activeTab === "seo" && (
                <div className="space-y-6">
                  <div className="flex items-center gap-2.5 pb-2 border-b border-slate-100">
                    <Search className="w-5 h-5 text-[#00A896]" />
                    <h2 className="text-xl font-extrabold text-[#0D2C4A]">Global Meta & Search Tags</h2>
                  </div>

                  <form onSubmit={handleSaveSeo} className="space-y-5 max-w-2xl">
                    <div>
                      <label className="block text-xs font-mono font-bold text-slate-500 uppercase tracking-wider mb-2">
                        DEFAULT META TITLE
                      </label>
                      <input
                        type="text"
                        value={settings.metaTitle || ""}
                        onChange={(e) => setSettings({ ...settings, metaTitle: e.target.value })}
                        placeholder="Muhammad Sajib — Lead UI/UX & Product Designer"
                        className="w-full p-3.5 rounded-2xl bg-white border border-[#0D2C4A]/10 text-sm font-sans font-semibold text-[#0D2C4A] focus:outline-none focus:border-[#00A896] shadow-sm transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono font-bold text-slate-500 uppercase tracking-wider mb-2">
                        DEFAULT META DESCRIPTION
                      </label>
                      <textarea
                        rows={4}
                        value={settings.metaDescription || ""}
                        onChange={(e) => setSettings({ ...settings, metaDescription: e.target.value })}
                        placeholder="Crafting intuitive digital experiences, mobile apps, SaaS dashboards, and design systems."
                        className="w-full p-3.5 rounded-2xl bg-white border border-[#0D2C4A]/10 text-sm font-sans font-semibold text-[#0D2C4A] focus:outline-none focus:border-[#00A896] shadow-sm transition-all resize-y"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono font-bold text-slate-500 uppercase tracking-wider mb-2">
                        KEYWORDS (COMMA SEPARATED)
                      </label>
                      <input
                        type="text"
                        value={settings.keywords || ""}
                        onChange={(e) => setSettings({ ...settings, keywords: e.target.value })}
                        placeholder="UI/UX Designer, Product Designer, Figma, Next.js, Tailwind CSS"
                        className="w-full p-3.5 rounded-2xl bg-white border border-[#0D2C4A]/10 text-sm font-sans font-semibold text-[#0D2C4A] focus:outline-none focus:border-[#00A896] shadow-sm transition-all"
                      />
                    </div>

                    <div className="flex items-center gap-4 pt-2">
                      <button
                        type="submit"
                        className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-[#00A896] text-white font-extrabold text-xs hover:bg-[#008075] active:scale-95 transition-all shadow-md cursor-pointer"
                      >
                        <CheckCircle className="w-4 h-4" />
                        <span>Save SEO Settings</span>
                      </button>

                      {seoSaved && (
                        <span className="text-xs font-extrabold text-emerald-600 flex items-center gap-1">
                          ✓ SEO settings saved successfully!
                        </span>
                      )}
                    </div>
                  </form>
                </div>
              )}
            </div>
          )}

        </div>

      </main>

      {/* ===== MODAL OVERLAYS ===== */}

      {/* MODAL 1: ADD TEACHER */}
      {showAddTeacher && (
        <div className="fixed inset-0 z-50 bg-[#0D2C4A]/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 border border-[#0D2C4A]/10 shadow-2xl">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="font-extrabold text-base text-[#0D2C4A]">Add New Tutor Profile</h3>
              <button onClick={() => setShowAddTeacher(false)} className="p-1 text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleCreateTeacher} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold mb-1">Name (Bengali)</label>
                <input required type="text" placeholder="যেমন: ফারহান আহমেদ" value={newTeacherNameBn} onChange={(e) => setNewTeacherNameBn(e.target.value)} className="w-full p-2.5 rounded-xl border" />
              </div>
              <div>
                <label className="block font-bold mb-1">Name (English)</label>
                <input required type="text" placeholder="e.g. Farhan Ahmed" value={newTeacherNameEn} onChange={(e) => setNewTeacherNameEn(e.target.value)} className="w-full p-2.5 rounded-xl border" />
              </div>
              <div>
                <label className="block font-bold mb-1">University (Bengali)</label>
                <input required type="text" value={newTeacherUniBn} onChange={(e) => setNewTeacherUniBn(e.target.value)} className="w-full p-2.5 rounded-xl border" />
              </div>
              <div>
                <label className="block font-bold mb-1">Subject Expertise (Bengali)</label>
                <input required type="text" value={newTeacherSubBn} onChange={(e) => setNewTeacherSubBn(e.target.value)} className="w-full p-2.5 rounded-xl border" />
              </div>
              <button type="submit" className="w-full py-3 rounded-xl bg-[#00A896] text-white font-extrabold">Save Tutor Profile</button>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: ADD INQUIRY */}
      {showAddInquiry && (
        <div className="fixed inset-0 z-50 bg-[#0D2C4A]/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 border border-[#0D2C4A]/10 shadow-2xl">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="font-extrabold text-base text-[#0D2C4A]">New Support Ticket</h3>
              <button onClick={() => setShowAddInquiry(false)} className="p-1 text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleCreateInquiry} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold mb-1">Name</label>
                <input required type="text" placeholder="Parent / Student Name" value={newInquiryName} onChange={(e) => setNewInquiryName(e.target.value)} className="w-full p-2.5 rounded-xl border" />
              </div>
              <div>
                <label className="block font-bold mb-1">Phone Number</label>
                <input required type="text" placeholder="017xxxxxxxx" value={newInquiryPhone} onChange={(e) => setNewInquiryPhone(e.target.value)} className="w-full p-2.5 rounded-xl border" />
              </div>
              <div>
                <label className="block font-bold mb-1">Subject</label>
                <input required type="text" placeholder="Issue or Inquiry subject" value={newInquirySubject} onChange={(e) => setNewInquirySubject(e.target.value)} className="w-full p-2.5 rounded-xl border" />
              </div>
              <div>
                <label className="block font-bold mb-1">Message</label>
                <textarea required rows={3} placeholder="Details..." value={newInquiryMessage} onChange={(e) => setNewInquiryMessage(e.target.value)} className="w-full p-2.5 rounded-xl border" />
              </div>
              <button type="submit" className="w-full py-3 rounded-xl bg-[#00A896] text-white font-extrabold">Create Ticket</button>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 3: ADD PAYMENT */}
      {showAddPayment && (
        <div className="fixed inset-0 z-50 bg-[#0D2C4A]/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 border border-[#0D2C4A]/10 shadow-2xl">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="font-extrabold text-base text-[#0D2C4A]">Record Payment / Payout</h3>
              <button onClick={() => setShowAddPayment(false)} className="p-1 text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleCreatePayment} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold mb-1">Name</label>
                <input required type="text" placeholder="Student or Tutor Name" value={newPaymentName} onChange={(e) => setNewPaymentName(e.target.value)} className="w-full p-2.5 rounded-xl border" />
              </div>
              <div>
                <label className="block font-bold mb-1">Phone</label>
                <input required type="text" placeholder="017xxxxxxxx" value={newPaymentPhone} onChange={(e) => setNewPaymentPhone(e.target.value)} className="w-full p-2.5 rounded-xl border" />
              </div>
              <div>
                <label className="block font-bold mb-1">Amount (৳)</label>
                <input required type="number" value={newPaymentAmount} onChange={(e) => setNewPaymentAmount(Number(e.target.value))} className="w-full p-2.5 rounded-xl border font-mono" />
              </div>
              <div>
                <label className="block font-bold mb-1">Type</label>
                <select value={newPaymentType} onChange={(e) => setNewPaymentType(e.target.value as any)} className="w-full p-2.5 rounded-xl border">
                  <option value="Fee Collection">Fee Collection (From Student)</option>
                  <option value="Tutor Honorarium">Tutor Honorarium (To Tutor)</option>
                </select>
              </div>
              <button type="submit" className="w-full py-3 rounded-xl bg-[#00A896] text-white font-extrabold">Save Transaction Record</button>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 4: ADD BLOG */}
      {showAddBlog && (
        <div className="fixed inset-0 z-50 bg-[#0D2C4A]/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 border border-[#0D2C4A]/10 shadow-2xl">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="font-extrabold text-base text-[#0D2C4A]">Write New Blog Article</h3>
              <button onClick={() => setShowAddBlog(false)} className="p-1 text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleCreateBlog} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold mb-1">Title (Bengali)</label>
                <input required type="text" value={newBlogTitleBn} onChange={(e) => setNewBlogTitleBn(e.target.value)} className="w-full p-2.5 rounded-xl border" />
              </div>
              <div>
                <label className="block font-bold mb-1">Title (English)</label>
                <input required type="text" value={newBlogTitleEn} onChange={(e) => setNewBlogTitleEn(e.target.value)} className="w-full p-2.5 rounded-xl border" />
              </div>
              <div>
                <label className="block font-bold mb-1">Excerpt (Bengali)</label>
                <textarea required rows={2} value={newBlogExcerptBn} onChange={(e) => setNewBlogExcerptBn(e.target.value)} className="w-full p-2.5 rounded-xl border" />
              </div>
              <button type="submit" className="w-full py-3 rounded-xl bg-[#00A896] text-white font-extrabold">Publish Article</button>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 5: ADD FAQ */}
      {showAddFaq && (
        <div className="fixed inset-0 z-50 bg-[#0D2C4A]/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 border border-[#0D2C4A]/10 shadow-2xl">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="font-extrabold text-base text-[#0D2C4A]">Add New FAQ Item</h3>
              <button onClick={() => setShowAddFaq(false)} className="p-1 text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleCreateFaq} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold mb-1">Question (Bengali)</label>
                <input required type="text" value={newFaqQBn} onChange={(e) => setNewFaqQBn(e.target.value)} className="w-full p-2.5 rounded-xl border" />
              </div>
              <div>
                <label className="block font-bold mb-1">Answer (Bengali)</label>
                <textarea required rows={2} value={newFaqABn} onChange={(e) => setNewFaqABn(e.target.value)} className="w-full p-2.5 rounded-xl border" />
              </div>
              <button type="submit" className="w-full py-3 rounded-xl bg-[#00A896] text-white font-extrabold">Save FAQ Item</button>
            </form>
          </div>
        </div>
      )}
      {showAddSocialModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl border border-slate-100 space-y-6 relative">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-[#E6F4F3] text-[#00A896] flex items-center justify-center">
                  <Share2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-base text-[#0D2C4A]">Add New Social Media</h3>
                  <p className="text-xs text-slate-500 font-normal">Upload icon and set redirect target URL</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowAddSocialModal(false)}
                className="p-2 rounded-xl text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveNewSocialMedia} className="space-y-5">
              {/* Option 1: Platform Name */}
              <div>
                <label className="admin-kicker text-slate-500 block mb-2 uppercase">
                  1. PLATFORM NAME
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Facebook, Instagram, YouTube, TikTok"
                  value={newSocialName}
                  onChange={(e) => setNewSocialName(e.target.value)}
                  className="w-full p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs font-sans font-bold text-[#0D2C4A] focus:outline-none focus:border-[#00A896]"
                />
              </div>

              {/* Option 2: Icon Upload & Selection */}
              <div>
                <label className="admin-kicker text-slate-500 block mb-2 uppercase">
                  2. ICON UPLOAD / PRESET OPTION
                </label>
                
                {/* File Upload Box */}
                <div className="p-4 rounded-2xl bg-slate-50 border border-dashed border-slate-300 flex flex-col items-center justify-center gap-2 mb-3">
                  {newSocialIconFilePreview || newSocialIconUrl.startsWith("data:") ? (
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#0D2C4A] text-white flex items-center justify-center overflow-hidden p-2">
                        <img src={newSocialIconUrl} alt="Preview" className="w-full h-full object-contain filter invert" />
                      </div>
                      <span className="text-xs font-bold text-emerald-600">✓ Image Icon Uploaded!</span>
                    </div>
                  ) : (
                    <Upload className="w-6 h-6 text-[#00A896]" />
                  )}

                  <label className="px-4 py-2 rounded-xl bg-white border border-slate-200 text-xs font-bold text-[#0D2C4A] hover:bg-slate-100 cursor-pointer shadow-sm">
                    <span>Choose Icon Image File (.png, .svg, .jpg)</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleSocialIconFileUpload}
                      className="hidden"
                    />
                  </label>
                </div>

                {/* Preset Icon Keywords Selector */}
                <div className="space-y-1">
                  <span className="text-[11px] font-bold text-slate-400 block font-mono">Or select quick preset icon:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {["facebook", "instagram", "youtube", "linkedin", "twitter", "whatsapp", "telegram", "tiktok", "discord", "website"].map((preset) => (
                      <button
                        key={preset}
                        type="button"
                        onClick={() => {
                          setNewSocialIconUrl(preset);
                          setNewSocialIconFilePreview(null);
                        }}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold capitalize transition-all cursor-pointer ${
                          newSocialIconUrl === preset
                            ? "bg-[#00A896] text-white shadow-sm"
                            : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                        }`}
                      >
                        {preset}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Option 3: Redirect Target URL Input */}
              <div>
                <label className="admin-kicker text-slate-500 block mb-2 uppercase">
                  3. REDIRECT TARGET URL LINK
                </label>
                <input
                  type="url"
                  required
                  placeholder="https://facebook.com/yourpage"
                  value={newSocialRedirectUrl}
                  onChange={(e) => setNewSocialRedirectUrl(e.target.value)}
                  className="w-full p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs font-mono font-bold text-[#0D2C4A] focus:outline-none focus:border-[#00A896]"
                />
              </div>

              {/* Submit Buttons */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowAddSocialModal(false)}
                  className="px-5 py-3 rounded-2xl bg-slate-100 text-slate-600 font-extrabold text-xs hover:bg-slate-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-[#00A896] hover:bg-[#008075] text-white font-extrabold text-xs shadow-md transition-all active:scale-95 cursor-pointer"
                >
                  <CheckCircle className="w-4 h-4" />
                  <span>Save Changes</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
