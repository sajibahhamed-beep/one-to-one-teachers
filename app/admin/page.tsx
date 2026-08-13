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
  MapPin,
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
  EyeOff,
  Share2,
  Link as LinkIcon,
  Upload,
  KeyRound,
  AlertCircle,
  Check,
  Shield,
  AtSign,
  Layers,
  MoveUp,
  MoveDown,
  FileCode,
} from "lucide-react";
import { SettingData, SocialLinkItem, Enrollment, PricingRequest, ContactMessage, Teacher, FAQItem, TeacherApplication, Inquiry, Payment, CustomPage, PageSection } from "@/lib/db";
import { BlogPost } from "@/lib/blogsData";


// ============================================================
// TutorsDirectorySection — Mentor Apps + Verified Tutors with Full Information
// ============================================================
function TutorsDirectorySection({
  teachers,
  teacherApplications,
  onAddTeacher,
  onEditTeacher,
  onDeleteTeacher,
  onApproveApplication,
  onDeleteApplication,
}: {
  teachers: any[];
  teacherApplications: any[];
  onAddTeacher: () => void;
  onEditTeacher: (teacher: any) => void;
  onDeleteTeacher: (id: string) => void;
  onApproveApplication: (id: string) => void;
  onDeleteApplication: (id: string) => void;
}) {
  const [subTab, setSubTab] = useState<"all" | "applications" | "verified">("verified");

  const pendingApplications = teacherApplications.filter((a) => (a.status || "Pending") === "Pending");
  const pendingCount = pendingApplications.length;

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-[#0D2C4A]">Tutors &amp; Mentors Directory</h2>
          <p className="text-xs text-slate-500">Manage pending mentor applications and verified tutor profiles from BUET, DU &amp; DMC</p>
        </div>
        <button
          onClick={onAddTeacher}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#00A896] text-white text-xs font-extrabold hover:bg-[#008075] transition-all cursor-pointer shadow-sm active:scale-95"
        >
          <Plus className="w-4 h-4" />
          <span>Add Tutor Profile</span>
        </button>
      </div>

      {/* 3 Sub-Buttons: 1. All Records | 2. Mentor Applications | 3. Verified Tutors */}
      <div className="flex flex-wrap items-center gap-2.5 p-1.5 bg-slate-100/90 rounded-2xl border border-slate-200/80 w-fit">
        <button
          type="button"
          onClick={() => setSubTab("all")}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            subTab === "all"
              ? "bg-[#0D2C4A] text-white shadow-sm"
              : "text-slate-600 hover:text-[#0D2C4A] hover:bg-white/70"
          }`}
        >
          1. All Records ({pendingApplications.length + teachers.length})
        </button>

        <button
          type="button"
          onClick={() => setSubTab("applications")}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
            subTab === "applications"
              ? "bg-[#00A896] text-white shadow-sm font-extrabold"
              : "text-slate-600 hover:text-[#00A896] hover:bg-white/70"
          }`}
        >
          <GraduationCap className="w-3.5 h-3.5" />
          <span>2. Mentor Applications</span>
          {pendingCount > 0 && (
            <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold ${
              subTab === "applications" ? "bg-white text-[#0D2C4A]" : "bg-[#FFB627] text-[#0D2C4A]"
            }`}>
              {pendingCount}
            </span>
          )}
        </button>

        <button
          type="button"
          onClick={() => setSubTab("verified")}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
            subTab === "verified"
              ? "bg-[#0D2C4A] text-white shadow-sm font-extrabold"
              : "text-slate-600 hover:text-[#0D2C4A] hover:bg-white/70"
          }`}
        >
          <UserCheck className="w-3.5 h-3.5" />
          <span>3. Verified Tutors ({teachers.length})</span>
        </button>
      </div>

      {/* ============================================================ */}
      {/* SECTION 1: PENDING MENTOR APPLICATIONS */}
      {/* ============================================================ */}
      {(subTab === "all" || subTab === "applications") && (
        <div className="space-y-4 pt-2">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
            <div>
              <h3 className="text-base font-extrabold text-[#0D2C4A] flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-[#00A896]" />
                <span>Pending Mentor Applications ({pendingApplications.length})</span>
              </h3>
              <p className="text-xs text-slate-500">Review teacher application requests. Once approved, the teacher automatically moves to Verified Tutors.</p>
            </div>
          </div>

          {pendingApplications.length === 0 ? (
            <div className="py-12 text-center text-slate-400 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
              <CheckCircle className="w-8 h-8 mx-auto mb-2 text-emerald-500 opacity-80" />
              <p className="text-xs font-bold text-slate-600">No pending mentor applications</p>
              <p className="text-[11px] text-slate-400 mt-0.5">All approved applicants have been listed under Verified Tutors</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {pendingApplications.map((app, idx) => (
                <div
                  key={app.id}
                  className="bg-slate-50/90 rounded-2xl p-5 border border-slate-200 space-y-3 flex flex-col justify-between hover:border-[#00A896]/50 transition-all shadow-xs hover:shadow-sm"
                >
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-[#0D2C4A] text-white font-mono font-extrabold text-[11px] flex items-center justify-center shadow-xs shrink-0">
                          {idx + 1}
                        </span>
                        <span className="text-[10px] font-mono font-bold text-[#00A896] bg-[#00A896]/10 border border-[#00A896]/20 px-2.5 py-0.5 rounded-full">
                          {app.id}
                        </span>
                      </div>
                      <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full border bg-amber-50 text-amber-800 border-amber-200">
                        Pending Review
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-slate-200 border border-slate-300 overflow-hidden shrink-0 shadow-xs">
                        {app.avatar ? (
                          <img src={app.avatar} alt={app.fullName} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center font-extrabold text-sm text-slate-500">
                            {app.fullName.charAt(0).toUpperCase()}
                          </div>
                        )}
                      </div>
                      <div className="min-w-0 flex-1">
                        <h4 className="font-extrabold text-base text-[#0D2C4A] truncate">{app.fullName}</h4>
                        <p className="text-xs font-bold text-[#00A896] flex items-center gap-1">
                          <GraduationCap className="w-3.5 h-3.5 shrink-0" />
                          <span className="truncate">{app.institution} {app.department ? `(${app.department})` : ''}</span>
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-1 text-xs pt-1">
                      <div className="flex flex-wrap items-center gap-2 pt-1">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-white border border-slate-200 text-sm font-mono font-extrabold text-[#00A896] shadow-xs">
                          <PhoneCall className="w-4 h-4 text-[#00A896] shrink-0" />
                          <span>{app.phone}</span>
                        </span>
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-white border border-slate-200 text-xs sm:text-sm font-mono font-medium text-slate-700 shadow-xs">
                          <Mail className="w-4 h-4 text-slate-400 shrink-0" />
                          <span>{app.email}</span>
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-slate-600">
                        <BookOpen className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span className="font-medium text-slate-700">Subject: <span className="font-bold text-[#0D2C4A]">{app.subjectExpertise}</span></span>
                      </div>
                      {app.experience && (
                        <div className="flex items-center gap-2 text-slate-500 text-[11px]">
                          <Award className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                          <span>{app.experience}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-200/80 flex items-center justify-between gap-2">
                    <button
                      onClick={() => onApproveApplication(app.id)}
                      className="flex-1 py-2.5 rounded-xl text-xs font-extrabold bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs cursor-pointer active:scale-95 transition-all flex items-center justify-center gap-1.5"
                    >
                      <CheckCircle className="w-4 h-4" />
                      <span>Approve &amp; Add to Verified Tutors</span>
                    </button>
                    <button
                      onClick={() => onDeleteApplication(app.id)}
                      className="p-2.5 rounded-xl bg-rose-50 text-rose-600 hover:bg-rose-100 hover:text-rose-700 transition-colors cursor-pointer border border-rose-100"
                      title="Reject / Delete application"
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

      {/* ============================================================ */}
      {/* SECTION 2: VERIFIED TUTORS (Visible in 'all' and 'verified') */}
      {/* ============================================================ */}
      {(subTab === "all" || subTab === "verified") && (
        <div className={`space-y-4 ${subTab === "all" ? "pt-6 border-t border-slate-200/80" : "pt-2"}`}>
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h3 className="text-base font-extrabold text-[#0D2C4A] flex items-center gap-2">
                <UserCheck className="w-4 h-4 text-[#00A896]" />
                <span>Verified Tutors Directory ({teachers.length})</span>
              </h3>
              <p className="text-xs text-slate-500">Public teacher profiles displayed with their comprehensive details on the platform</p>
            </div>
          </div>

          {teachers.length === 0 ? (
            <div className="py-12 text-center text-slate-400 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
              <UserCheck className="w-8 h-8 mx-auto mb-2 opacity-30 text-[#00A896]" />
              <p className="text-xs font-bold">No verified tutors yet</p>
              <button
                onClick={onAddTeacher}
                className="mt-3 inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#00A896] text-white text-xs font-bold hover:bg-[#008075] transition-all cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add First Tutor</span>
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {teachers.map((t) => (
                <div
                  key={t.id}
                  className="bg-white rounded-3xl p-6 border-2 border-slate-200/80 hover:border-[#00A896]/60 shadow-xs hover:shadow-md transition-all space-y-4 flex flex-col justify-between"
                >
                  {/* Top Bar: ID + Verified Badge + Rating */}
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono font-bold text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded-full">
                        {t.id}
                      </span>
                      <span className="inline-flex items-center gap-1 text-[11px] font-extrabold text-emerald-700 bg-emerald-50 border border-emerald-200/70 px-2.5 py-0.5 rounded-full">
                        <CheckCircle className="w-3 h-3 text-emerald-600" />
                        <span>যাচাইকৃত শিক্ষক (Verified Tutor)</span>
                      </span>
                    </div>
                    <span className="text-[11px] font-mono font-bold text-amber-700 bg-amber-50 border border-amber-200/70 px-2 py-0.5 rounded-full">
                      ⭐ {t.rating || "4.9/5"}
                    </span>
                  </div>

                  {/* Identity Row: Avatar + Names + Contact */}
                  <div className="flex items-start gap-4">
                    <div className="relative shrink-0">
                      <img
                        src={t.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"}
                        alt={t.nameEn}
                        className="w-16 h-16 rounded-2xl object-cover border-2 border-[#00A896]/30 shadow-sm"
                      />
                      <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-white rounded-full" />
                    </div>
                    <div className="min-w-0 flex-1 space-y-1">
                      <h4 className="font-extrabold text-base text-[#0D2C4A] tracking-tight">{t.nameBn}</h4>
                      <p className="text-xs font-mono font-bold text-[#00A896]">{t.nameEn}</p>
                      <div className="flex flex-wrap items-center gap-3 text-[11px] text-slate-500 pt-0.5">
                        <span className="flex items-center gap-1 font-mono">
                          <PhoneCall className="w-3 h-3 text-slate-400" />
                          <span>{t.phone || "01911223344"}</span>
                        </span>
                        <span className="flex items-center gap-1 font-mono">
                          <Mail className="w-3 h-3 text-slate-400" />
                          <span>{t.email || "tutor@ototeachers.com"}</span>
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* 2-Column Info Box: University & Subjects */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 p-3.5 bg-slate-50 rounded-2xl border border-slate-200/70 text-xs">
                    <div className="space-y-1">
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 block">
                        🎓 বিশ্ববিদ্যালয় ও বিভাগ
                      </span>
                      <p className="font-extrabold text-[#0D2C4A]">{t.universityBn || "বুয়েট"}</p>
                      <p className="text-[11px] text-slate-500 font-mono">{t.universityEn || "BUET"}</p>
                    </div>
                    <div className="space-y-1">
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 block">
                        📚 পাঠদানের বিষয়সমূহ
                      </span>
                      <p className="font-extrabold text-[#00A896]">{t.subjectBn || "উচ্চতর গণিত ও পদার্থবিজ্ঞান"}</p>
                      <p className="text-[11px] text-slate-500 font-mono">{t.subjectEn || "Higher Math & Physics"}</p>
                    </div>
                  </div>

                  {/* Experience & Bio Note */}
                  <div className="space-y-1 bg-white p-3 rounded-2xl border border-slate-100 text-xs">
                    <div className="flex items-center gap-1.5 font-bold text-slate-700">
                      <Award className="w-3.5 h-3.5 text-[#00A896]" />
                      <span>{t.experienceBn || "৪+ বছরের শিক্ষকতার অভিজ্ঞতা · বোর্ড স্পেশালিস্ট"}</span>
                    </div>
                    <p className="text-[11px] text-slate-500 leading-relaxed">
                      {t.bioBn || "১-অন-১ লাইভ ক্লাসে শিক্ষার্থীদের দুর্বলতা দূরীকরণে ও বোর্ড পরীক্ষায় এ+ অর্জনে ডেডিকেটেড মেন্টর।"}
                    </p>
                  </div>

                  {/* Bottom Actions Bar */}
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                    <button
                      type="button"
                      onClick={() => onEditTeacher(t)}
                      className="flex-1 py-2 px-3 rounded-xl bg-slate-100 hover:bg-[#00A896] text-slate-700 hover:text-white text-xs font-extrabold transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                    >
                      <Edit className="w-3.5 h-3.5" />
                      <span>Edit Information</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => onDeleteTeacher(t.id)}
                      className="p-2 rounded-xl bg-rose-50 text-rose-600 hover:bg-rose-100 hover:text-rose-700 transition-colors cursor-pointer border border-rose-100"
                      title="Delete tutor profile"
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
    </div>
  );
}

export default function AdminDashboardPage() {
  const [mounted, setMounted] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  // Auth credential states
  const [email, setEmail] = useState("sajib@sajib.com");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState(false);
  const [authErrorMessage, setAuthErrorMessage] = useState("");
  const [adminUser, setAdminUser] = useState<{ email: string; name: string; role: string } | null>({
    email: "sajib@sajib.com",
    name: "Sajib Ahmed",
    role: "Super Admin",
  });

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
    | "pages"
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
  const [customPages, setCustomPages] = useState<CustomPage[]>([]);
  const [editingPage, setEditingPage] = useState<CustomPage | null>(null);
  const [showPageModal, setShowPageModal] = useState<boolean>(false);
  const [pageSaving, setPageSaving] = useState<boolean>(false);
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [settings, setSettings] = useState<SettingData>({
    socialLinks: [
      { id: "soc-1", name: "Facebook", iconUrl: "facebook", url: "https://facebook.com" },
      { id: "soc-2", name: "Instagram", iconUrl: "instagram", url: "https://instagram.com" },
      { id: "soc-3", name: "YouTube", iconUrl: "youtube", url: "https://youtube.com" },
      { id: "soc-4", name: "LinkedIn", iconUrl: "linkedin", url: "https://linkedin.com" },
    ],
    whatsappPhone: "8801775551325",
    whatsappMessageBn: "হ্যালো ototeachers.com টিম, ১-অন-১ অনলাইন শিক্ষক সম্পর্কে জানতে চাই।",
    whatsappMessageEn: "Hello ototeachers.com team, I want to inquire about 1-on-1 online teachers.",
    phone: "01775551325",
    email: "support@ototeachers.com",
    addressBn: "ধানমণ্ডি, ঢাকা, বাংলাদেশ",
    addressEn: "Dhanmondi, Dhaka, Bangladesh",
    metaTitle: "ototeachers.com — ১-অন-১ অনলাইন শিক্ষক | One-to-One Teacher for All",
    metaDescription: "বাংলাদেশের ১-অন-১ অনলাইন শিক্ষক প্ল্যাটফর্ম। বুয়েট, ঢাবি ও মেডিকেলের যাচাইকৃত শিক্ষকদের সাথে সরাসরি লাইভ ক্লাস — ঘরে বসে।",
    keywords: "ototeachers.com, ototeachers, online teacher Bangladesh, ১-অন-১ শিক্ষক, private tutor Bangladesh",
  });
  const [whatsappSaved, setWhatsappSaved] = useState(false);
  const [seoSaved, setSeoSaved] = useState(false);

  // Filter & Search states
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [enrollmentTypeTab, setEnrollmentTypeTab] = useState<"all" | "student" | "trial">("all");

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

  // Blog Filter State
  const [blogFilterCategory, setBlogFilterCategory] = useState("all");
  const [blogSearchQuery, setBlogSearchQuery] = useState("");

  // New Blog State (Full frontend schema)
  const [newBlogTitleBn, setNewBlogTitleBn] = useState("");
  const [newBlogTitleEn, setNewBlogTitleEn] = useState("");
  const [newBlogSlug, setNewBlogSlug] = useState("");
  const [newBlogCategory, setNewBlogCategory] = useState("mentorship");
  const [newBlogFeatured, setNewBlogFeatured] = useState(false);
  const [newBlogImage, setNewBlogImage] = useState("https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1200&q=80");
  const [newBlogExcerptBn, setNewBlogExcerptBn] = useState("");
  const [newBlogExcerptEn, setNewBlogExcerptEn] = useState("");
  const [newBlogReadTimeBn, setNewBlogReadTimeBn] = useState("৫ মিনিট পড়া");
  const [newBlogReadTimeEn, setNewBlogReadTimeEn] = useState("5 min read");
  const [newBlogDateBn, setNewBlogDateBn] = useState("০৬ আগস্ট, ২০২৬");
  const [newBlogDateEn, setNewBlogDateEn] = useState("Aug 06, 2026");
  const [newBlogAuthorNameBn, setNewBlogAuthorNameBn] = useState("আরিফুর রহমান");
  const [newBlogAuthorNameEn, setNewBlogAuthorNameEn] = useState("Arifur Rahman");
  const [newBlogAuthorRoleBn, setNewBlogAuthorRoleBn] = useState("হেড অব মেন্টরশিপ");
  const [newBlogAuthorRoleEn, setNewBlogAuthorRoleEn] = useState("Head of Mentorship");
  const [newBlogAuthorUniBn, setNewBlogAuthorUniBn] = useState("বুয়েট (সিএসই)");
  const [newBlogAuthorUniEn, setNewBlogAuthorUniEn] = useState("BUET (CSE)");
  const [newBlogAuthorAvatar, setNewBlogAuthorAvatar] = useState("https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80");
  const [newBlogTagsBn, setNewBlogTagsBn] = useState("১-অন-১ মেন্টরিং, শিক্ষা পদ্ধতি, যাচাইকৃত শিক্ষক");
  const [newBlogTagsEn, setNewBlogTagsEn] = useState("1-on-1 Mentoring, Learning Methods, Private Tutor");
  const [newBlogIntroBn, setNewBlogIntroBn] = useState("");
  const [newBlogIntroEn, setNewBlogIntroEn] = useState("");
  const [newBlogTakeawaysBn, setNewBlogTakeawaysBn] = useState("");
  const [newBlogTakeawaysEn, setNewBlogTakeawaysEn] = useState("");

  type BlogSectionAdmin = {
    headingBn: string;
    headingEn: string;
    subheadingBn: string;
    subheadingEn: string;
    image: string;
    imageCaptionBn: string;
    imageCaptionEn: string;
    paragraphsBn: string;
    paragraphsEn: string;
    points: Array<{ titleBn: string; titleEn: string; descBn: string; descEn: string }>;
    calloutBn: string;
    calloutEn: string;
  };

  const emptySection = (): BlogSectionAdmin => ({
    headingBn: "", headingEn: "",
    subheadingBn: "", subheadingEn: "",
    image: "", imageCaptionBn: "", imageCaptionEn: "",
    paragraphsBn: "", paragraphsEn: "",
    points: [],
    calloutBn: "", calloutEn: "",
  });

  const [newBlogSections, setNewBlogSections] = useState<BlogSectionAdmin[]>([{
    headingBn: "এ+ পাওয়ার জন্য মেন্টরদের ৫টি সেরা কৌশল",
    headingEn: "Top 5 Strategies from Mentors to Secure an A+",
    subheadingBn: "বোর্ড খাতা মূল্যায়নে শিক্ষকের মন জয় করার নিয়ম",
    subheadingEn: "Rules to impress the examiner during board paper evaluation",
    image: "", imageCaptionBn: "", imageCaptionEn: "",
    paragraphsBn: "", paragraphsEn: "",
    points: [
    {
      titleBn: "১. বিগত ৫ বছরের বোর্ড প্রশ্ন খুঁটিনাটি সমাধান",
      titleEn: "1. Thoroughly Solve Past 5 Years Board Papers",
      descBn: "বোর্ড পরীক্ষার প্রায় ৭০% প্রশ্ন বিগত বছরের প্যাটার্ন অনুসরণ করে থাকে। টেস্ট পেপার সলভ করার মাধ্যমে প্রতিটি চ্যাপ্টারের মূল ধরন আয়ত্ত করা সম্ভব।",
      descEn: "Nearly 70% of board questions follow past patterns. Solving test papers helps master common question types.",
    },
    {
      titleBn: "২. বিজ্ঞান বিষয়ে স্পষ্ট চিত্র ও সমীকরণের ব্যবহার",
      titleEn: "2. Use Clear Diagrams & Equations in Science",
      descBn: "পদার্থ, রসায়ন ও জীববিজ্ঞানে পেন্সিল দিয়ে স্পষ্ট চিত্র আঁকলে পরীক্ষক পূর্ণ নম্বর দিতে উৎসাহিত হন।",
      descEn: "Drawing clean pencil diagrams in Physics, Chemistry, and Biology encourages examiners to award full marks.",
    },
    {
      titleBn: "৩. টাইমার ধরে ১-অন-১ মক টেস্ট দেওয়া",
      titleEn: "3. Timed 1-on-1 Mock Tests",
      descBn: "পরীক্ষার হলে সময় না পাওয়ার সমস্যা দূর করতে প্রতি সপ্তাহে ঘড়ি ধরে মক টেস্ট দিয়ে উত্তরপত্র ১-অন-১ মেন্টরকে দেখিয়ে ফিডব্যাক নেওয়া উচিত।",
      descEn: "To prevent running out of time in the exam hall, take weekly timed mock tests and get them reviewed 1-on-1.",
    },
    {
      titleBn: "৪. সৃজনশীল (CQ) প্রশ্নের ক ও খ অংশ নিখুঁত করা",
      titleEn: "4. Perfecting Parts A and B of Creative (CQ) Questions",
      descBn: "ক ও খ অংশে পূর্ণ নম্বর পাওয়া সহজ। মেন্টরের সহায়তায় সংজ্ঞা ও মূল পয়েন্ট নির্ভুল মুখস্থ ও প্র্যাকটিস করুন।",
      descEn: "Getting full marks in Parts A and B is straightforward. Master exact definitions and key points with mentor guidance.",
    },
    {
      titleBn: "৫. রিভিশন নোটস ও সূত্র তালিকা প্রস্তুত রাখা",
      titleEn: "5. Prepare Revision Notes & Formula Sheets",
      descBn: "পরীক্ষার আগের রাতে সব বই পড়া অসম্ভব। তাই নিজস্ব হাতে লেখা ফর্মুলা শিট ও নোটস দেখে রিভিশন শেষ করুন।",
      descEn: "Reading the whole textbook the night before exams is impossible. Review hand-written formula sheets and quick notes instead.",
    },
  ],
    calloutBn: "", calloutEn: "",
  }]);

  // Edit Blog State
  const [showEditBlog, setShowEditBlog] = useState(false);
  const [editBlogId, setEditBlogId] = useState("");
  const [editBlogTitleBn, setEditBlogTitleBn] = useState("");
  const [editBlogTitleEn, setEditBlogTitleEn] = useState("");
  const [editBlogSlug, setEditBlogSlug] = useState("");
  const [editBlogCategory, setEditBlogCategory] = useState("mentorship");
  const [editBlogFeatured, setEditBlogFeatured] = useState(false);
  const [editBlogImage, setEditBlogImage] = useState("");
  const [editBlogExcerptBn, setEditBlogExcerptBn] = useState("");
  const [editBlogExcerptEn, setEditBlogExcerptEn] = useState("");
  const [editBlogReadTimeBn, setEditBlogReadTimeBn] = useState("");
  const [editBlogReadTimeEn, setEditBlogReadTimeEn] = useState("");
  const [editBlogDateBn, setEditBlogDateBn] = useState("");
  const [editBlogDateEn, setEditBlogDateEn] = useState("");
  const [editBlogAuthorNameBn, setEditBlogAuthorNameBn] = useState("");
  const [editBlogAuthorNameEn, setEditBlogAuthorNameEn] = useState("");
  const [editBlogAuthorRoleBn, setEditBlogAuthorRoleBn] = useState("");
  const [editBlogAuthorRoleEn, setEditBlogAuthorRoleEn] = useState("");
  const [editBlogAuthorUniBn, setEditBlogAuthorUniBn] = useState("");
  const [editBlogAuthorUniEn, setEditBlogAuthorUniEn] = useState("");
  const [editBlogAuthorAvatar, setEditBlogAuthorAvatar] = useState("");
  const [editBlogTagsBn, setEditBlogTagsBn] = useState("");
  const [editBlogTagsEn, setEditBlogTagsEn] = useState("");
  const [editBlogIntroBn, setEditBlogIntroBn] = useState("");
  const [editBlogIntroEn, setEditBlogIntroEn] = useState("");
  const [editBlogTakeawaysBn, setEditBlogTakeawaysBn] = useState("");
  const [editBlogTakeawaysEn, setEditBlogTakeawaysEn] = useState("");

  // Multi-Section state for Edit Blog
  const [editBlogSections, setEditBlogSections] = useState<BlogSectionAdmin[]>([]);

  // New FAQ State (4 Options)
  const [newFaqQBn, setNewFaqQBn] = useState("");
  const [newFaqQEn, setNewFaqQEn] = useState("");
  const [newFaqABn, setNewFaqABn] = useState("");
  const [newFaqAEn, setNewFaqAEn] = useState("");

  // Edit FAQ State (4 Options)
  const [showEditFaq, setShowEditFaq] = useState(false);
  const [editFaqId, setEditFaqId] = useState("");
  const [editFaqQBn, setEditFaqQBn] = useState("");
  const [editFaqQEn, setEditFaqQEn] = useState("");
  const [editFaqABn, setEditFaqABn] = useState("");
  const [editFaqAEn, setEditFaqAEn] = useState("");

    // New Teacher State
  const [newTeacherNameBn, setNewTeacherNameBn] = useState("");
  const [newTeacherNameEn, setNewTeacherNameEn] = useState("");
  const [newTeacherUniBn, setNewTeacherUniBn] = useState("বুয়েট (সিএসই)");
  const [newTeacherUniEn, setNewTeacherUniEn] = useState("BUET (CSE)");
  const [newTeacherSubBn, setNewTeacherSubBn] = useState("উচ্চতর গণিত ও পদার্থবিজ্ঞান");
  const [newTeacherSubEn, setNewTeacherSubEn] = useState("Higher Math & Physics");
  const [newTeacherAvatar, setNewTeacherAvatar] = useState("https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80");
  const [newTeacherPhone, setNewTeacherPhone] = useState("");
  const [newTeacherEmail, setNewTeacherEmail] = useState("");
  const [newTeacherExpBn, setNewTeacherExpBn] = useState("৪+ বছরের শিক্ষকতার অভিজ্ঞতা");
  const [newTeacherExpEn, setNewTeacherExpEn] = useState("4+ Years Mentoring Experience");
  const [newTeacherBioBn, setNewTeacherBioBn] = useState("");
  const [newTeacherBioEn, setNewTeacherBioEn] = useState("");

  // Edit Teacher State
  const [showEditTeacher, setShowEditTeacher] = useState(false);
  const [editTeacherId, setEditTeacherId] = useState("");
  const [editTeacherNameBn, setEditTeacherNameBn] = useState("");
  const [editTeacherNameEn, setEditTeacherNameEn] = useState("");
  const [editTeacherUniBn, setEditTeacherUniBn] = useState("");
  const [editTeacherUniEn, setEditTeacherUniEn] = useState("");
  const [editTeacherSubBn, setEditTeacherSubBn] = useState("");
  const [editTeacherSubEn, setEditTeacherSubEn] = useState("");
  const [editTeacherAvatar, setEditTeacherAvatar] = useState("");
  const [editTeacherPhone, setEditTeacherPhone] = useState("");
  const [editTeacherEmail, setEditTeacherEmail] = useState("");
  const [editTeacherExpBn, setEditTeacherExpBn] = useState("");
  const [editTeacherExpEn, setEditTeacherExpEn] = useState("");
  const [editTeacherBioBn, setEditTeacherBioBn] = useState("");
  const [editTeacherBioEn, setEditTeacherBioEn] = useState("");

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

    const checkExistingAuth = async () => {
      const savedAuth =
        typeof window !== "undefined" &&
        (localStorage.getItem("admin_auth") === "true" || sessionStorage.getItem("admin_auth") === "true");
      const savedUserStr =
        typeof window !== "undefined"
          ? localStorage.getItem("admin_user") || sessionStorage.getItem("admin_user")
          : null;

      if (savedAuth) {
        setIsAuthenticated(true);
        if (savedUserStr) {
          try {
            setAdminUser(JSON.parse(savedUserStr));
          } catch (e) {}
        }
      }

      // Verify with backend session cookie
      try {
        const res = await fetch("/api/auth/verify");
        if (res.ok) {
          const data = await res.json();
          if (data.authenticated && data.user) {
            setIsAuthenticated(true);
            setAdminUser(data.user);
            sessionStorage.setItem("admin_auth", "true");
            sessionStorage.setItem("admin_user", JSON.stringify(data.user));
          }
        }
      } catch (err) {
        // Fallback to local session
      }
    };

    checkExistingAuth();
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthLoading(true);
    setAuthError(false);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setIsAuthenticated(true);
        setAdminUser(data.user);
        setAuthError(false);

        if (rememberMe) {
          localStorage.setItem("admin_auth", "true");
          localStorage.setItem("admin_user", JSON.stringify(data.user));
        }
        sessionStorage.setItem("admin_auth", "true");
        sessionStorage.setItem("admin_user", JSON.stringify(data.user));
      } else {
        // Fallback verification
        const normalizedEmail = email.trim().toLowerCase();
        if (
          (normalizedEmail === "sajib@sajib.com" || normalizedEmail === "admin") &&
          (password === "Sajib#123456" || password === "admin123" || password === "2026")
        ) {
          const user = { email: "sajib@sajib.com", name: "Sajib Ahmed", role: "Super Admin" };
          setIsAuthenticated(true);
          setAdminUser(user);
          setAuthError(false);

          if (rememberMe) {
            localStorage.setItem("admin_auth", "true");
            localStorage.setItem("admin_user", JSON.stringify(user));
          }
          sessionStorage.setItem("admin_auth", "true");
          sessionStorage.setItem("admin_user", JSON.stringify(user));
        } else {
          setAuthError(true);
          setAuthErrorMessage(data.error || "ভুল ইমেইল বা পাসওয়ার্ড! Invalid email or password.");
        }
      }
    } catch (err) {
      const normalizedEmail = email.trim().toLowerCase();
      if (
        (normalizedEmail === "sajib@sajib.com" || normalizedEmail === "admin") &&
        (password === "Sajib#123456" || password === "admin123" || password === "2026")
      ) {
        const user = { email: "sajib@sajib.com", name: "Sajib Ahmed", role: "Super Admin" };
        setIsAuthenticated(true);
        setAdminUser(user);
        setAuthError(false);

        if (rememberMe) {
          localStorage.setItem("admin_auth", "true");
          localStorage.setItem("admin_user", JSON.stringify(user));
        }
        sessionStorage.setItem("admin_auth", "true");
        sessionStorage.setItem("admin_user", JSON.stringify(user));
      } else {
        setAuthError(true);
        setAuthErrorMessage("সার্ভার ত্রুটি! Connection error.");
      }
    } finally {
      setAuthLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
    } catch (e) {}
    localStorage.removeItem("admin_auth");
    localStorage.removeItem("admin_user");
    sessionStorage.clear();
    setIsAuthenticated(false);
    setAdminUser(null);
    setPassword("");
    setAuthError(false);
  };

  const fetchAllData = async () => {
    setLoading(true);
    try {
      const [resEnr, resPrc, resCnt, resBlg, resFaq, resTch, resSet, resApp, resInq, resPay, resPgs] = await Promise.all([
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
        fetch("/api/pages").then((r) => r.json()),
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
      if (Array.isArray(resPgs)) setCustomPages(resPgs);
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

  // Delete Pricing Request
  const handleDeletePricingRequest = async (id: string) => {
    if (confirm("Delete this pricing inquiry?")) {
      await fetch(`/api/pricing-requests?id=${id}`, { method: "DELETE" });
      fetchAllData();
    }
  };

  // Delete Contact Message
  const handleDeleteContact = async (id: string) => {
    if (confirm("Delete this message?")) {
      await fetch(`/api/contacts?id=${id}`, { method: "DELETE" });
      fetchAllData();
    }
  };

  // Hero Cover Image Upload Handlers for Blogs
  const handleBlogImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => { setNewBlogImage(reader.result as string); };
      reader.readAsDataURL(file);
    }
  };

  const handleBlogAuthorAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => { setNewBlogAuthorAvatar(reader.result as string); };
      reader.readAsDataURL(file);
    }
  };

  const handleEditBlogImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => { setEditBlogImage(reader.result as string); };
      reader.readAsDataURL(file);
    }
  };

  const handleEditBlogAuthorAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => { setEditBlogAuthorAvatar(reader.result as string); };
      reader.readAsDataURL(file);
    }
  };

  // ---------- Multi-Section Helpers for New Blog ----------
  const updateNewSection = (sIdx: number, field: keyof BlogSectionAdmin, value: any) => {
    setNewBlogSections((prev) => {
      const updated = [...prev];
      updated[sIdx] = { ...updated[sIdx], [field]: value };
      return updated;
    });
  };

  const addNewSection = () => {
    setNewBlogSections((prev) => [...prev, emptySection()]);
  };

  const removeNewSection = (sIdx: number) => {
    setNewBlogSections((prev) => prev.filter((_, i) => i !== sIdx));
  };

  const addPointToNewSection = (sIdx: number) => {
    setNewBlogSections((prev) => {
      const updated = [...prev];
      updated[sIdx] = { ...updated[sIdx], points: [...updated[sIdx].points, { titleBn: "", titleEn: "", descBn: "", descEn: "" }] };
      return updated;
    });
  };

  const removePointFromNewSection = (sIdx: number, pIdx: number) => {
    setNewBlogSections((prev) => {
      const updated = [...prev];
      updated[sIdx] = { ...updated[sIdx], points: updated[sIdx].points.filter((_, i) => i !== pIdx) };
      return updated;
    });
  };

  const updatePointInNewSection = (sIdx: number, pIdx: number, field: "titleBn" | "titleEn" | "descBn" | "descEn", value: string) => {
    setNewBlogSections((prev) => {
      const updated = [...prev];
      const points = [...updated[sIdx].points];
      points[pIdx] = { ...points[pIdx], [field]: value };
      updated[sIdx] = { ...updated[sIdx], points };
      return updated;
    });
  };

  const handleSectionImageUpload = (sIdx: number, e: React.ChangeEvent<HTMLInputElement>, setter: typeof setNewBlogSections) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setter((prev) => {
          const updated = [...prev];
          updated[sIdx] = { ...updated[sIdx], image: reader.result as string };
          return updated;
        });
      };
      reader.readAsDataURL(file);
    }
  };

  // ---------- Multi-Section Helpers for Edit Blog ----------
  const updateEditSection = (sIdx: number, field: keyof BlogSectionAdmin, value: any) => {
    setEditBlogSections((prev) => {
      const updated = [...prev];
      updated[sIdx] = { ...updated[sIdx], [field]: value };
      return updated;
    });
  };

  const addEditSection = () => {
    setEditBlogSections((prev) => [...prev, emptySection()]);
  };

  const removeEditSection = (sIdx: number) => {
    setEditBlogSections((prev) => prev.filter((_, i) => i !== sIdx));
  };

  const addPointToEditSection = (sIdx: number) => {
    setEditBlogSections((prev) => {
      const updated = [...prev];
      updated[sIdx] = { ...updated[sIdx], points: [...updated[sIdx].points, { titleBn: "", titleEn: "", descBn: "", descEn: "" }] };
      return updated;
    });
  };

  const removePointFromEditSection = (sIdx: number, pIdx: number) => {
    setEditBlogSections((prev) => {
      const updated = [...prev];
      updated[sIdx] = { ...updated[sIdx], points: updated[sIdx].points.filter((_, i) => i !== pIdx) };
      return updated;
    });
  };

  const updatePointInEditSection = (sIdx: number, pIdx: number, field: "titleBn" | "titleEn" | "descBn" | "descEn", value: string) => {
    setEditBlogSections((prev) => {
      const updated = [...prev];
      const points = [...updated[sIdx].points];
      points[pIdx] = { ...points[pIdx], [field]: value };
      updated[sIdx] = { ...updated[sIdx], points };
      return updated;
    });
  };

  // Serialize sections state into API format
  const serializeSections = (sections: BlogSectionAdmin[], lang: "bn" | "en") => {
    return sections.map((sec) => {
      const raw = lang === "bn" ? sec.paragraphsBn : sec.paragraphsEn;
      const paragraphs = raw.split("\n\n").map((p) => p.trim()).filter(Boolean);
      const heading = lang === "bn" ? sec.headingBn : sec.headingEn;
      const subheading = lang === "bn" ? sec.subheadingBn : sec.subheadingEn;
      const captionBn = sec.imageCaptionBn;
      const captionEn = sec.imageCaptionEn;
      const callout = lang === "bn" ? sec.calloutBn : sec.calloutEn;
      const points = sec.points
        .filter((p) => lang === "bn" ? (p.titleBn.trim() || p.descBn.trim()) : (p.titleEn.trim() || p.descEn.trim() || p.titleBn.trim()))
        .map((p) => ({
          title: lang === "bn" ? p.titleBn : (p.titleEn || p.titleBn),
          desc: lang === "bn" ? p.descBn : (p.descEn || p.descBn),
        }));
      return {
        heading: heading || undefined,
        subheading: subheading || undefined,
        image: sec.image || undefined,
        imageCaptionBn: captionBn || undefined,
        imageCaptionEn: captionEn || undefined,
        paragraphs: paragraphs.length > 0 ? paragraphs : undefined,
        points: points.length > 0 ? points : undefined,
        callout: callout || undefined,
      };
    });
  };

  // Parse API sections into admin state
  const parseSections = (sectionsBn: any[], sectionsEn: any[]): BlogSectionAdmin[] => {
    const maxLen = Math.max(sectionsBn.length, sectionsEn.length);
    const result: BlogSectionAdmin[] = [];
    for (let i = 0; i < maxLen; i++) {
      const secBn = sectionsBn[i] || {};
      const secEn = sectionsEn[i] || {};
      const pointsBn = Array.isArray(secBn.points) ? secBn.points : [];
      const pointsEn = Array.isArray(secEn.points) ? secEn.points : [];
      const maxPts = Math.max(pointsBn.length, pointsEn.length);
      const points: BlogSectionAdmin["points"] = [];
      for (let j = 0; j < maxPts; j++) {
        points.push({
          titleBn: pointsBn[j]?.title || "",
          titleEn: pointsEn[j]?.title || pointsBn[j]?.title || "",
          descBn: pointsBn[j]?.desc || "",
          descEn: pointsEn[j]?.desc || pointsBn[j]?.desc || "",
        });
      }
      result.push({
        headingBn: secBn.heading || "",
        headingEn: secEn.heading || secBn.heading || "",
        subheadingBn: secBn.subheading || "",
        subheadingEn: secEn.subheading || secBn.subheading || "",
        image: secBn.image || secEn.image || "",
        imageCaptionBn: secBn.imageCaptionBn || "",
        imageCaptionEn: secBn.imageCaptionEn || secEn.imageCaptionEn || "",
        paragraphsBn: Array.isArray(secBn.paragraphs) ? secBn.paragraphs.join("\n\n") : "",
        paragraphsEn: Array.isArray(secEn.paragraphs) ? secEn.paragraphs.join("\n\n") : "",
        points,
        calloutBn: secBn.callout || "",
        calloutEn: secEn.callout || secBn.callout || "",
      });
    }
    return result.length > 0 ? result : [emptySection()];
  };

  // Start Edit Blog
  const handleStartEditBlog = (b: any) => {
    setEditBlogId(b.id);
    setEditBlogSlug(b.slug || b.id);
    setEditBlogTitleBn(b.titleBn || "");
    setEditBlogTitleEn(b.titleEn || "");
    setEditBlogCategory(b.category || "mentorship");
    setEditBlogFeatured(Boolean(b.featured));
    setEditBlogImage(b.image || "");
    setEditBlogExcerptBn(b.excerptBn || "");
    setEditBlogExcerptEn(b.excerptEn || "");
    setEditBlogReadTimeBn(b.readTimeBn || "৫ মিনিট পড়া");
    setEditBlogReadTimeEn(b.readTimeEn || "5 min read");
    setEditBlogDateBn(b.publishedDateBn || "");
    setEditBlogDateEn(b.publishedDateEn || "");
    setEditBlogAuthorNameBn(b.author?.nameBn || "OTOTeachers টিম");
    setEditBlogAuthorNameEn(b.author?.nameEn || "OTOTeachers Team");
    setEditBlogAuthorRoleBn(b.author?.roleBn || "কেক ের");
    setEditBlogAuthorRoleEn(b.author?.roleEn || "Academic Mentor");
    setEditBlogAuthorUniBn(b.author?.institutionBn || "ে ও ঢাবি");
    setEditBlogAuthorUniEn(b.author?.institutionEn || "BUET & DU");
    setEditBlogAuthorAvatar(b.author?.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80");
    setEditBlogTagsBn(Array.isArray(b.tagsBn) ? b.tagsBn.join(", ") : b.tagsBn || "");
    setEditBlogTagsEn(Array.isArray(b.tagsEn) ? b.tagsEn.join(", ") : b.tagsEn || "");
    setEditBlogIntroBn(b.introBn || "");
    setEditBlogIntroEn(b.introEn || "");
    setEditBlogTakeawaysBn(Array.isArray(b.keyTakeawaysBn) ? b.keyTakeawaysBn.join("\n") : "");
    setEditBlogTakeawaysEn(Array.isArray(b.keyTakeawaysEn) ? b.keyTakeawaysEn.join("\n") : "");
    setEditBlogSections(parseSections(b.sectionsBn || [], b.sectionsEn || []));
    setShowEditBlog(true);
  };

  // Create Blog (Full Schema)
  const handleCreateBlog = async (e: React.FormEvent) => {
    e.preventDefault();
    const slug = (newBlogSlug || newBlogTitleEn)
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "") || `article-${Date.now()}`;

    await fetch("/api/blogs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: slug,
        slug,
        titleBn: newBlogTitleBn,
        titleEn: newBlogTitleEn,
        category: newBlogCategory,
        featured: newBlogFeatured,
        image: newBlogImage,
        excerptBn: newBlogExcerptBn,
        excerptEn: newBlogExcerptEn,
        readTimeBn: newBlogReadTimeBn,
        readTimeEn: newBlogReadTimeEn,
        publishedDateBn: newBlogDateBn,
        publishedDateEn: newBlogDateEn,
        author: {
          nameBn: newBlogAuthorNameBn,
          nameEn: newBlogAuthorNameEn,
          roleBn: newBlogAuthorRoleBn,
          roleEn: newBlogAuthorRoleEn,
          institutionBn: newBlogAuthorUniBn,
          institutionEn: newBlogAuthorUniEn,
          avatar: newBlogAuthorAvatar,
        },
        tagsBn: newBlogTagsBn.split(",").map((t) => t.trim()).filter(Boolean),
        tagsEn: newBlogTagsEn.split(",").map((t) => t.trim()).filter(Boolean),
        introBn: newBlogIntroBn,
        introEn: newBlogIntroEn,
        sectionsBn: serializeSections(newBlogSections, "bn"),
        sectionsEn: serializeSections(newBlogSections, "en"),
        keyTakeawaysBn: newBlogTakeawaysBn.split("\n").map((t) => t.trim()).filter(Boolean),
        keyTakeawaysEn: newBlogTakeawaysEn.split("\n").map((t) => t.trim()).filter(Boolean),
      }),
    });
    setShowAddBlog(false);
    setNewBlogTitleBn("");
    setNewBlogTitleEn("");
    setNewBlogSlug("");
    setNewBlogExcerptBn("");
    setNewBlogExcerptEn("");
    setNewBlogSections([emptySection()]);
    fetchAllData();
  };

  // Update Blog (Full Schema)
  const handleUpdateBlog = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editBlogId) return;

    await fetch("/api/blogs", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: editBlogId,
        slug: editBlogSlug || editBlogId,
        titleBn: editBlogTitleBn,
        titleEn: editBlogTitleEn,
        category: editBlogCategory,
        featured: editBlogFeatured,
        image: editBlogImage,
        excerptBn: editBlogExcerptBn,
        excerptEn: editBlogExcerptEn,
        readTimeBn: editBlogReadTimeBn,
        readTimeEn: editBlogReadTimeEn,
        publishedDateBn: editBlogDateBn,
        publishedDateEn: editBlogDateEn,
        author: {
          nameBn: editBlogAuthorNameBn,
          nameEn: editBlogAuthorNameEn,
          roleBn: editBlogAuthorRoleBn,
          roleEn: editBlogAuthorRoleEn,
          institutionBn: editBlogAuthorUniBn,
          institutionEn: editBlogAuthorUniEn,
          avatar: editBlogAuthorAvatar,
        },
        tagsBn: editBlogTagsBn.split(",").map((t) => t.trim()).filter(Boolean),
        tagsEn: editBlogTagsEn.split(",").map((t) => t.trim()).filter(Boolean),
        introBn: editBlogIntroBn,
        introEn: editBlogIntroEn,
        sectionsBn: serializeSections(editBlogSections, "bn"),
        sectionsEn: serializeSections(editBlogSections, "en"),
        keyTakeawaysBn: editBlogTakeawaysBn.split("\n").map((t) => t.trim()).filter(Boolean),
        keyTakeawaysEn: editBlogTakeawaysEn.split("\n").map((t) => t.trim()).filter(Boolean),
      }),
    });
    setShowEditBlog(false);
    setEditBlogId("");
    fetchAllData();
  };

  // Delete Blog
  const handleDeleteBlog = async (id: string) => {
    if (confirm("Are you sure you want to delete this blog article?")) {
      await fetch(`/api/blogs?id=${id}`, { method: "DELETE" });
      fetchAllData();
    }
  };

  // Create FAQ (4 Options)
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

  // Start Edit FAQ (4 Options)
  const handleStartEditFaq = (faq: FAQItem) => {
    setEditFaqId(faq.id);
    setEditFaqQBn(faq.qBn || "");
    setEditFaqQEn(faq.qEn || "");
    setEditFaqABn(faq.aBn || "");
    setEditFaqAEn(faq.aEn || "");
    setShowEditFaq(true);
  };

  // Update FAQ (4 Options)
  const handleUpdateFaq = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editFaqId) return;
    await fetch("/api/faqs", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: editFaqId,
        qBn: editFaqQBn,
        qEn: editFaqQEn,
        aBn: editFaqABn,
        aEn: editFaqAEn,
      }),
    });
    setShowEditFaq(false);
    setEditFaqId("");
    fetchAllData();
  };

  // Delete FAQ
  const handleDeleteFaq = async (id: string) => {
    if (confirm("Delete this FAQ item?")) {
      await fetch(`/api/faqs?id=${id}`, { method: "DELETE" });
      fetchAllData();
    }
  };

    // Teacher Avatar Upload Handlers
  const handleTeacherAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewTeacherAvatar(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEditTeacherAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditTeacherAvatar(reader.result as string);
      };
      reader.readAsDataURL(file);
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
        phone: newTeacherPhone,
        email: newTeacherEmail,
        experienceBn: newTeacherExpBn,
        experienceEn: newTeacherExpEn,
        bioBn: newTeacherBioBn,
        bioEn: newTeacherBioEn,
      }),
    });
    setShowAddTeacher(false);
    setNewTeacherNameBn("");
    setNewTeacherNameEn("");
    setNewTeacherPhone("");
    setNewTeacherEmail("");
    setNewTeacherBioBn("");
    setNewTeacherBioEn("");
    fetchAllData();
  };

  // Start Edit Teacher
  const handleStartEditTeacher = (t: any) => {
    setEditTeacherId(t.id);
    setEditTeacherNameBn(t.nameBn || "");
    setEditTeacherNameEn(t.nameEn || "");
    setEditTeacherUniBn(t.universityBn || "");
    setEditTeacherUniEn(t.universityEn || "");
    setEditTeacherSubBn(t.subjectBn || "");
    setEditTeacherSubEn(t.subjectEn || "");
    setEditTeacherAvatar(t.avatar || "");
    setEditTeacherPhone(t.phone || "");
    setEditTeacherEmail(t.email || "");
    setEditTeacherExpBn(t.experienceBn || "৪+ বছরের শিক্ষকতার অভিজ্ঞতা");
    setEditTeacherExpEn(t.experienceEn || "4+ Years Mentoring Experience");
    setEditTeacherBioBn(t.bioBn || "");
    setEditTeacherBioEn(t.bioEn || "");
    setShowEditTeacher(true);
  };

  // Update Teacher
  const handleUpdateTeacher = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editTeacherId) return;
    await fetch("/api/teachers", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: editTeacherId,
        nameBn: editTeacherNameBn,
        nameEn: editTeacherNameEn,
        universityBn: editTeacherUniBn,
        universityEn: editTeacherUniEn,
        subjectBn: editTeacherSubBn,
        subjectEn: editTeacherSubEn,
        avatar: editTeacherAvatar,
        phone: editTeacherPhone,
        email: editTeacherEmail,
        experienceBn: editTeacherExpBn,
        experienceEn: editTeacherExpEn,
        bioBn: editTeacherBioBn,
        bioEn: editTeacherBioEn,
      }),
    });
    setShowEditTeacher(false);
    setEditTeacherId("");
    fetchAllData();
  };

  // Delete Teacher
  const handleDeleteTeacher = async (id: string) => {
    if (confirm("Are you sure you want to delete this teacher profile?")) {
      await fetch(`/api/teachers?id=${id}`, { method: "DELETE" });
      fetchAllData();
    }
  };// Save Settings
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

    // Custom Pages Handlers
  const handleStartEditPage = (page: CustomPage) => {
    setEditingPage(JSON.parse(JSON.stringify(page)));
    setShowPageModal(true);
  };

  const handleStartAddPage = () => {
    setEditingPage({
      id: "custom-" + Date.now(),
      slug: "",
      titleBn: "",
      titleEn: "",
      subtitleBn: "",
      subtitleEn: "",
      lastUpdatedBn: "১০ আগস্ট, ২০২৬",
      lastUpdatedEn: "August 10, 2026",
      metaTitleBn: "",
      metaTitleEn: "",
      metaDescriptionBn: "",
      metaDescriptionEn: "",
      sections: [
        {
          id: "sec-" + Date.now(),
          icon: "ShieldCheck",
          titleBn: "",
          titleEn: "",
          contentBn: "",
          contentEn: "",
        },
      ],
    });
    setShowPageModal(true);
  };

  const handleSavePage = async () => {
    if (!editingPage) return;
    if (!editingPage.slug || !editingPage.titleBn) {
      alert("অনুগ্রহ করে পৃষ্ঠার Slug এবং বাংলা শিরোনাম পূরণ করুন।");
      return;
    }
    setPageSaving(true);
    try {
      const res = await fetch("/api/pages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingPage),
      });
      if (res.ok) {
        setShowPageModal(false);
        setEditingPage(null);
        fetchAllData();
      } else {
        alert("পৃষ্ঠা সংরক্ষণ করতে সমস্যা হয়েছে।");
      }
    } catch (e) {
      console.error(e);
      alert("Error saving page");
    } finally {
      setPageSaving(false);
    }
  };

  const handleDeletePage = async (idOrSlug: string) => {
    if (confirm("আপনি কি নিশ্চিত এই পৃষ্ঠাটি মুছে ফেলতে চান? (Are you sure you want to delete this page?)")) {
      const res = await fetch(`/api/pages?id=${idOrSlug}`, { method: "DELETE" });
      if (res.ok) {
        fetchAllData();
      } else {
        alert("পৃষ্ঠা ডিলিট করতে সমস্যা হয়েছে।");
      }
    }
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

  // Admin Login Screen
  if (!isAuthenticated) {
    return (
      <main className="min-h-screen bg-[#0A2239] relative flex items-center justify-center p-4 sm:p-6 font-sans overflow-hidden">
        {/* Background ambient decorative glows */}
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-[#00A896]/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-[#38BDF8]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#0D2C4A]/50 rounded-full blur-2xl pointer-events-none" />

        {/* Login Card */}
        <div className="relative z-10 bg-white/95 backdrop-blur-xl rounded-3xl p-8 sm:p-10 max-w-md w-full shadow-2xl border border-white/40 text-center space-y-6">
          {/* Header Brand & Shield Icon */}
          <div className="space-y-3">
            <div className="relative inline-flex">
              <div className="w-16 h-16 bg-gradient-to-tr from-[#00A896] to-[#0D2C4A] text-white rounded-2xl flex items-center justify-center mx-auto shadow-lg shadow-[#00A896]/30">
                <ShieldCheck className="w-8 h-8 text-[#5EEAD4]" />
              </div>
              <span className="absolute -bottom-1 -right-1 flex h-4 w-4">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00A896] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-4 w-4 bg-[#00A896] border-2 border-white"></span>
              </span>
            </div>

            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E6F4F3] border border-[#00A896]/20 text-[#008075] text-[11px] font-extrabold uppercase tracking-wider mb-2">
                <Sparkles className="w-3 h-3 text-[#00A896]" />
                Super Admin Access
              </div>
              <h1 className="text-2xl font-black text-[#0D2C4A] tracking-tight">ototeachers.com Admin</h1>
              <p className="text-xs text-slate-500 font-medium pt-1">
                One-to-One Tutoring Platform Control Center
              </p>
            </div>
          </div>

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-4 text-left">
            {/* Email Field */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-[#0D2C4A]">
                ইমেইল েস / Email Address <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="email"
                  required
                  placeholder="sajib@sajib.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#00A896] focus:ring-2 focus:ring-[#00A896]/20 font-medium text-[#0D2C4A] transition-all bg-slate-50/50 hover:bg-white"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="block text-xs font-bold text-[#0D2C4A]">
                  পাসওয়ার্ড / Password <span className="text-rose-500">*</span>
                </label>
                <span className="text-[11px] text-[#00A896] font-semibold">Authorized Only</span>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-10 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#00A896] focus:ring-2 focus:ring-[#00A896]/20 font-mono text-[#0D2C4A] transition-all bg-slate-50/50 hover:bg-white"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  tabIndex={-1}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-[#0D2C4A] transition-colors p-1 cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Remember Me & Auto-fill row */}
            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded text-[#00A896] focus:ring-[#00A896] border-slate-300 accent-[#00A896]"
                />
                <span className="text-xs font-medium text-slate-600">মনে রাখুন (Remember me)</span>
              </label>

              <button
                type="button"
                onClick={() => {
                  setEmail("sajib@sajib.com");
                  setPassword("Sajib#123456");
                }}
                className="text-[11px] text-[#00A896] hover:text-[#008075] font-bold hover:underline transition-colors cursor-pointer"
                title="Auto-fill credentials"
              >
                Auto-fill credentials
              </button>
            </div>

            {/* Error Message Banner */}
            {authError && (
              <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold flex items-center gap-2.5">
                <AlertCircle className="w-4 h-4 text-rose-500 shrink-0" />
                <span>{authErrorMessage || "ভুল ইমেইল বা পাসওয়ার্ড! Invalid email or password."}</span>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={authLoading}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#00A896] to-[#008075] hover:from-[#008075] hover:to-[#006b62] text-white font-extrabold text-sm transition-all shadow-lg shadow-[#00A896]/30 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed hover:shadow-xl hover:scale-[1.01] active:scale-[0.99]"
            >
              {authLoading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin text-white" />
                  <span>যাচাই করা š›ে... / Logging in...</span>
                </>
              ) : (
                <>
                  <span>েশ করুন / Sign In to Admin</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Card Footer Security note */}
          <div className="pt-2 border-t border-slate-100 flex items-center justify-center gap-2 text-[11px] text-slate-400 font-medium">
            <Lock className="w-3 h-3 text-[#00A896]" />
            <span>End-to-end encrypted session • 256-bit SSL</span>
          </div>
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
  const pendingTeacherAppsCount = teacherApplications.filter((a) => (a.status || "Pending") === "Pending").length;
  const pendingPricingCount = pricingRequests.filter((p) => (p.status || "Pending") === "Pending").length;
  const pendingInquiriesCount = inquiries.filter((i) => (i.status || "Pending") === "Pending").length;
  const pendingContactsCount = contacts.length;

  return (
    <div className="admin-theme min-h-screen bg-[#F8FAFC] text-[#0D2C4A] font-sans flex" data-admin-theme="true">
      
      {/* ===== FIXED LEFT NAVIGATION SIDEBAR ===== */}
      {/* Locked to screen: fixed left-0 top-0 bottom-0 h-screen w-64 */}
      <aside className="fixed left-0 top-0 bottom-0 h-screen w-64 bg-[#0D2C4A] text-white flex flex-col justify-between p-6 shadow-2xl border-r border-[#00A896]/20 z-30 overflow-y-auto">
        <div className="space-y-6">
          
          {/* Brand Logo & Header */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#00A896] to-[#38BDF8] flex items-center justify-center shadow-md">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="font-extrabold text-lg text-white tracking-tight block leading-tight admin-heading-sm">ototeachers.com</span>
              <span className="admin-kicker text-[#00A896] block font-bold">Admin Portal</span>
            </div>
          </div>

          {/* Logged in Admin User Card */}
          <div className="bg-white/10 rounded-2xl p-3 border border-white/10 flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#00A896] to-[#38BDF8] text-white flex items-center justify-center font-extrabold text-sm shadow shrink-0">
              {adminUser?.name ? adminUser.name.charAt(0).toUpperCase() : "S"}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-extrabold text-white truncate leading-tight">
                {adminUser?.name || "Sajib Ahmed"}
              </p>
              <p className="text-[10px] text-slate-300 font-mono truncate">
                {adminUser?.email || "sajib@sajib.com"}
              </p>
            </div>
            <span className="px-1.5 py-0.5 rounded bg-[#00A896]/30 text-[#5EEAD4] text-[9px] font-bold uppercase tracking-wider">
              Admin
            </span>
          </div>

          {/* Navigation Links Menu */}
          <nav className="space-y-1.5 font-sans">
            {[
              { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
                            { id: "enrollments", label: "Student Requests", icon: Users, count: pendingEnrollmentsCount },
              { id: "teachers", label: "Tutors Directory", icon: UserCheck, count: pendingTeacherAppsCount },
                            { id: "pricing", label: "Pricing Plan", icon: DollarSign, count: pendingPricingCount },
              { id: "inquiries", label: "Support Tickets", icon: MessageSquare, count: pendingInquiriesCount },
              { id: "contacts", label: "Messages", icon: Mail, count: pendingContactsCount },
              { id: "payments", label: "Transactions", icon: CreditCard },
              { id: "blogs", label: "Blog Posts", icon: FileText },
              { id: "faqs", label: "FAQ Items", icon: HelpCircle },
              { id: "pages", label: "Pages Management", icon: Layers, count: customPages.length },
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
            onClick={handleLogout}
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
              <span>Saturday, August 08, 2026</span>
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
              <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#00A896] to-[#0D2C4A] text-white flex items-center justify-center font-extrabold text-sm shadow-md">
                {adminUser?.name ? adminUser.name.charAt(0).toUpperCase() : "S"}
              </div>
              <div className="hidden sm:block text-left">
                <strong className="block admin-caption-text font-extrabold text-[#0D2C4A] leading-tight">
                  {adminUser?.name || "Sajib Ahmed"}
                </strong>
                <span className="admin-chip-label text-slate-400 font-mono text-[10px]">
                  {adminUser?.email || "sajib@sajib.com"}
                </span>
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
                            <p className="text-[11px] text-slate-500 font-mono truncate flex items-center gap-2">
                              <span className="flex items-center gap-0.5"><MapPin className="w-3 h-3 text-slate-400" />{enr.district}</span>
                              <span>•</span>
                              <span className="flex items-center gap-1 text-xs sm:text-sm font-bold font-mono text-[#00A896]"><PhoneCall className="w-3.5 h-3.5 text-[#00A896]" />{enr.phone}</span>
                            </p>
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
              {activeTab === "enrollments" && (() => {
                const isTrialEnrollment = (e: Enrollment) =>
                  Boolean(
                    e.selectedPlan?.toLowerCase().includes("trial") ||
                    e.selectedPlan?.toLowerCase().includes("free")
                  );

                const trialCount = enrollments.filter(isTrialEnrollment).length;
                const studentCount = enrollments.filter((e) => !isTrialEnrollment(e)).length;

                const displayedEnrollments = enrollments.filter((e) => {
                  if (statusFilter !== "All" && e.status !== statusFilter) return false;
                  if (enrollmentTypeTab === "trial") return isTrialEnrollment(e);
                  if (enrollmentTypeTab === "student") return !isTrialEnrollment(e);
                  return true;
                });

                return (
                  <div className="space-y-6">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                      <div>
                        <h2 className="text-xl font-extrabold text-[#0D2C4A]">Students request list ({displayedEnrollments.length})</h2>
                        <p className="text-xs text-slate-500">Manage 1-on-1 online class student enrollments and free trial requests</p>
                      </div>

                      {/* Status Filter Dropdown */}
                      <div className="flex items-center gap-2">
                        <Filter className="w-4 h-4 text-slate-400" />
                        <select
                          value={statusFilter}
                          onChange={(e) => setStatusFilter(e.target.value)}
                          className="text-xs font-bold px-3 py-2 rounded-xl border border-slate-300 bg-white cursor-pointer"
                        >
                          <option value="All">All Statuses</option>
                          <option value="Pending">Pending</option>
                          <option value="Contacted">Contacted</option>
                          <option value="Enrolled">Enrolled</option>
                          <option value="Rejected">Rejected</option>
                        </select>
                      </div>
                    </div>

                    {/* Content Area 3 Sub-Buttons: 1. All Request | 2. Student Request | 3. Free Trial Request */}
                    <div className="flex flex-wrap items-center gap-2.5 p-1.5 bg-slate-100/90 rounded-2xl border border-slate-200/80 w-fit">
                      <button
                        type="button"
                        onClick={() => setEnrollmentTypeTab("all")}
                        className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                          enrollmentTypeTab === "all"
                            ? "bg-[#0D2C4A] text-white shadow-sm"
                            : "text-slate-600 hover:text-[#0D2C4A] hover:bg-white/70"
                        }`}
                      >
                        1. All Request ({enrollments.length})
                      </button>

                      <button
                        type="button"
                        onClick={() => setEnrollmentTypeTab("student")}
                        className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                          enrollmentTypeTab === "student"
                            ? "bg-[#0D2C4A] text-white shadow-sm"
                            : "text-slate-600 hover:text-[#0D2C4A] hover:bg-white/70"
                        }`}
                      >
                        2. Student Request ({studentCount})
                      </button>

                      <button
                        type="button"
                        onClick={() => setEnrollmentTypeTab("trial")}
                        className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                          enrollmentTypeTab === "trial"
                            ? "bg-[#00A896] text-white shadow-sm"
                            : "text-slate-600 hover:text-[#00A896] hover:bg-white/70"
                        }`}
                      >
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>3. Free Trial Request ({trialCount})</span>
                      </button>
                    </div>

                    <div className="space-y-4">
                      {displayedEnrollments.map((e) => {
                        const isTrial = isTrialEnrollment(e);
                        return (
                          <div
                            key={e.id}
                            className="bg-slate-50 rounded-2xl p-5 border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:border-[#00A896]/40 transition-all shadow-xs"
                          >
                            <div className="space-y-1.5 min-w-0">
                              <div className="flex flex-wrap items-center gap-2">
                                <h3 className="font-extrabold text-base text-[#0D2C4A]">{e.studentName}</h3>
                                <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-full bg-[#00A896]/10 text-[#00A896]">
                                  {e.grade}
                                </span>
                                {e.medium && (
                                  <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-full bg-slate-200 text-slate-700">
                                    {e.medium}
                                  </span>
                                )}
                                <span
                                  className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${
                                    isTrial
                                      ? "bg-amber-50 text-amber-800 border-amber-300"
                                      : "bg-blue-50 text-blue-800 border-blue-200"
                                  }`}
                                >
                                  {isTrial ? "Free Trial Request" : "Student Request"}
                                </span>
                              </div>
                              <div className="flex flex-wrap items-center gap-3 text-xs text-slate-600 font-mono">
                                  <span className="flex items-center gap-1 font-bold text-[#00A896]">
                                    <PhoneCall className="w-3.5 h-3.5 text-[#00A896]" />
                                    <span>{e.phone}</span>
                                  </span>
                                  <span className="flex items-center gap-1 text-slate-500">
                                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                                    <span>{e.district}</span>
                                  </span>
                                  <span className="flex items-center gap-1 text-slate-500">
                                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                                    <span>{e.preferredTime}</span>
                                  </span>
                                </div>
                              <p className="text-xs font-bold text-slate-500">
                                Subjects: {e.selectedSubjects && e.selectedSubjects.length > 0 ? e.selectedSubjects.join(", ") : "All Subjects"}
                              </p>
                            </div>

                            <div className="flex items-center gap-3 shrink-0">
                              <select
                                value={e.status}
                                onChange={(ev) => handleUpdateEnrollmentStatus(e.id, ev.target.value)}
                                className="text-xs font-bold px-3 py-2 rounded-xl border border-slate-300 bg-white cursor-pointer"
                              >
                                <option value="Pending">Pending</option>
                                <option value="Contacted">Contacted</option>
                                <option value="Enrolled">Enrolled</option>
                                <option value="Rejected">Rejected</option>
                              </select>

                              <button
                                onClick={() => handleDeleteEnrollment(e.id)}
                                className="p-2 rounded-xl bg-rose-100 text-rose-600 hover:bg-rose-200 transition-colors cursor-pointer"
                                title="Delete Request"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        );
                      })}
                      {displayedEnrollments.length === 0 && (
                        <div className="text-center py-12 bg-slate-50 rounded-2xl border border-slate-200 text-slate-400 text-xs">
                          No requests found under this filter.
                        </div>
                      )}
                    </div>
                  </div>
                );
              })()}

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

              {/* ===== TAB 4: TUTORS DIRECTORY (with Mentor Apps sub-tab) ===== */}
              {activeTab === "teachers" && (
                <TutorsDirectorySection
                  teachers={teachers}
                  teacherApplications={teacherApplications}
                  onAddTeacher={() => setShowAddTeacher(true)}
                  onEditTeacher={handleStartEditTeacher}
                  onDeleteTeacher={handleDeleteTeacher}
                  onApproveApplication={(id: string) => handleUpdateTeacherApplicationStatus(id, "Approved")}
                  onDeleteApplication={handleDeleteTeacherApplication}
                />
              )}

              {/* ===== TAB 5: PRICING REQUESTS ===== */}
              {activeTab === "pricing" && (
                <div className="space-y-6">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div>
                      <h2 className="text-xl font-extrabold text-[#0D2C4A]">Pricing &amp; Sliding Scale Inquiries ({pricingRequests.length})</h2>
                      <p className="text-xs text-slate-500">Pay-What-You-Can calculator and custom package requests with student phone numbers</p>
                    </div>
                  </div>

                  {pricingRequests.length === 0 ? (
                    <div className="text-center py-16 bg-slate-50 rounded-2xl border border-dashed border-slate-200 text-slate-400">
                      <DollarSign className="w-10 h-10 mx-auto mb-2 opacity-30 text-[#00A896]" />
                      <p className="text-xs font-bold">No pricing inquiries submitted yet</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {pricingRequests.map((p, idx) => {
                        const isPending = (p.status || "Pending") === "Pending";
                        return (
                          <div
                            key={p.id}
                            className="bg-slate-50/90 rounded-2xl p-5 border border-slate-200/90 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-[#00A896]/50 transition-all shadow-xs hover:shadow-sm"
                          >
                            <div className="space-y-2 flex-1 min-w-0">
                              <div className="flex flex-wrap items-center gap-2">
                                <span className="w-6 h-6 rounded-full bg-[#0D2C4A] text-white font-mono font-extrabold text-[11px] flex items-center justify-center shadow-xs shrink-0">
                                  {idx + 1}
                                </span>
                                <span className="text-[10px] font-mono font-bold text-[#00A896] bg-[#00A896]/10 border border-[#00A896]/20 px-2.5 py-0.5 rounded-full">
                                  {p.id}
                                </span>
                                <h3 className="font-extrabold text-base text-[#0D2C4A]">{p.planName}</h3>
                                <span className="text-xs font-mono font-bold text-[#00A896] bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">
                                  ৳{p.monthlyFee} / mo
                                </span>
                              </div>

                              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs pt-1">
                                <div className="flex items-center gap-1.5 font-semibold text-[#0D2C4A]">
                                  <User className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                                  <span className="truncate">{p.studentName || "Prospective Student"}</span>
                                </div>
                                <div className="flex items-center gap-1.5 font-mono font-bold text-[#00A896] bg-white px-2.5 py-1 rounded-xl border border-slate-200 w-fit">
                                  <PhoneCall className="w-3.5 h-3.5 text-[#00A896] shrink-0" />
                                  <span>{p.phone || "01712345678"}</span>
                                </div>
                                <div className="flex items-center gap-1.5 text-slate-500 font-mono">
                                  <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                                  <span>Duration: {p.duration}</span>
                                </div>
                              </div>
                            </div>

                            <div className="flex items-center gap-3 shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-slate-200">
                              <select
                                value={p.status || "Pending"}
                                onChange={(e) => handleUpdatePricingStatus(p.id, e.target.value)}
                                className={`text-xs font-bold px-3 py-2 rounded-xl border cursor-pointer focus:outline-none focus:border-[#00A896] ${
                                  isPending
                                    ? "bg-amber-50 text-amber-800 border-amber-200"
                                    : "bg-emerald-50 text-emerald-800 border-emerald-200"
                                }`}
                              >
                                <option value="Pending">Pending</option>
                                <option value="Contacted">Contacted</option>
                                <option value="Completed">Completed</option>
                                <option value="Cancelled">Cancelled</option>
                              </select>

                              <button
                                type="button"
                                onClick={() => handleDeletePricingRequest(p.id)}
                                className="p-2 rounded-xl bg-rose-50 text-rose-600 hover:bg-rose-100 hover:text-rose-700 transition-colors cursor-pointer border border-rose-100"
                                title="Delete inquiry"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}

              {/* ===== TAB 6: SUPPORT TICKETS & INQUIRIES ===== */}
              {activeTab === "inquiries" && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-xl font-extrabold text-[#0D2C4A]">Support Tickets &amp; Inquiries ({inquiries.length})</h2>
                      <p className="text-xs text-slate-500">Parent and student callback tickets with contact numbers</p>
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
                    {inquiries.map((inq, idx) => (
                      <div key={inq.id} className="bg-slate-50 rounded-2xl p-5 border border-slate-200 space-y-3 hover:border-[#00A896]/40 transition-all">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2.5">
                            <span className="w-6 h-6 rounded-full bg-[#0D2C4A] text-white font-mono font-extrabold text-[11px] flex items-center justify-center shadow-xs shrink-0">
                              {idx + 1}
                            </span>
                            <h3 className="font-extrabold text-sm text-[#0D2C4A]">{inq.name}</h3>
                          </div>
                          <span className="text-xs font-mono font-bold text-[#00A896] bg-white px-2.5 py-1 rounded-xl border border-slate-200 flex items-center gap-1.5">
                            <PhoneCall className="w-3.5 h-3.5 text-[#00A896]" />
                            <span>{inq.phone}</span>
                          </span>
                        </div>
                        <p className="text-xs font-bold text-[#00A896]">Subject: {inq.subject}</p>
                        <p className="text-xs text-slate-600 bg-white p-3 rounded-xl border border-slate-100 leading-relaxed">{inq.message}</p>

                        <div className="flex items-center justify-between pt-2">
                          <select
                            value={inq.status || "Pending"}
                            onChange={(e) => handleUpdateInquiryStatus(inq.id, e.target.value)}
                            className="text-xs font-bold px-3 py-1 rounded-xl border border-slate-300 bg-white cursor-pointer"
                          >
                            <option value="Pending">Pending</option>
                            <option value="Contacted">Contacted</option>
                            <option value="Resolved">Resolved</option>
                          </select>

                          <button onClick={() => handleDeleteInquiry(inq.id)} className="p-1.5 text-rose-600 hover:bg-rose-100 rounded-lg cursor-pointer">
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
                    {contacts.map((c, idx) => (
                      <div key={c.id} className="bg-slate-50 rounded-2xl p-5 border border-slate-200 space-y-3 hover:border-[#00A896]/40 transition-all">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2.5">
                            <span className="w-6 h-6 rounded-full bg-[#0D2C4A] text-white font-mono font-extrabold text-[11px] flex items-center justify-center shadow-xs shrink-0">
                              {idx + 1}
                            </span>
                            <h3 className="font-extrabold text-sm text-[#0D2C4A]">{c.name}</h3>
                          </div>
                          <span className="text-xs font-mono text-slate-400">{c.createdAt}</span>
                        </div>
                        <div className="flex flex-wrap items-center gap-3 text-xs">
                          <span className="font-mono font-bold text-[#00A896] bg-white px-2.5 py-1 rounded-xl border border-slate-200 flex items-center gap-1.5">
                            <PhoneCall className="w-3.5 h-3.5 text-[#00A896]" />
                            <span>{c.phone}</span>
                          </span>
                          <span className="font-mono text-slate-500 bg-white px-2.5 py-1 rounded-xl border border-slate-200 flex items-center gap-1.5">
                            <Mail className="w-3.5 h-3.5 text-slate-400" />
                            <span>{c.email}</span>
                          </span>
                        </div>
                        <p className="text-xs font-bold text-[#00A896]">Subject: {c.subject}</p>
                        <p className="text-xs text-slate-700 bg-white p-3 rounded-xl border border-slate-100 leading-relaxed">{c.message}</p>
                        <div className="flex justify-end pt-1">
                          <button onClick={() => handleDeleteContact(c.id)} className="p-1.5 text-rose-600 hover:bg-rose-100 rounded-lg cursor-pointer">
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

              {/* ===== TAB 9: BLOG POSTS & EDUCATIONAL GUIDES ===== */}
              {activeTab === "blogs" && (
                <div className="space-y-6">
                  {/* Top Bar Header & Action */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div>
                      <h2 className="text-xl font-extrabold text-[#0D2C4A]">Blog Articles & Guides ({blogs.length})</h2>
                      <p className="text-xs text-slate-500">Manage 1-on-1 tutoring guides, board exam secrets, and academic strategies</p>
                    </div>
                    <button
                      onClick={() => setShowAddBlog(true)}
                      className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-[#00A896] text-white text-xs font-extrabold hover:bg-[#008075] transition-all shadow-md cursor-pointer"
                    >
                      <Plus className="w-4 h-4" />
                      <span>+ Write New Article</span>
                    </button>
                  </div>

                  {/* Search & Category Filter Controls */}
                  <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 bg-slate-50 p-3.5 rounded-2xl border border-slate-200">
                    {/* Category Filter Pills */}
                    <div className="flex flex-wrap items-center gap-1.5">
                      {[
                        { id: "all", label: "All Categories" },
                        { id: "mentorship", label: "1-on-1 Mentorship" },
                        { id: "board-prep", label: "Board Prep" },
                        { id: "math-science", label: "Math & Science" },
                        { id: "english", label: "English Skills" },
                        { id: "parenting", label: "Parenting Guide" },
                      ].map((cat) => (
                        <button
                          key={cat.id}
                          onClick={() => setBlogFilterCategory(cat.id)}
                          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                            blogFilterCategory === cat.id
                              ? "bg-[#0D2C4A] text-white shadow-sm"
                              : "bg-white text-slate-600 hover:bg-slate-200 border border-slate-200"
                          }`}
                        >
                          {cat.label}
                        </button>
                      ))}
                    </div>

                    {/* Search Bar */}
                    <div className="relative min-w-[220px]">
                      <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        type="text"
                        placeholder="Search articles..."
                        value={blogSearchQuery}
                        onChange={(e) => setBlogSearchQuery(e.target.value)}
                        className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl bg-white border border-slate-200 focus:outline-none focus:border-[#00A896] font-sans"
                      />
                    </div>
                  </div>

                  {/* Blog Cards List */}
                  <div className="space-y-4">
                    {blogs
                      .filter((b) => {
                        const matchesCat = blogFilterCategory === "all" || b.category === blogFilterCategory;
                        const q = blogSearchQuery.toLowerCase().trim();
                        if (!q) return matchesCat;
                        const matchTitle = (b.titleBn && b.titleBn.toLowerCase().includes(q)) || (b.titleEn && b.titleEn.toLowerCase().includes(q));
                        const matchSlug = b.slug && b.slug.toLowerCase().includes(q);
                        const matchExcerpt = (b.excerptBn && b.excerptBn.toLowerCase().includes(q)) || (b.excerptEn && b.excerptEn.toLowerCase().includes(q));
                        return matchesCat && (matchTitle || matchSlug || matchExcerpt);
                      })
                      .map((b) => (
                        <div
                          key={b.id || b.slug}
                          className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-xs hover:border-[#00A896]/40 hover:shadow-md transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-5 group"
                        >
                          {/* Image & Main Info */}
                          <div className="flex items-start gap-4 flex-1">
                            {/* Image Thumbnail */}
                            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden bg-slate-100 flex-shrink-0 border border-slate-200 relative">
                              <img
                                src={b.image || "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=400&q=80"}
                                alt={b.titleBn}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                              />
                              {b.featured && (
                                <span className="absolute top-1.5 left-1.5 px-1.5 py-0.5 rounded-md bg-amber-500 text-white font-mono text-[9px] font-extrabold shadow-sm">
                                  ⭐ Featured
                                </span>
                              )}
                            </div>

                            {/* Details */}
                            <div className="space-y-2 flex-1 min-w-0">
                              <div className="flex flex-wrap items-center gap-2">
                                <span className="px-2.5 py-0.5 rounded-full bg-[#00A896]/10 text-[#00A896] text-[10px] font-mono font-bold uppercase">
                                  {b.category || "mentorship"}
                                </span>
                                <span className="text-slate-400 text-xs">•</span>
                                <span className="text-slate-500 font-mono text-xs">
                                  {b.publishedDateBn || b.publishedDateEn || "০৬ †—, ২০২৬"}
                                </span>
                                <span className="text-slate-400 text-xs">•</span>
                                <span className="text-slate-500 font-mono text-xs">
                                  {b.readTimeBn || b.readTimeEn || "৫ মিনিট পড়া"}
                                </span>
                              </div>

                              <div>
                                <h3 className="font-extrabold text-sm sm:text-base text-[#0D2C4A] leading-snug line-clamp-2">
                                  {b.titleBn}
                                </h3>
                                {b.titleEn && (
                                  <p className="text-xs text-slate-500 font-medium line-clamp-1">
                                    {b.titleEn}
                                  </p>
                                )}
                              </div>

                              <p className="text-xs text-slate-600 line-clamp-2">
                                {b.excerptBn || b.excerptEn}
                              </p>

                              {/* Author & Slug */}
                              <div className="flex flex-wrap items-center gap-3 pt-1 text-[11px] text-slate-500 font-mono">
                                <span>️ {b.author?.nameBn || "OTOTeachers টিম"} ({b.author?.institutionBn || "ে/ঢাবি"})</span>
                                <span className="flex items-center gap-1 text-slate-400"><Share2 className="w-3 h-3 text-[#00A896]" /><code className="bg-slate-100 px-1.5 py-0.5 rounded text-[#0D2C4A]">/blogs/{b.slug || b.id}</code></span>
                              </div>
                            </div>
                          </div>

                          {/* Action Buttons */}
                          <div className="flex items-center gap-2 self-end md:self-center">
                            {/* Live View Button */}
                            <a
                              href={`/blogs/${b.slug || b.id}`}
                              target="_blank"
                              rel="noreferrer"
                              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-100 text-slate-700 hover:bg-[#00A896] hover:text-white text-xs font-bold transition-all cursor-pointer"
                              title="View on Frontend"
                            >
                              <ExternalLink className="w-3.5 h-3.5" />
                              <span>Live View</span>
                            </a>

                            {/* Edit Button */}
                            <button
                              onClick={() => handleStartEditBlog(b)}
                              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-blue-50 text-blue-700 hover:bg-blue-100 text-xs font-bold transition-colors cursor-pointer"
                              title="Edit Article"
                            >
                              <Edit className="w-3.5 h-3.5" />
                              <span>Edit</span>
                            </button>

                            {/* Delete Button */}
                            <button
                              onClick={() => handleDeleteBlog(b.id || b.slug)}
                              className="p-2 rounded-xl bg-rose-50 text-rose-600 hover:bg-rose-100 transition-colors cursor-pointer"
                              title="Delete Article"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              )}

              
              {/* ===== TAB 11: CUSTOM PAGES MANAGEMENT ===== */}
              {activeTab === "pages" && (
                <div className="space-y-6">
                  {/* Top Bar Header & Action */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div>
                      <h2 className="text-xl font-extrabold text-[#0D2C4A] flex items-center gap-2">
                        <Layers className="w-5 h-5 text-[#00A896]" />
                        <span>Pages &amp; Policies Management ({customPages.length})</span>
                      </h2>
                      <p className="text-xs text-slate-500">
                        Manage Privacy Policy, Terms of Service, Refund Policy, and custom pages dynamically
                      </p>
                    </div>
                    <button
                      onClick={handleStartAddPage}
                      className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-[#00A896] text-white text-xs font-extrabold hover:bg-[#008075] transition-all shadow-md cursor-pointer active:scale-95"
                    >
                      <Plus className="w-4 h-4" />
                      <span>+ Create New Page</span>
                    </button>
                  </div>

                  {/* Core Policies Notice */}
                  <div className="p-4 rounded-2xl bg-gradient-to-r from-[#0D2C4A]/5 via-[#00A896]/5 to-transparent border border-[#00A896]/20 flex items-center gap-3">
                    <ShieldCheck className="w-5 h-5 text-[#00A896] shrink-0" />
                    <div className="text-xs text-slate-600">
                      <strong className="text-[#0D2C4A]">ডাইনামিক পৃষ্ঠা ব্যবস্থাপনা:</strong> এখানে সংরক্ষিত ও এডিট করা সকল তথ্য তাৎক্ষণিকভাবে লাইভ ওয়েবসাইটের সংশ্লিষ্ট পেজে (যেমন: <code className="text-[#00A896] font-mono bg-white px-1.5 py-0.5 rounded border border-slate-200">/privacy</code>, <code className="text-[#00A896] font-mono bg-white px-1.5 py-0.5 rounded border border-slate-200">/terms</code>, <code className="text-[#00A896] font-mono bg-white px-1.5 py-0.5 rounded border border-slate-200">/refund-policy</code>) আপডেট হবে।
                    </div>
                  </div>

                  {/* Pages Cards Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {customPages.map((p) => {
                      const pageUrl = ['privacy', 'terms', 'refund-policy'].includes(p.slug) ? `/${p.slug}` : `/pages/${p.slug}`;
                      const isCore = ['privacy', 'terms', 'refund-policy'].includes(p.slug);

                      return (
                        <div
                          key={p.id || p.slug}
                          className="bg-white rounded-3xl p-6 border-2 border-slate-200/80 hover:border-[#00A896]/60 shadow-xs hover:shadow-md transition-all space-y-4 flex flex-col justify-between"
                        >
                          <div className="space-y-3">
                            {/* Top Badge & Slug */}
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-mono font-extrabold text-[#00A896] bg-[#00A896]/10 border border-[#00A896]/20 px-3 py-1 rounded-xl">
                                {pageUrl}
                              </span>
                              {isCore ? (
                                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                                  Core Policy
                                </span>
                              ) : (
                                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-blue-50 text-blue-800 border border-blue-200">
                                  Custom Page
                                </span>
                              )}
                            </div>

                            {/* Titles */}
                            <div>
                              <h3 className="font-extrabold text-base text-[#0D2C4A] leading-snug">
                                {p.titleBn}
                              </h3>
                              <p className="text-xs font-mono font-bold text-[#00A896] pt-0.5">
                                {p.titleEn || p.slug}
                              </p>
                            </div>

                            {/* Subtitle / Excerpt */}
                            <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                              {p.subtitleBn || p.subtitleEn || "কোনো সংক্ষিপ্ত বিবরণ দেওয়া হয়নি।"}
                            </p>

                            {/* Stats: Section count & Last updated */}
                            <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100 text-[11px] text-slate-500 font-mono">
                              <span className="px-2 py-0.5 rounded-md bg-slate-100 font-bold text-slate-700">
                                📑 {p.sections?.length || 0} Sections
                              </span>
                              <span>•</span>
                              <span>Updated: {p.lastUpdatedBn || "১০ আগস্ট, ২০২৬"}</span>
                            </div>
                          </div>

                          {/* Action Buttons */}
                          <div className="flex items-center gap-2 pt-3 border-t border-slate-100">
                            {/* Live View */}
                            <a
                              href={pageUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-slate-100 text-slate-700 hover:bg-[#00A896] hover:text-white text-xs font-bold transition-all cursor-pointer shadow-2xs"
                              title="View page live on website"
                            >
                              <ExternalLink className="w-3.5 h-3.5" />
                              <span>Live View</span>
                            </a>

                            {/* Edit */}
                            <button
                              onClick={() => handleStartEditPage(p)}
                              className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-blue-50 text-blue-700 hover:bg-blue-600 hover:text-white text-xs font-bold transition-all cursor-pointer shadow-2xs"
                              title="Edit all sections and content"
                            >
                              <Edit className="w-3.5 h-3.5" />
                              <span>Edit Page</span>
                            </button>

                            {/* Delete (if not core) */}
                            {!isCore && (
                              <button
                                onClick={() => handleDeletePage(p.id || p.slug)}
                                className="p-2.5 rounded-xl bg-rose-50 text-rose-600 hover:bg-rose-600 hover:text-white transition-all cursor-pointer border border-rose-100"
                                title="Delete this custom page"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* ===== TAB 10: FAQ ITEMS ===== */}
              {activeTab === "faqs" && (
                <div className="space-y-6">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div>
                      <h2 className="text-xl font-extrabold text-[#0D2C4A]">Frequently Asked Questions ({faqs.length})</h2>
                      <p className="text-xs text-slate-500">Bilingual 4-option FAQs shown dynamically on main landing page</p>
                    </div>
                    <button
                      onClick={() => setShowAddFaq(true)}
                      className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-[#00A896] text-white text-xs font-extrabold hover:bg-[#008075] transition-all shadow-md cursor-pointer"
                    >
                      <Plus className="w-4 h-4" />
                      <span>+ Add New FAQ (4 Options)</span>
                    </button>
                  </div>

                  <div className="space-y-4">
                    {faqs.map((f, idx) => (
                      <div key={f.id} className="bg-slate-50/90 rounded-2xl p-5 border border-slate-200 hover:border-[#00A896]/40 transition-all shadow-xs space-y-3">
                        <div className="flex items-center justify-between pb-2 border-b border-slate-200/70">
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-xs font-bold text-slate-500">#{idx + 1}</span>
                            <span className="font-mono text-[11px] font-bold text-[#00A896] bg-[#00A896]/10 px-2 py-0.5 rounded-full">
                              {f.id}
                            </span>
                          </div>

                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleStartEditFaq(f)}
                              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-50 text-blue-700 hover:bg-blue-100 text-xs font-bold transition-colors cursor-pointer"
                              title="Edit all 4 options"
                            >
                              <Edit className="w-3.5 h-3.5" />
                              <span>Edit</span>
                            </button>

                            <button
                              onClick={() => handleDeleteFaq(f.id)}
                              className="p-1.5 rounded-xl bg-rose-50 text-rose-600 hover:bg-rose-100 transition-colors cursor-pointer"
                              title="Delete FAQ"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>

                        {/* 4 Options Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                          {/* Option 1: Bengali Question */}
                          <div className="space-y-1 bg-white p-3.5 rounded-xl border border-slate-200/70">
                            <span className="font-mono font-bold text-[10px] uppercase text-[#00A896] block">
                              1. প্রশ্ন (বাংলা) — Bangla Question
                            </span>
                            <p className="font-bold text-[#0D2C4A] text-sm leading-snug">
                              {f.qBn || "—"}
                            </p>
                          </div>

                          {/* Option 2: English Question */}
                          <div className="space-y-1 bg-white p-3.5 rounded-xl border border-slate-200/70">
                            <span className="font-mono font-bold text-[10px] uppercase text-blue-600 block">
                              2. Question (English)
                            </span>
                            <p className="font-bold text-slate-700 text-sm leading-snug">
                              {f.qEn || "—"}
                            </p>
                          </div>

                          {/* Option 3: Bengali Answer */}
                          <div className="space-y-1 bg-white p-3.5 rounded-xl border border-slate-200/70">
                            <span className="font-mono font-bold text-[10px] uppercase text-emerald-600 block">
                              3. উত্তর (বাংলা) — Bangla Answer
                            </span>
                            <p className="text-slate-600 leading-relaxed font-normal">
                              {f.aBn || "—"}
                            </p>
                          </div>

                          {/* Option 4: English Answer */}
                          <div className="space-y-1 bg-white p-3.5 rounded-xl border border-slate-200/70">
                            <span className="font-mono font-bold text-[10px] uppercase text-slate-500 block">
                              4. Answer (English)
                            </span>
                            <p className="text-slate-600 leading-relaxed font-normal">
                              {f.aEn || "—"}
                            </p>
                          </div>
                        </div>
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
                          placeholder="ototeachers.com — ১-অন-১ অনলাইন শিক্ষক | One-to-One Teacher for All"
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
                          placeholder="বাংলাদেশের ১-অন-১ অনলাইন শিক্ষক প্ল্যাটফর্ম। বুয়েট, ঢাবি ও মেডিকেলের যাচাইকৃত শিক্ষকদের সাথে সরাসরি লাইভ ক্লাস — ঘরে বসে।"
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
                          placeholder="ototeachers.com, ototeachers, online teacher Bangladesh, ১-অন-১ শিক্ষক, private tutor Bangladesh"
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
                          placeholder="হ্যালো ototeachers.com টিম, ১-অন-১ অনলাইন শিক্ষক সম্পর্কে জানতে চাই।"
                          className="w-full p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs font-sans font-semibold text-[#0D2C4A] focus:outline-none focus:border-[#25D366] shadow-sm"
                        />
                      </div>

                      <div>
                        <label className="admin-kicker text-slate-500 block mb-2">AUTOMATIC INITIAL MESSAGE (ENGLISH)</label>
                        <textarea
                          rows={2}
                          value={settings.whatsappMessageEn || ""}
                          onChange={(e) => setSettings({ ...settings, whatsappMessageEn: e.target.value })}
                          placeholder="Hello ototeachers.com team, I want to inquire about 1-on-1 online teachers."
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

            {/* MODAL 1: ADD TEACHER PROFILE */}
      {showAddTeacher && (
        <div className="fixed inset-0 z-50 bg-[#0D2C4A]/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-5 border border-[#0D2C4A]/10 shadow-2xl my-8">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="font-extrabold text-lg text-[#0D2C4A] flex items-center gap-2">
                  <UserCheck className="w-5 h-5 text-[#00A896]" />
                  <span>Add New Tutor Profile (নতুন শিক্ষক প্রোফাইল যোগ করুন)</span>
                </h3>
                <p className="text-xs text-slate-500">Provide full bilingual tutor details and academic information</p>
              </div>
              <button
                type="button"
                onClick={() => setShowAddTeacher(false)}
                className="p-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateTeacher} className="space-y-4 text-xs">
              {/* SECTION 1: NAMES */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block font-bold text-[#0D2C4A] mb-1">Teacher Full Name in Bengali (বাংলা নাম) *</label>
                  <input
                    required
                    type="text"
                    placeholder="যেমন: রাফাত তানভীর"
                    value={newTeacherNameBn}
                    onChange={(e) => setNewTeacherNameBn(e.target.value)}
                    className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50 font-semibold focus:outline-none focus:border-[#00A896]"
                  />
                </div>
                <div>
                  <label className="block font-bold text-[#0D2C4A] mb-1">Teacher Full Name in English *</label>
                  <input
                    required
                    type="text"
                    placeholder="e.g. Rafat Tanvir"
                    value={newTeacherNameEn}
                    onChange={(e) => setNewTeacherNameEn(e.target.value)}
                    className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50 font-semibold focus:outline-none focus:border-[#00A896]"
                  />
                </div>
              </div>

              {/* SECTION 2: UNIVERSITY & DEPARTMENT */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block font-bold text-[#0D2C4A] mb-1">University &amp; Dept in Bengali (বিশ্ববিদ্যালয়) *</label>
                  <input
                    required
                    type="text"
                    placeholder="যেমন: বুয়েট (সিএসই) / ঢাকা বিশ্ববিদ্যালয়"
                    value={newTeacherUniBn}
                    onChange={(e) => setNewTeacherUniBn(e.target.value)}
                    className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:border-[#00A896]"
                  />
                </div>
                <div>
                  <label className="block font-bold text-[#0D2C4A] mb-1">University &amp; Dept in English *</label>
                  <input
                    required
                    type="text"
                    placeholder="e.g. BUET (CSE) / Dhaka University"
                    value={newTeacherUniEn}
                    onChange={(e) => setNewTeacherUniEn(e.target.value)}
                    className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:border-[#00A896]"
                  />
                </div>
              </div>

              {/* SECTION 3: SUBJECT EXPERTISE */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block font-bold text-[#0D2C4A] mb-1">Teaching Subjects in Bengali (পাঠদানের বিষয়) *</label>
                  <input
                    required
                    type="text"
                    placeholder="যেমন: উচ্চতর গণিত ও পদার্থবিজ্ঞান"
                    value={newTeacherSubBn}
                    onChange={(e) => setNewTeacherSubBn(e.target.value)}
                    className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50 font-medium text-[#00A896] focus:outline-none focus:border-[#00A896]"
                  />
                </div>
                <div>
                  <label className="block font-bold text-[#0D2C4A] mb-1">Teaching Subjects in English *</label>
                  <input
                    required
                    type="text"
                    placeholder="e.g. Higher Math & Physics"
                    value={newTeacherSubEn}
                    onChange={(e) => setNewTeacherSubEn(e.target.value)}
                    className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50 font-medium text-[#00A896] focus:outline-none focus:border-[#00A896]"
                  />
                </div>
              </div>

              {/* SECTION 4: CONTACT & EXPERIENCE */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block font-bold text-[#0D2C4A] mb-1">Phone Number (ফোন নম্বর)</label>
                  <input
                    type="text"
                    placeholder="019xxxxxxxx"
                    value={newTeacherPhone}
                    onChange={(e) => setNewTeacherPhone(e.target.value)}
                    className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50 font-mono focus:outline-none focus:border-[#00A896]"
                  />
                </div>
                <div>
                  <label className="block font-bold text-[#0D2C4A] mb-1">Email Address (ইমেইল)</label>
                  <input
                    type="email"
                    placeholder="tutor@gmail.com"
                    value={newTeacherEmail}
                    onChange={(e) => setNewTeacherEmail(e.target.value)}
                    className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50 font-mono focus:outline-none focus:border-[#00A896]"
                  />
                </div>
              </div>

              {/* SECTION 5: EXPERIENCE & SHORT BIO */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block font-bold text-[#0D2C4A] mb-1">Experience / Role in Bengali (অভিজ্ঞতা)</label>
                  <input
                    type="text"
                    placeholder="যেমন: ৪+ বছরের শিক্ষকতার অভিজ্ঞতা"
                    value={newTeacherExpBn}
                    onChange={(e) => setNewTeacherExpBn(e.target.value)}
                    className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:border-[#00A896]"
                  />
                </div>
                <div>
                  <label className="block font-bold text-[#0D2C4A] mb-1">Experience / Role in English</label>
                  <input
                    type="text"
                    placeholder="e.g. 4+ Years Mentoring Experience"
                    value={newTeacherExpEn}
                    onChange={(e) => setNewTeacherExpEn(e.target.value)}
                    className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:border-[#00A896]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-[#0D2C4A] mb-1">Short Bio / Teaching Note (সংক্ষিপ্ত পরিচিতি)</label>
                <textarea
                  rows={2}
                  placeholder="১-অন-১ লাইভ ক্লাসে শিক্ষার্থীদের দুর্বলতা দূরীকরণে ও বোর্ড পরীক্ষায় এ+ অর্জনে অভিজ্ঞ মেন্টর..."
                  value={newTeacherBioBn}
                  onChange={(e) => setNewTeacherBioBn(e.target.value)}
                  className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:border-[#00A896]"
                />
              </div>

              {/* SECTION 6: AVATAR IMAGE UPLOAD */}
              <div className="p-3.5 bg-slate-50 rounded-2xl border border-dashed border-slate-300 space-y-2">
                <label className="block font-bold text-[#0D2C4A] text-xs">Profile Photo / Avatar (প্রোফাইল ছবি)</label>
                <div className="flex items-center gap-3">
                  <label className="flex items-center gap-2 cursor-pointer bg-white border border-slate-200 hover:border-[#00A896] rounded-xl px-4 py-2.5 transition-all shadow-xs">
                    <Upload className="w-4 h-4 text-[#00A896]" />
                    <span className="font-bold text-slate-700">Upload Photo</span>
                    <input type="file" accept="image/*" className="hidden" onChange={handleTeacherAvatarUpload} />
                  </label>
                  {newTeacherAvatar && (
                    <div className="relative">
                      <img src={newTeacherAvatar} alt="avatar preview" className="w-12 h-12 rounded-xl object-cover border-2 border-[#00A896]" />
                    </div>
                  )}
                  <input
                    type="text"
                    placeholder="Or paste image URL"
                    value={newTeacherAvatar}
                    onChange={(e) => setNewTeacherAvatar(e.target.value)}
                    className="flex-1 p-2.5 rounded-xl border border-slate-200 bg-white text-xs font-mono"
                  />
                </div>
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowAddTeacher(false)}
                  className="px-5 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold transition-all cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 rounded-xl bg-[#00A896] hover:bg-[#008075] text-white font-extrabold shadow-md shadow-[#00A896]/20 transition-all cursor-pointer"
                >
                  Save Tutor Profile
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 1B: EDIT TEACHER PROFILE */}
      {showEditTeacher && (
        <div className="fixed inset-0 z-50 bg-[#0D2C4A]/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-5 border border-[#0D2C4A]/10 shadow-2xl my-8">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="font-extrabold text-lg text-[#0D2C4A] flex items-center gap-2">
                  <Edit className="w-5 h-5 text-[#00A896]" />
                  <span>Edit Tutor Information (শিক্ষকের তথ্য আপডেট করুন)</span>
                </h3>
                <p className="text-xs text-slate-500 font-mono">Editing profile: {editTeacherId}</p>
              </div>
              <button
                type="button"
                onClick={() => setShowEditTeacher(false)}
                className="p-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleUpdateTeacher} className="space-y-4 text-xs">
              {/* SECTION 1: NAMES */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block font-bold text-[#0D2C4A] mb-1">Teacher Full Name in Bengali (বাংলা নাম) *</label>
                  <input
                    required
                    type="text"
                    value={editTeacherNameBn}
                    onChange={(e) => setEditTeacherNameBn(e.target.value)}
                    className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50 font-semibold focus:outline-none focus:border-[#00A896]"
                  />
                </div>
                <div>
                  <label className="block font-bold text-[#0D2C4A] mb-1">Teacher Full Name in English *</label>
                  <input
                    required
                    type="text"
                    value={editTeacherNameEn}
                    onChange={(e) => setEditTeacherNameEn(e.target.value)}
                    className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50 font-semibold focus:outline-none focus:border-[#00A896]"
                  />
                </div>
              </div>

              {/* SECTION 2: UNIVERSITY & DEPARTMENT */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block font-bold text-[#0D2C4A] mb-1">University &amp; Dept in Bengali (বিশ্ববিদ্যালয়) *</label>
                  <input
                    required
                    type="text"
                    value={editTeacherUniBn}
                    onChange={(e) => setEditTeacherUniBn(e.target.value)}
                    className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:border-[#00A896]"
                  />
                </div>
                <div>
                  <label className="block font-bold text-[#0D2C4A] mb-1">University &amp; Dept in English *</label>
                  <input
                    required
                    type="text"
                    value={editTeacherUniEn}
                    onChange={(e) => setEditTeacherUniEn(e.target.value)}
                    className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:border-[#00A896]"
                  />
                </div>
              </div>

              {/* SECTION 3: SUBJECT EXPERTISE */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block font-bold text-[#0D2C4A] mb-1">Teaching Subjects in Bengali (পাঠদানের বিষয়) *</label>
                  <input
                    required
                    type="text"
                    value={editTeacherSubBn}
                    onChange={(e) => setEditTeacherSubBn(e.target.value)}
                    className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50 font-medium text-[#00A896] focus:outline-none focus:border-[#00A896]"
                  />
                </div>
                <div>
                  <label className="block font-bold text-[#0D2C4A] mb-1">Teaching Subjects in English *</label>
                  <input
                    required
                    type="text"
                    value={editTeacherSubEn}
                    onChange={(e) => setEditTeacherSubEn(e.target.value)}
                    className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50 font-medium text-[#00A896] focus:outline-none focus:border-[#00A896]"
                  />
                </div>
              </div>

              {/* SECTION 4: CONTACT & EXPERIENCE */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block font-bold text-[#0D2C4A] mb-1">Phone Number (ফোন নম্বর)</label>
                  <input
                    type="text"
                    value={editTeacherPhone}
                    onChange={(e) => setEditTeacherPhone(e.target.value)}
                    className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50 font-mono focus:outline-none focus:border-[#00A896]"
                  />
                </div>
                <div>
                  <label className="block font-bold text-[#0D2C4A] mb-1">Email Address (ইমেইল)</label>
                  <input
                    type="email"
                    value={editTeacherEmail}
                    onChange={(e) => setEditTeacherEmail(e.target.value)}
                    className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50 font-mono focus:outline-none focus:border-[#00A896]"
                  />
                </div>
              </div>

              {/* SECTION 5: EXPERIENCE & SHORT BIO */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block font-bold text-[#0D2C4A] mb-1">Experience / Role in Bengali (অভিজ্ঞতা)</label>
                  <input
                    type="text"
                    value={editTeacherExpBn}
                    onChange={(e) => setEditTeacherExpBn(e.target.value)}
                    className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:border-[#00A896]"
                  />
                </div>
                <div>
                  <label className="block font-bold text-[#0D2C4A] mb-1">Experience / Role in English</label>
                  <input
                    type="text"
                    value={editTeacherExpEn}
                    onChange={(e) => setEditTeacherExpEn(e.target.value)}
                    className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:border-[#00A896]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-[#0D2C4A] mb-1">Short Bio / Teaching Note (সংক্ষিপ্ত পরিচিতি)</label>
                <textarea
                  rows={2}
                  value={editTeacherBioBn}
                  onChange={(e) => setEditTeacherBioBn(e.target.value)}
                  className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:border-[#00A896]"
                />
              </div>

              {/* SECTION 6: AVATAR IMAGE UPLOAD */}
              <div className="p-3.5 bg-slate-50 rounded-2xl border border-dashed border-slate-300 space-y-2">
                <label className="block font-bold text-[#0D2C4A] text-xs">Profile Photo / Avatar (প্রোফাইল ছবি)</label>
                <div className="flex items-center gap-3">
                  <label className="flex items-center gap-2 cursor-pointer bg-white border border-slate-200 hover:border-[#00A896] rounded-xl px-4 py-2.5 transition-all shadow-xs">
                    <Upload className="w-4 h-4 text-[#00A896]" />
                    <span className="font-bold text-slate-700">Upload New Photo</span>
                    <input type="file" accept="image/*" className="hidden" onChange={handleEditTeacherAvatarUpload} />
                  </label>
                  {editTeacherAvatar && (
                    <div className="relative">
                      <img src={editTeacherAvatar} alt="avatar preview" className="w-12 h-12 rounded-xl object-cover border-2 border-[#00A896]" />
                    </div>
                  )}
                  <input
                    type="text"
                    placeholder="Or paste image URL"
                    value={editTeacherAvatar}
                    onChange={(e) => setEditTeacherAvatar(e.target.value)}
                    className="flex-1 p-2.5 rounded-xl border border-slate-200 bg-white text-xs font-mono"
                  />
                </div>
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowEditTeacher(false)}
                  className="px-5 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold transition-all cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 rounded-xl bg-[#00A896] hover:bg-[#008075] text-white font-extrabold shadow-md shadow-[#00A896]/20 transition-all cursor-pointer"
                >
                  Update Tutor Profile
                </button>
              </div>
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

      {/* MODAL 4: WRITE NEW BLOG ARTICLE */}
      {showAddBlog && (
        <div className="fixed inset-0 z-50 bg-[#0D2C4A]/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-3xl w-full p-6 sm:p-8 space-y-6 border border-[#0D2C4A]/10 shadow-2xl animate-in zoom-in-95 duration-150 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b pb-3">
              <div>
                <h3 className="font-extrabold text-lg text-[#0D2C4A]">Write New Blog Article</h3>
                <p className="text-xs text-slate-500">Structured section-by-section matching the frontend blog page layout</p>
              </div>
              <button onClick={() => setShowAddBlog(false)} className="p-1 text-slate-400 hover:text-slate-600 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateBlog} className="space-y-6 text-xs">
              {/* TOP SECTION 1: HERO HEADER & BANNER (Matching Frontend Hero Header) */}
              <div className="space-y-4 bg-slate-50 p-4 sm:p-6 rounded-2xl border border-slate-200">
                <div className="flex items-center justify-between border-b border-slate-200/70 pb-2">
                  <h4 className="font-extrabold text-sm text-[#0D2C4A] flex items-center gap-2">
                    <span className="w-6 h-6 rounded-lg bg-[#00A896] text-white flex items-center justify-center text-xs font-mono font-bold">1</span>
                    <span>Top Hero Header & Metadata (Frontend Top Banner)</span>
                  </h4>
                  <span className="text-[11px] font-mono text-[#00A896] font-bold">Step 1: Top Hero</span>
                </div>

                {/* Category & Timestamps */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block font-bold text-[#0D2C4A] mb-1">Category Badge *</label>
                    <select
                      value={newBlogCategory}
                      onChange={(e) => setNewBlogCategory(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-slate-200 bg-white font-bold text-xs focus:outline-none focus:border-[#00A896]"
                    >
                      <option value="mentorship">1-on-1 Mentorship (১-অন-১ েরশিপ)</option>
                      <option value="board-prep">Board Prep (বোর্ড পরীক্ষা SSC/HSC)</option>
                      <option value="math-science">Math & Science (গণিত ও সায়েন্স)</option>
                      <option value="english">English Skills (ইংরেজি ও ‹কেন)</option>
                      <option value="parenting">Parenting (অভিভাবক গাইড)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block font-bold text-[#0D2C4A] mb-1">Published Date (বাংলা / EN)</label>
                    <div className="grid grid-cols-2 gap-2">
                      <input type="text" placeholder="০৬ †—, ২০২৬" value={newBlogDateBn} onChange={(e) => setNewBlogDateBn(e.target.value)} className="w-full p-2 rounded-xl border bg-white text-[11px]" />
                      <input type="text" placeholder="Aug 06, 2026" value={newBlogDateEn} onChange={(e) => setNewBlogDateEn(e.target.value)} className="w-full p-2 rounded-xl border bg-white text-[11px]" />
                    </div>
                  </div>
                  <div>
                    <label className="block font-bold text-[#0D2C4A] mb-1">Read Time (বাংলা / EN)</label>
                    <div className="grid grid-cols-2 gap-2">
                      <input type="text" placeholder="৫ মিনিট পড়া" value={newBlogReadTimeBn} onChange={(e) => setNewBlogReadTimeBn(e.target.value)} className="w-full p-2 rounded-xl border bg-white text-[11px]" />
                      <input type="text" placeholder="5 min read" value={newBlogReadTimeEn} onChange={(e) => setNewBlogReadTimeEn(e.target.value)} className="w-full p-2 rounded-xl border bg-white text-[11px]" />
                    </div>
                  </div>
                </div>

                {/* H1 Main Titles */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                  <div>
                    <label className="block font-bold text-[#0D2C4A] mb-1">H1 Main Title in Bengali (বাংলা শিরোনাম) *</label>
                    <input
                      required
                      type="text"
                      placeholder="যেমন: কেন ১-অন-১ ডেডিকেটেড েরশিপ ি ক·€র জন্য জরুরি?"
                      value={newBlogTitleBn}
                      onChange={(e) => setNewBlogTitleBn(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-slate-200 bg-white font-semibold text-xs focus:outline-none focus:border-[#00A896]"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-[#0D2C4A] mb-1">H1 Main Title in English (ইংরেজি শিরোনাম) *</label>
                    <input
                      required
                      type="text"
                      placeholder="e.g. Why 1-on-1 Dedicated Mentorship is More Effective"
                      value={newBlogTitleEn}
                      onChange={(e) => {
                        setNewBlogTitleEn(e.target.value);
                        if (!newBlogSlug) {
                          setNewBlogSlug(e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, "-"));
                        }
                      }}
                      className="w-full p-2.5 rounded-xl border border-slate-200 bg-white font-semibold text-xs focus:outline-none focus:border-[#00A896]"
                    />
                  </div>
                </div>

                {/* Subtitle / Short Excerpt */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-[#0D2C4A] mb-1">Hero Subtitle / Short Excerpt (বাংলা) *</label>
                    <textarea required rows={2} placeholder="ক ে সংক্ষিপ্ত বিবরণ..." value={newBlogExcerptBn} onChange={(e) => setNewBlogExcerptBn(e.target.value)} className="w-full p-2.5 rounded-xl border bg-white text-xs" />
                  </div>
                  <div>
                    <label className="block font-bold text-[#0D2C4A] mb-1">Hero Subtitle / Short Excerpt (English) *</label>
                    <textarea required rows={2} placeholder="Short executive summary in English..." value={newBlogExcerptEn} onChange={(e) => setNewBlogExcerptEn(e.target.value)} className="w-full p-2.5 rounded-xl border bg-white text-xs" />
                  </div>
                </div>

                {/* Author Card & Profile Photo Upload */}
                <div className="p-3.5 bg-white rounded-xl border border-slate-200 space-y-3">
                  <span className="block font-bold text-[#0D2C4A] text-xs">Author Profile Information</span>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block font-bold text-slate-600 text-[11px] mb-1">Author Name (BN/EN)</label>
                      <input type="text" placeholder="আরিফুর রহমান" value={newBlogAuthorNameBn} onChange={(e) => setNewBlogAuthorNameBn(e.target.value)} className="w-full p-2 rounded-xl border mb-1.5 text-xs" />
                      <input type="text" placeholder="Arifur Rahman" value={newBlogAuthorNameEn} onChange={(e) => setNewBlogAuthorNameEn(e.target.value)} className="w-full p-2 rounded-xl border text-xs" />
                    </div>
                    <div>
                      <label className="block font-bold text-slate-600 text-[11px] mb-1">Role & University (BN)</label>
                      <input type="text" placeholder="হেড অব েরশিপ" value={newBlogAuthorRoleBn} onChange={(e) => setNewBlogAuthorRoleBn(e.target.value)} className="w-full p-2 rounded-xl border mb-1.5 text-xs" />
                      <input type="text" placeholder="ে (‡)" value={newBlogAuthorUniBn} onChange={(e) => setNewBlogAuthorUniBn(e.target.value)} className="w-full p-2 rounded-xl border text-xs" />
                    </div>
                    <div>
                      <label className="block font-bold text-slate-600 text-[11px] mb-1">Author Photo (Upload Button)</label>
                      <div className="flex items-center gap-3 pt-1">
                        <div className="w-10 h-10 rounded-full overflow-hidden bg-slate-100 border-2 border-[#00A896] flex-shrink-0">
                          <img src={newBlogAuthorAvatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"} alt="Author" className="w-full h-full object-cover" />
                        </div>
                        <label className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-[#00A896] hover:text-white text-slate-700 text-[11px] font-bold cursor-pointer transition-colors shadow-xs flex items-center gap-1.5">
                          <Upload className="w-3.5 h-3.5" />
                          <span>Upload Photo</span>
                          <input type="file" accept="image/*" onChange={handleBlogAuthorAvatarUpload} className="hidden" />
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Slug & Featured Article Toggle */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                  <div>
                    <label className="block font-bold text-[#0D2C4A] mb-1">URL Identifier / Slug (e.g. 1-on-1-mentorship-vs-coaching)</label>
                    <input
                      type="text"
                      placeholder="custom-url-slug"
                      value={newBlogSlug}
                      onChange={(e) => setNewBlogSlug(e.target.value)}
                      className="w-full p-2 rounded-xl border border-slate-200 bg-white font-mono text-xs"
                    />
                  </div>
                  <div className="flex items-center gap-2 pt-5">
                    <label className="flex items-center gap-2 cursor-pointer font-bold text-[#0D2C4A] bg-white px-3.5 py-2 rounded-xl border border-slate-200 w-full">
                      <input
                        type="checkbox"
                        checked={newBlogFeatured}
                        onChange={(e) => setNewBlogFeatured(e.target.checked)}
                        className="w-4 h-4 rounded text-[#00A896] focus:ring-[#00A896]"
                      />
                      <span>⭐ Feature as Top Hero Article on Blog Page</span>
                    </label>
                  </div>
                </div>
              </div>

              {/* TOP SECTION 2: MAIN HERO COVER IMAGE (Uploadable Button System) */}
              <div className="space-y-4 bg-slate-50 p-4 sm:p-6 rounded-2xl border border-slate-200">
                <div className="flex items-center justify-between border-b border-slate-200/70 pb-2">
                  <h4 className="font-extrabold text-sm text-[#0D2C4A] flex items-center gap-2">
                    <span className="w-6 h-6 rounded-lg bg-[#00A896] text-white flex items-center justify-center text-xs font-mono font-bold">2</span>
                    <span>Hero Cover Image (Upload Button System)</span>
                  </h4>
                  <span className="text-[11px] font-mono text-slate-500">Position: Displayed directly below Header</span>
                </div>

                {/* Upload Button Box */}
                <div className="p-5 rounded-2xl bg-white border border-dashed border-slate-300 flex flex-col items-center justify-center gap-3 shadow-xs">
                  {newBlogImage ? (
                    <div className="w-full flex flex-col sm:flex-row items-center gap-4">
                      <div className="w-full sm:w-52 h-32 rounded-xl overflow-hidden bg-slate-100 border border-slate-200 relative flex-shrink-0 shadow-sm">
                        <img src={newBlogImage} alt="Cover Preview" className="w-full h-full object-cover" />
                        <span className="absolute bottom-1.5 right-1.5 px-2 py-0.5 rounded-md bg-emerald-600 text-white font-mono text-[9px] font-bold shadow-xs">
                          ✓ Image Attached
                        </span>
                      </div>
                      <div className="space-y-2 flex-1 w-full text-center sm:text-left">
                        <p className="text-xs font-extrabold text-emerald-700">✓ Cover Banner Image Selected</p>
                        <p className="text-[11px] text-slate-500 font-normal">This image will appear at the top of the article body.</p>
                        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 pt-1">
                          <label className="px-4 py-2 rounded-xl bg-[#00A896] text-white text-xs font-bold hover:bg-[#008075] cursor-pointer shadow-sm flex items-center gap-1.5 transition-colors">
                            <Upload className="w-3.5 h-3.5" />
                            <span>Upload New File</span>
                            <input type="file" accept="image/*" onChange={handleBlogImageUpload} className="hidden" />
                          </label>
                          <button
                            type="button"
                            onClick={() => setNewBlogImage("")}
                            className="px-3 py-2 rounded-xl bg-rose-50 text-rose-600 text-xs font-bold hover:bg-rose-100 transition-colors"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center gap-2 py-5 text-center">
                      <div className="w-12 h-12 rounded-2xl bg-[#E6F4F3] text-[#00A896] flex items-center justify-center">
                        <Upload className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-[#0D2C4A]">Upload article cover banner image</p>
                        <p className="text-[11px] text-slate-400 font-normal">Select image file (.png, .jpg, .webp) from your device</p>
                      </div>
                      <label className="mt-2 px-5 py-2.5 rounded-xl bg-[#00A896] text-white text-xs font-extrabold hover:bg-[#008075] cursor-pointer shadow-md flex items-center gap-2 transition-all">
                        <Upload className="w-4 h-4" />
                        <span>Choose Image File to Upload</span>
                        <input type="file" accept="image/*" onChange={handleBlogImageUpload} className="hidden" />
                      </label>
                    </div>
                  )}

                  {/* Preset Topic Images */}
                  <div className="w-full pt-3 border-t border-slate-100 flex flex-wrap items-center gap-2">
                    <span className="text-[11px] font-bold text-slate-400 font-mono">Or quick-pick preset topic cover:</span>
                    {[
                      { name: "1-on-1 Mentorship", url: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1200&q=80" },
                      { name: "Board Prep", url: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=1200&q=80" },
                      { name: "Math & Science", url: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=1200&q=80" },
                      { name: "English Skills", url: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=1200&q=80" },
                      { name: "Parenting", url: "https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?auto=format&fit=crop&w=1200&q=80" },
                    ].map((preset) => (
                      <button
                        key={preset.name}
                        type="button"
                        onClick={() => setNewBlogImage(preset.url)}
                        className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-[10px] font-bold transition-colors cursor-pointer"
                      >
                        {preset.name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* TOP SECTION 3: EXECUTIVE SUMMARY BOX ("মূল বক্তব্য / ক ে") */}
              <div className="space-y-4 bg-slate-50 p-4 sm:p-6 rounded-2xl border border-slate-200">
                <div className="flex items-center justify-between border-b border-slate-200/70 pb-2">
                  <h4 className="font-extrabold text-sm text-[#0D2C4A] flex items-center gap-2">
                    <span className="w-6 h-6 rounded-lg bg-[#00A896] text-white flex items-center justify-center text-xs font-mono font-bold">3</span>
                    <span>Executive Summary Box ("মূল বক্তব্য / ক ে")</span>
                  </h4>
                  <span className="text-[11px] font-mono text-slate-500">Position: Highlighted gradient intro box</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-[#0D2C4A] mb-1">Executive Summary / Intro in Bengali (বাংলা মূল বক্তব্য)</label>
                    <textarea rows={3} placeholder="বাংলাদেশের šলিত ক· বড় বড় কে দুর্বলতা দূর হয় না। ‡ ক্য দূর করতেই ১-অন-১ েরশিপ..." value={newBlogIntroBn} onChange={(e) => setNewBlogIntroBn(e.target.value)} className="w-full p-2.5 rounded-xl border bg-white text-xs leading-relaxed" />
                  </div>
                  <div>
                    <label className="block font-bold text-[#0D2C4A] mb-1">Executive Summary / Intro in English</label>
                    <textarea rows={3} placeholder="In Bangladesh's conventional academic landscape, 1-on-1 dedicated tutoring is designed to..." value={newBlogIntroEn} onChange={(e) => setNewBlogIntroEn(e.target.value)} className="w-full p-2.5 rounded-xl border bg-white text-xs leading-relaxed" />
                  </div>
                </div>
              </div>

              {/* MULTI-SECTION MANAGER */}
              <div className="space-y-5">
                <div className="flex items-center justify-between border-b border-slate-200/70 pb-3">
                  <div>
                    <h4 className="font-extrabold text-sm text-[#0D2C4A] flex items-center gap-2">
                      <span className="w-6 h-6 rounded-lg bg-[#00A896] text-white flex items-center justify-center text-xs font-mono font-bold">4</span>
                      <span>Content Sections (ব্লগ কন্টেন্ট সেকশন)</span>
                    </h4>
                    <p className="text-[11px] text-slate-500 mt-0.5">Each section: heading, subheading, image+caption, paragraphs, numbered points, and callout</p>
                  </div>
                  <button type="button" onClick={addNewSection} className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#00A896] hover:bg-[#008075] text-white text-xs font-bold transition-all shadow-xs cursor-pointer">
                    <Plus className="w-4 h-4" /><span>+ Add Section</span>
                  </button>
                </div>
                {newBlogSections.map((sec, sIdx) => (
                  <div key={sIdx} className="bg-white rounded-2xl border-2 border-slate-200 shadow-xs overflow-hidden">
                    <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-[#0D2C4A]/5 to-transparent border-b border-slate-100">
                      <span className="font-extrabold text-sm text-[#0D2C4A] flex items-center gap-2">
                        <span className="w-7 h-7 rounded-full bg-[#00A896] text-white font-mono font-bold text-xs flex items-center justify-center">{sIdx + 1}</span>
                        Section #{sIdx + 1}
                      </span>
                      {newBlogSections.length > 1 && (
                        <button type="button" onClick={() => removeNewSection(sIdx)} className="text-rose-500 hover:text-rose-700 hover:bg-rose-50 px-2.5 py-1 rounded-lg text-[11px] font-bold flex items-center gap-1 transition-colors cursor-pointer">
                          <Trash2 className="w-3.5 h-3.5" /> Remove Section
                        </button>
                      )}
                    </div>
                    <div className="p-4 space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block font-bold text-[#0D2C4A] text-[11px] mb-1">Section Heading (বাংলা) — green bar on frontend</label>
                          <input type="text" placeholder="যেমন: গণিতে দুর্বলতার মূল কারণগুলো কী কী?" value={sec.headingBn} onChange={(e) => updateNewSection(sIdx, "headingBn", e.target.value)} className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 font-semibold text-xs focus:outline-none focus:border-[#00A896]" />
                        </div>
                        <div>
                          <label className="block font-bold text-[#0D2C4A] text-[11px] mb-1">Section Heading (English)</label>
                          <input type="text" placeholder="e.g. Root Causes of Weakness in Math?" value={sec.headingEn} onChange={(e) => updateNewSection(sIdx, "headingEn", e.target.value)} className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 font-semibold text-xs focus:outline-none focus:border-[#00A896]" />
                        </div>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block font-bold text-[#0D2C4A] text-[11px] mb-1">Subheading (বাংলা) — teal subheading on frontend</label>
                          <input type="text" placeholder="যেমন: বেসিক গ্যাপ কীভাবে শিক্ষার্থীকে পিছিয়ে দেয়?" value={sec.subheadingBn} onChange={(e) => updateNewSection(sIdx, "subheadingBn", e.target.value)} className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs text-[#00A896] font-medium focus:outline-none focus:border-[#00A896]" />
                        </div>
                        <div>
                          <label className="block font-bold text-[#0D2C4A] text-[11px] mb-1">Subheading (English)</label>
                          <input type="text" placeholder="e.g. How Does a Basic Gap Hold a Student Back?" value={sec.subheadingEn} onChange={(e) => updateNewSection(sIdx, "subheadingEn", e.target.value)} className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs text-[#00A896] font-medium focus:outline-none focus:border-[#00A896]" />
                        </div>
                      </div>
                      <div className="space-y-2 p-3 bg-slate-50 rounded-xl border border-dashed border-slate-300">
                        <label className="block font-bold text-[#0D2C4A] text-[11px]">Section Image — shown below subheading on frontend</label>
                        <div className="flex items-center gap-3">
                          <label className="flex items-center gap-2 cursor-pointer bg-white border border-slate-200 hover:border-[#00A896] rounded-xl px-3 py-2 transition-colors">
                            <span className="text-[#00A896]">📷</span>
                            <span className="text-xs font-bold text-slate-600">Upload Image</span>
                            <input type="file" accept="image/*" className="hidden" onChange={(e) => handleSectionImageUpload(sIdx, e, setNewBlogSections)} />
                          </label>
                          {sec.image && (
                            <div className="relative">
                              <img src={sec.image} alt="preview" className="h-12 w-20 object-cover rounded-lg border" />
                              <button type="button" onClick={() => updateNewSection(sIdx, "image", "")} className="absolute -top-1 -right-1 w-4 h-4 bg-rose-500 text-white rounded-full text-[10px] flex items-center justify-center cursor-pointer">x</button>
                            </div>
                          )}
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
                          <div>
                            <label className="block font-bold text-slate-600 text-[11px] mb-1">Image Caption (বাংলা)</label>
                            <input type="text" placeholder="যেমন: বুয়েট মেন্টরের কাছে হাতে-কলমে অঙ্ক সমাধান" value={sec.imageCaptionBn} onChange={(e) => updateNewSection(sIdx, "imageCaptionBn", e.target.value)} className="w-full p-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#00A896]" />
                          </div>
                          <div>
                            <label className="block font-bold text-slate-600 text-[11px] mb-1">Image Caption (English)</label>
                            <input type="text" placeholder="e.g. Solving math step-by-step with a BUET mentor" value={sec.imageCaptionEn} onChange={(e) => updateNewSection(sIdx, "imageCaptionEn", e.target.value)} className="w-full p-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#00A896]" />
                          </div>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block font-bold text-[#0D2C4A] text-[11px] mb-1">Paragraphs (বাংলা) — double enter = new paragraph</label>
                          <textarea rows={4} placeholder="সেকশনের বিস্তারিত বিষয়বস্তু লিখুন..." value={sec.paragraphsBn} onChange={(e) => updateNewSection(sIdx, "paragraphsBn", e.target.value)} className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs leading-relaxed focus:outline-none focus:border-[#00A896]" />
                        </div>
                        <div>
                          <label className="block font-bold text-[#0D2C4A] text-[11px] mb-1">Paragraphs (English)</label>
                          <textarea rows={4} placeholder="Write detailed content for this section..." value={sec.paragraphsEn} onChange={(e) => updateNewSection(sIdx, "paragraphsEn", e.target.value)} className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs leading-relaxed focus:outline-none focus:border-[#00A896]" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="font-extrabold text-[11px] text-[#0D2C4A] flex items-center gap-1.5">
                            Numbered Point Cards <span className="px-2 py-0.5 rounded-full bg-[#E6F4F3] text-[#00A896] font-mono text-[10px]">{sec.points.length} points</span>
                          </span>
                          <button type="button" onClick={() => addPointToNewSection(sIdx)} className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#00A896]/10 hover:bg-[#00A896]/20 text-[#00A896] text-[11px] font-bold transition-colors cursor-pointer">
                            <Plus className="w-3.5 h-3.5" /> Add Point
                          </button>
                        </div>
                        {sec.points.map((pt, pIdx) => (
                          <div key={pIdx} className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="w-6 h-6 rounded-full bg-[#00A896] text-white font-mono font-bold text-[11px] flex items-center justify-center">{pIdx + 1}</span>
                              <button type="button" onClick={() => removePointFromNewSection(sIdx, pIdx)} className="text-rose-500 hover:text-rose-700 text-[11px] font-bold flex items-center gap-1 cursor-pointer"><Trash2 className="w-3 h-3" /> Remove</button>
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                              <input type="text" placeholder="Title (বাংলা)" value={pt.titleBn} onChange={(e) => updatePointInNewSection(sIdx, pIdx, "titleBn", e.target.value)} className="w-full p-2 rounded-lg border text-xs font-bold text-[#0D2C4A] focus:outline-none focus:border-[#00A896]" />
                              <input type="text" placeholder="Title (English)" value={pt.titleEn} onChange={(e) => updatePointInNewSection(sIdx, pIdx, "titleEn", e.target.value)} className="w-full p-2 rounded-lg border text-xs font-bold text-[#0D2C4A] focus:outline-none focus:border-[#00A896]" />
                              <textarea rows={2} placeholder="বিবরণ (বাংলা)" value={pt.descBn} onChange={(e) => updatePointInNewSection(sIdx, pIdx, "descBn", e.target.value)} className="w-full p-2 rounded-lg border text-xs focus:outline-none focus:border-[#00A896]" />
                              <textarea rows={2} placeholder="Description (English)" value={pt.descEn} onChange={(e) => updatePointInNewSection(sIdx, pIdx, "descEn", e.target.value)} className="w-full p-2 rounded-lg border text-xs focus:outline-none focus:border-[#00A896]" />
                            </div>
                          </div>
                        ))}
                        <button type="button" onClick={() => addPointToNewSection(sIdx)} className="w-full py-2 rounded-xl border-2 border-dashed border-[#00A896]/40 hover:border-[#00A896] bg-[#00A896]/5 text-[#00A896] text-xs font-bold flex items-center justify-center gap-2 cursor-pointer transition-all">
                          <Plus className="w-4 h-4" /> + Add Point Card
                        </button>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block font-bold text-[#0D2C4A] text-[11px] mb-1">Expert Callout Quote (বিশেষ পরামর্শ — বাংলা)</label>
                          <input type="text" placeholder="যেমন: মুখস্থ নয়, কনসেপ্ট ক্লিয়ার করাই সাফল্যের ভিত্তি।" value={sec.calloutBn} onChange={(e) => updateNewSection(sIdx, "calloutBn", e.target.value)} className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs font-semibold focus:outline-none focus:border-[#00A896]" />
                        </div>
                        <div>
                          <label className="block font-bold text-[#0D2C4A] text-[11px] mb-1">Expert Callout Quote (English)</label>
                          <input type="text" placeholder="e.g. Conceptual clarity always beats shallow memorization." value={sec.calloutEn} onChange={(e) => updateNewSection(sIdx, "calloutEn", e.target.value)} className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs font-semibold focus:outline-none focus:border-[#00A896]" />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                <button type="button" onClick={addNewSection} className="w-full py-3 rounded-xl border-2 border-dashed border-[#00A896]/40 hover:border-[#00A896] bg-[#00A896]/5 hover:bg-[#00A896]/10 text-[#00A896] text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer">
                  <Plus className="w-4 h-4" /><span>+ Add Another Content Section</span>
                </button>
              </div>

              {/* TOP SECTION 6: KEY TAKEAWAYS CHECKLIST BOX */}
              <div className="space-y-4 bg-slate-50 p-4 sm:p-6 rounded-2xl border border-slate-200">
                <div className="flex items-center justify-between border-b border-slate-200/70 pb-2">
                  <h4 className="font-extrabold text-sm text-[#0D2C4A] flex items-center gap-2">
                    <span className="w-6 h-6 rounded-lg bg-[#00A896] text-white flex items-center justify-center text-xs font-mono font-bold">6</span>
                    <span>Key Takeaways Checklist ("নিের মূল শিক্ষা")</span>
                  </h4>
                  <span className="text-[11px] font-mono text-slate-500">Position: Bottom summary checklist</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-[#0D2C4A] mb-1">Key Takeaways in Bengali (১টি ে প্রতি লাইনে)</label>
                    <textarea rows={3} placeholder="১. বড় কের চেয়ে ১-অন-১ ে‚ে দুর্বলতা দ্রুত দূর হয়&#10;২. নিয়মিত কটিস ও প্রশ্ন করার €নতা আত্মবিশ্বাস বাড়ায়" value={newBlogTakeawaysBn} onChange={(e) => setNewBlogTakeawaysBn(e.target.value)} className="w-full p-2.5 rounded-xl border bg-white text-xs" />
                  </div>
                  <div>
                    <label className="block font-bold text-[#0D2C4A] mb-1">Key Takeaways in English (1 point per line)</label>
                    <textarea rows={3} placeholder="1. Personalized 1-on-1 mentorship eliminates learning gaps faster&#10;2. Freedom to ask questions fosters deep confidence" value={newBlogTakeawaysEn} onChange={(e) => setNewBlogTakeawaysEn(e.target.value)} className="w-full p-2.5 rounded-xl border bg-white text-xs" />
                  </div>
                </div>
              </div>

              {/* TOP SECTION 7: TAGS & TOPICS */}
              <div className="space-y-4 bg-slate-50 p-4 sm:p-6 rounded-2xl border border-slate-200">
                <div className="flex items-center justify-between border-b border-slate-200/70 pb-2">
                  <h4 className="font-extrabold text-sm text-[#0D2C4A] flex items-center gap-2">
                    <span className="w-6 h-6 rounded-lg bg-[#00A896] text-white flex items-center justify-center text-xs font-mono font-bold">7</span>
                    <span>Article Tags & Topic Keywords</span>
                  </h4>
                  <span className="text-[11px] font-mono text-slate-500">Position: Article footer tags</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-[#0D2C4A] mb-1">Tags in Bengali (কমা দিয়ে আলাদা করুন)</label>
                    <input type="text" placeholder="১-অন-১ মেন্টরিং, শিক্ষা পদ্ধতি, যাচাইকৃত শিক্ষক" value={newBlogTagsBn} onChange={(e) => setNewBlogTagsBn(e.target.value)} className="w-full p-2.5 rounded-xl border bg-white text-xs" />
                  </div>
                  <div>
                    <label className="block font-bold text-[#0D2C4A] mb-1">Tags in English (Comma separated)</label>
                    <input type="text" placeholder="1-on-1 Mentoring, Learning Methods, Private Tutor" value={newBlogTagsEn} onChange={(e) => setNewBlogTagsEn(e.target.value)} className="w-full p-2.5 rounded-xl border bg-white text-xs" />
                  </div>
                </div>
              </div>

              {/* ACTION BUTTONS */}
              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setShowAddBlog(false)}
                  className="px-6 py-3 rounded-xl border border-slate-200 text-slate-600 font-bold hover:bg-slate-100 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-8 py-3 rounded-xl bg-[#00A896] hover:bg-[#008075] text-white font-extrabold shadow-md transition-all cursor-pointer"
                >
                  ✓ Publish Article Now
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 4B: EDIT BLOG ARTICLE */}
      {showEditBlog && (
        <div className="fixed inset-0 z-50 bg-[#0D2C4A]/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-3xl w-full p-6 sm:p-8 space-y-6 border border-[#0D2C4A]/10 shadow-2xl animate-in zoom-in-95 duration-150 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b pb-3">
              <div>
                <h3 className="font-extrabold text-lg text-[#0D2C4A]">Edit Blog Article</h3>
                <p className="text-xs text-slate-500">Structured section-by-section matching the frontend blog page layout</p>
              </div>
              <button onClick={() => setShowEditBlog(false)} className="p-1 text-slate-400 hover:text-slate-600 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleUpdateBlog} className="space-y-6 text-xs">
              {/* TOP SECTION 1: HERO HEADER & BANNER */}
              <div className="space-y-4 bg-slate-50 p-4 sm:p-6 rounded-2xl border border-slate-200">
                <div className="flex items-center justify-between border-b border-slate-200/70 pb-2">
                  <h4 className="font-extrabold text-sm text-[#0D2C4A] flex items-center gap-2">
                    <span className="w-6 h-6 rounded-lg bg-[#00A896] text-white flex items-center justify-center text-xs font-mono font-bold">1</span>
                    <span>Top Hero Header & Metadata (Frontend Top Banner)</span>
                  </h4>
                  <span className="text-[11px] font-mono text-[#00A896] font-bold">Step 1: Top Hero</span>
                </div>

                {/* Category & Timestamps */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block font-bold text-[#0D2C4A] mb-1">Category Badge *</label>
                    <select
                      value={editBlogCategory}
                      onChange={(e) => setEditBlogCategory(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-slate-200 bg-white font-bold text-xs focus:outline-none focus:border-[#00A896]"
                    >
                      <option value="mentorship">1-on-1 Mentorship (১-অন-১ েরশিপ)</option>
                      <option value="board-prep">Board Prep (বোর্ড পরীক্ষা SSC/HSC)</option>
                      <option value="math-science">Math & Science (গণিত ও সায়েন্স)</option>
                      <option value="english">English Skills (ইংরেজি ও ‹কেন)</option>
                      <option value="parenting">Parenting (অভিভাবক গাইড)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block font-bold text-[#0D2C4A] mb-1">Published Date (বাংলা / EN)</label>
                    <div className="grid grid-cols-2 gap-2">
                      <input type="text" value={editBlogDateBn} onChange={(e) => setEditBlogDateBn(e.target.value)} className="w-full p-2 rounded-xl border bg-white text-[11px]" />
                      <input type="text" value={editBlogDateEn} onChange={(e) => setEditBlogDateEn(e.target.value)} className="w-full p-2 rounded-xl border bg-white text-[11px]" />
                    </div>
                  </div>
                  <div>
                    <label className="block font-bold text-[#0D2C4A] mb-1">Read Time (বাংলা / EN)</label>
                    <div className="grid grid-cols-2 gap-2">
                      <input type="text" value={editBlogReadTimeBn} onChange={(e) => setEditBlogReadTimeBn(e.target.value)} className="w-full p-2 rounded-xl border bg-white text-[11px]" />
                      <input type="text" value={editBlogReadTimeEn} onChange={(e) => setEditBlogReadTimeEn(e.target.value)} className="w-full p-2 rounded-xl border bg-white text-[11px]" />
                    </div>
                  </div>
                </div>

                {/* H1 Main Titles */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                  <div>
                    <label className="block font-bold text-[#0D2C4A] mb-1">H1 Main Title in Bengali (বাংলা শিরোনাম) *</label>
                    <input
                      required
                      type="text"
                      value={editBlogTitleBn}
                      onChange={(e) => setEditBlogTitleBn(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-slate-200 bg-white font-semibold text-xs focus:outline-none focus:border-[#00A896]"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-[#0D2C4A] mb-1">H1 Main Title in English (ইংরেজি শিরোনাম) *</label>
                    <input
                      required
                      type="text"
                      value={editBlogTitleEn}
                      onChange={(e) => setEditBlogTitleEn(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-slate-200 bg-white font-semibold text-xs focus:outline-none focus:border-[#00A896]"
                    />
                  </div>
                </div>

                {/* Subtitle / Short Excerpt */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-[#0D2C4A] mb-1">Hero Subtitle / Short Excerpt (বাংলা) *</label>
                    <textarea required rows={2} value={editBlogExcerptBn} onChange={(e) => setEditBlogExcerptBn(e.target.value)} className="w-full p-2.5 rounded-xl border bg-white text-xs" />
                  </div>
                  <div>
                    <label className="block font-bold text-[#0D2C4A] mb-1">Hero Subtitle / Short Excerpt (English) *</label>
                    <textarea required rows={2} value={editBlogExcerptEn} onChange={(e) => setEditBlogExcerptEn(e.target.value)} className="w-full p-2.5 rounded-xl border bg-white text-xs" />
                  </div>
                </div>

                {/* Author Card & Profile Photo Upload */}
                <div className="p-3.5 bg-white rounded-xl border border-slate-200 space-y-3">
                  <span className="block font-bold text-[#0D2C4A] text-xs">Author Profile Information</span>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block font-bold text-slate-600 text-[11px] mb-1">Author Name (BN/EN)</label>
                      <input type="text" value={editBlogAuthorNameBn} onChange={(e) => setEditBlogAuthorNameBn(e.target.value)} className="w-full p-2 rounded-xl border mb-1.5 text-xs" />
                      <input type="text" value={editBlogAuthorNameEn} onChange={(e) => setEditBlogAuthorNameEn(e.target.value)} className="w-full p-2 rounded-xl border text-xs" />
                    </div>
                    <div>
                      <label className="block font-bold text-slate-600 text-[11px] mb-1">Role & University (BN)</label>
                      <input type="text" value={editBlogAuthorRoleBn} onChange={(e) => setEditBlogAuthorRoleBn(e.target.value)} className="w-full p-2 rounded-xl border mb-1.5 text-xs" />
                      <input type="text" value={editBlogAuthorUniBn} onChange={(e) => setEditBlogAuthorUniBn(e.target.value)} className="w-full p-2 rounded-xl border text-xs" />
                    </div>
                    <div>
                      <label className="block font-bold text-slate-600 text-[11px] mb-1">Author Photo (Upload Button)</label>
                      <div className="flex items-center gap-3 pt-1">
                        <div className="w-10 h-10 rounded-full overflow-hidden bg-slate-100 border-2 border-[#00A896] flex-shrink-0">
                          <img src={editBlogAuthorAvatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"} alt="Author" className="w-full h-full object-cover" />
                        </div>
                        <label className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-[#00A896] hover:text-white text-slate-700 text-[11px] font-bold cursor-pointer transition-colors shadow-xs flex items-center gap-1.5">
                          <Upload className="w-3.5 h-3.5" />
                          <span>Upload Photo</span>
                          <input type="file" accept="image/*" onChange={handleEditBlogAuthorAvatarUpload} className="hidden" />
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Slug & Featured Article Toggle */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                  <div>
                    <label className="block font-bold text-[#0D2C4A] mb-1">URL Identifier / Slug</label>
                    <input
                      type="text"
                      value={editBlogSlug}
                      onChange={(e) => setEditBlogSlug(e.target.value)}
                      className="w-full p-2 rounded-xl border border-slate-200 bg-white font-mono text-xs"
                    />
                  </div>
                  <div className="flex items-center gap-2 pt-5">
                    <label className="flex items-center gap-2 cursor-pointer font-bold text-[#0D2C4A] bg-white px-3.5 py-2 rounded-xl border border-slate-200 w-full">
                      <input
                        type="checkbox"
                        checked={editBlogFeatured}
                        onChange={(e) => setEditBlogFeatured(e.target.checked)}
                        className="w-4 h-4 rounded text-[#00A896] focus:ring-[#00A896]"
                      />
                      <span>⭐ Feature as Top Hero Article on Blog Page</span>
                    </label>
                  </div>
                </div>
              </div>

              {/* TOP SECTION 2: MAIN HERO COVER IMAGE (Uploadable Button System) */}
              <div className="space-y-4 bg-slate-50 p-4 sm:p-6 rounded-2xl border border-slate-200">
                <div className="flex items-center justify-between border-b border-slate-200/70 pb-2">
                  <h4 className="font-extrabold text-sm text-[#0D2C4A] flex items-center gap-2">
                    <span className="w-6 h-6 rounded-lg bg-[#00A896] text-white flex items-center justify-center text-xs font-mono font-bold">2</span>
                    <span>Hero Cover Image (Upload Button System)</span>
                  </h4>
                  <span className="text-[11px] font-mono text-slate-500">Position: Displayed directly below Header</span>
                </div>

                {/* Upload Button Box */}
                <div className="p-5 rounded-2xl bg-white border border-dashed border-slate-300 flex flex-col items-center justify-center gap-3 shadow-xs">
                  {editBlogImage ? (
                    <div className="w-full flex flex-col sm:flex-row items-center gap-4">
                      <div className="w-full sm:w-52 h-32 rounded-xl overflow-hidden bg-slate-100 border border-slate-200 relative flex-shrink-0 shadow-sm">
                        <img src={editBlogImage} alt="Cover Preview" className="w-full h-full object-cover" />
                        <span className="absolute bottom-1.5 right-1.5 px-2 py-0.5 rounded-md bg-emerald-600 text-white font-mono text-[9px] font-bold shadow-xs">
                          ✓ Image Attached
                        </span>
                      </div>
                      <div className="space-y-2 flex-1 w-full text-center sm:text-left">
                        <p className="text-xs font-extrabold text-emerald-700">✓ Cover Banner Image Attached</p>
                        <p className="text-[11px] text-slate-500 font-normal">This image is rendered directly below the Hero header.</p>
                        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 pt-1">
                          <label className="px-4 py-2 rounded-xl bg-[#00A896] text-white text-xs font-bold hover:bg-[#008075] cursor-pointer shadow-sm flex items-center gap-1.5 transition-colors">
                            <Upload className="w-3.5 h-3.5" />
                            <span>Upload New File</span>
                            <input type="file" accept="image/*" onChange={handleEditBlogImageUpload} className="hidden" />
                          </label>
                          <button
                            type="button"
                            onClick={() => setEditBlogImage("")}
                            className="px-3 py-2 rounded-xl bg-rose-50 text-rose-600 text-xs font-bold hover:bg-rose-100 transition-colors"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center gap-2 py-5 text-center">
                      <div className="w-12 h-12 rounded-2xl bg-[#E6F4F3] text-[#00A896] flex items-center justify-center">
                        <Upload className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-[#0D2C4A]">Upload article cover banner image</p>
                        <p className="text-[11px] text-slate-400 font-normal">Select image file (.png, .jpg, .webp) from your device</p>
                      </div>
                      <label className="mt-2 px-5 py-2.5 rounded-xl bg-[#00A896] text-white text-xs font-extrabold hover:bg-[#008075] cursor-pointer shadow-md flex items-center gap-2 transition-all">
                        <Upload className="w-4 h-4" />
                        <span>Choose Image File to Upload</span>
                        <input type="file" accept="image/*" onChange={handleEditBlogImageUpload} className="hidden" />
                      </label>
                    </div>
                  )}

                  {/* Preset Topic Images */}
                  <div className="w-full pt-3 border-t border-slate-100 flex flex-wrap items-center gap-2">
                    <span className="text-[11px] font-bold text-slate-400 font-mono">Or quick-pick preset topic cover:</span>
                    {[
                      { name: "1-on-1 Mentorship", url: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1200&q=80" },
                      { name: "Board Prep", url: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=1200&q=80" },
                      { name: "Math & Science", url: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=1200&q=80" },
                      { name: "English Skills", url: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=1200&q=80" },
                      { name: "Parenting", url: "https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?auto=format&fit=crop&w=1200&q=80" },
                    ].map((preset) => (
                      <button
                        key={preset.name}
                        type="button"
                        onClick={() => setEditBlogImage(preset.url)}
                        className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-[10px] font-bold transition-colors cursor-pointer"
                      >
                        {preset.name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* TOP SECTION 3: EXECUTIVE SUMMARY BOX ("মূল বক্তব্য / ক ে") */}
              <div className="space-y-4 bg-slate-50 p-4 sm:p-6 rounded-2xl border border-slate-200">
                <div className="flex items-center justify-between border-b border-slate-200/70 pb-2">
                  <h4 className="font-extrabold text-sm text-[#0D2C4A] flex items-center gap-2">
                    <span className="w-6 h-6 rounded-lg bg-[#00A896] text-white flex items-center justify-center text-xs font-mono font-bold">3</span>
                    <span>Executive Summary Box ("মূল বক্তব্য / ক ে")</span>
                  </h4>
                  <span className="text-[11px] font-mono text-slate-500">Position: Highlighted gradient intro box</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-[#0D2C4A] mb-1">Executive Summary / Intro in Bengali (বাংলা মূল বক্তব্য)</label>
                    <textarea rows={3} value={editBlogIntroBn} onChange={(e) => setEditBlogIntroBn(e.target.value)} className="w-full p-2.5 rounded-xl border bg-white text-xs leading-relaxed" />
                  </div>
                  <div>
                    <label className="block font-bold text-[#0D2C4A] mb-1">Executive Summary / Intro in English</label>
                    <textarea rows={3} value={editBlogIntroEn} onChange={(e) => setEditBlogIntroEn(e.target.value)} className="w-full p-2.5 rounded-xl border bg-white text-xs leading-relaxed" />
                  </div>
                </div>
              </div>

              {/* MULTI-SECTION MANAGER (EDIT) */}
              <div className="space-y-5">
                <div className="flex items-center justify-between border-b border-slate-200/70 pb-3">
                  <div>
                    <h4 className="font-extrabold text-sm text-[#0D2C4A] flex items-center gap-2">
                      <span className="w-6 h-6 rounded-lg bg-[#00A896] text-white flex items-center justify-center text-xs font-mono font-bold">4</span>
                      <span>Content Sections (ব্লগ কন্টেন্ট সেকশন)</span>
                    </h4>
                    <p className="text-[11px] text-slate-500 mt-0.5">Each section: heading, subheading, image+caption, paragraphs, numbered points, and callout</p>
                  </div>
                  <button type="button" onClick={addEditSection} className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#00A896] hover:bg-[#008075] text-white text-xs font-bold transition-all shadow-xs cursor-pointer">
                    <Plus className="w-4 h-4" /><span>+ Add Section</span>
                  </button>
                </div>
                {editBlogSections.map((sec, sIdx) => (
                  <div key={sIdx} className="bg-white rounded-2xl border-2 border-slate-200 shadow-xs overflow-hidden">
                    <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-[#0D2C4A]/5 to-transparent border-b border-slate-100">
                      <span className="font-extrabold text-sm text-[#0D2C4A] flex items-center gap-2">
                        <span className="w-7 h-7 rounded-full bg-[#00A896] text-white font-mono font-bold text-xs flex items-center justify-center">{sIdx + 1}</span>
                        Section #{sIdx + 1}
                      </span>
                      {editBlogSections.length > 1 && (
                        <button type="button" onClick={() => removeEditSection(sIdx)} className="text-rose-500 hover:text-rose-700 hover:bg-rose-50 px-2.5 py-1 rounded-lg text-[11px] font-bold flex items-center gap-1 transition-colors cursor-pointer">
                          <Trash2 className="w-3.5 h-3.5" /> Remove Section
                        </button>
                      )}
                    </div>
                    <div className="p-4 space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block font-bold text-[#0D2C4A] text-[11px] mb-1">Section Heading (বাংলা) — green bar on frontend</label>
                          <input type="text" placeholder="যেমন: গণিতে দুর্বলতার মূল কারণগুলো কী কী?" value={sec.headingBn} onChange={(e) => updateEditSection(sIdx, "headingBn", e.target.value)} className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 font-semibold text-xs focus:outline-none focus:border-[#00A896]" />
                        </div>
                        <div>
                          <label className="block font-bold text-[#0D2C4A] text-[11px] mb-1">Section Heading (English)</label>
                          <input type="text" placeholder="e.g. Root Causes of Weakness in Math?" value={sec.headingEn} onChange={(e) => updateEditSection(sIdx, "headingEn", e.target.value)} className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 font-semibold text-xs focus:outline-none focus:border-[#00A896]" />
                        </div>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block font-bold text-[#0D2C4A] text-[11px] mb-1">Subheading (বাংলা) — teal subheading on frontend</label>
                          <input type="text" placeholder="যেমন: বেসিক গ্যাপ কীভাবে শিক্ষার্থীকে পিছিয়ে দেয়?" value={sec.subheadingBn} onChange={(e) => updateEditSection(sIdx, "subheadingBn", e.target.value)} className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs text-[#00A896] font-medium focus:outline-none focus:border-[#00A896]" />
                        </div>
                        <div>
                          <label className="block font-bold text-[#0D2C4A] text-[11px] mb-1">Subheading (English)</label>
                          <input type="text" placeholder="e.g. How Does a Basic Gap Hold a Student Back?" value={sec.subheadingEn} onChange={(e) => updateEditSection(sIdx, "subheadingEn", e.target.value)} className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs text-[#00A896] font-medium focus:outline-none focus:border-[#00A896]" />
                        </div>
                      </div>
                      <div className="space-y-2 p-3 bg-slate-50 rounded-xl border border-dashed border-slate-300">
                        <label className="block font-bold text-[#0D2C4A] text-[11px]">Section Image — shown below subheading on frontend</label>
                        <div className="flex items-center gap-3">
                          <label className="flex items-center gap-2 cursor-pointer bg-white border border-slate-200 hover:border-[#00A896] rounded-xl px-3 py-2 transition-colors">
                            <span className="text-[#00A896]">📷</span>
                            <span className="text-xs font-bold text-slate-600">Upload Image</span>
                            <input type="file" accept="image/*" className="hidden" onChange={(e) => handleSectionImageUpload(sIdx, e, setEditBlogSections)} />
                          </label>
                          {sec.image && (
                            <div className="relative">
                              <img src={sec.image} alt="preview" className="h-12 w-20 object-cover rounded-lg border" />
                              <button type="button" onClick={() => updateEditSection(sIdx, "image", "")} className="absolute -top-1 -right-1 w-4 h-4 bg-rose-500 text-white rounded-full text-[10px] flex items-center justify-center cursor-pointer">x</button>
                            </div>
                          )}
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
                          <div>
                            <label className="block font-bold text-slate-600 text-[11px] mb-1">Image Caption (বাংলা)</label>
                            <input type="text" placeholder="যেমন: বুয়েট মেন্টরের কাছে হাতে-কলমে অঙ্ক সমাধান" value={sec.imageCaptionBn} onChange={(e) => updateEditSection(sIdx, "imageCaptionBn", e.target.value)} className="w-full p-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#00A896]" />
                          </div>
                          <div>
                            <label className="block font-bold text-slate-600 text-[11px] mb-1">Image Caption (English)</label>
                            <input type="text" placeholder="e.g. Solving math step-by-step with a BUET mentor" value={sec.imageCaptionEn} onChange={(e) => updateEditSection(sIdx, "imageCaptionEn", e.target.value)} className="w-full p-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#00A896]" />
                          </div>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block font-bold text-[#0D2C4A] text-[11px] mb-1">Paragraphs (বাংলা) — double enter = new paragraph</label>
                          <textarea rows={4} placeholder="সেকশনের বিস্তারিত বিষয়বস্তু লিখুন..." value={sec.paragraphsBn} onChange={(e) => updateEditSection(sIdx, "paragraphsBn", e.target.value)} className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs leading-relaxed focus:outline-none focus:border-[#00A896]" />
                        </div>
                        <div>
                          <label className="block font-bold text-[#0D2C4A] text-[11px] mb-1">Paragraphs (English)</label>
                          <textarea rows={4} placeholder="Write detailed content for this section..." value={sec.paragraphsEn} onChange={(e) => updateEditSection(sIdx, "paragraphsEn", e.target.value)} className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs leading-relaxed focus:outline-none focus:border-[#00A896]" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="font-extrabold text-[11px] text-[#0D2C4A] flex items-center gap-1.5">
                            Numbered Point Cards <span className="px-2 py-0.5 rounded-full bg-[#E6F4F3] text-[#00A896] font-mono text-[10px]">{sec.points.length} points</span>
                          </span>
                          <button type="button" onClick={() => addPointToEditSection(sIdx)} className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#00A896]/10 hover:bg-[#00A896]/20 text-[#00A896] text-[11px] font-bold transition-colors cursor-pointer">
                            <Plus className="w-3.5 h-3.5" /> Add Point
                          </button>
                        </div>
                        {sec.points.map((pt, pIdx) => (
                          <div key={pIdx} className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="w-6 h-6 rounded-full bg-[#00A896] text-white font-mono font-bold text-[11px] flex items-center justify-center">{pIdx + 1}</span>
                              <button type="button" onClick={() => removePointFromEditSection(sIdx, pIdx)} className="text-rose-500 hover:text-rose-700 text-[11px] font-bold flex items-center gap-1 cursor-pointer"><Trash2 className="w-3 h-3" /> Remove</button>
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                              <input type="text" placeholder="Title (বাংলা)" value={pt.titleBn} onChange={(e) => updatePointInEditSection(sIdx, pIdx, "titleBn", e.target.value)} className="w-full p-2 rounded-lg border text-xs font-bold text-[#0D2C4A] focus:outline-none focus:border-[#00A896]" />
                              <input type="text" placeholder="Title (English)" value={pt.titleEn} onChange={(e) => updatePointInEditSection(sIdx, pIdx, "titleEn", e.target.value)} className="w-full p-2 rounded-lg border text-xs font-bold text-[#0D2C4A] focus:outline-none focus:border-[#00A896]" />
                              <textarea rows={2} placeholder="বিবরণ (বাংলা)" value={pt.descBn} onChange={(e) => updatePointInEditSection(sIdx, pIdx, "descBn", e.target.value)} className="w-full p-2 rounded-lg border text-xs focus:outline-none focus:border-[#00A896]" />
                              <textarea rows={2} placeholder="Description (English)" value={pt.descEn} onChange={(e) => updatePointInEditSection(sIdx, pIdx, "descEn", e.target.value)} className="w-full p-2 rounded-lg border text-xs focus:outline-none focus:border-[#00A896]" />
                            </div>
                          </div>
                        ))}
                        <button type="button" onClick={() => addPointToEditSection(sIdx)} className="w-full py-2 rounded-xl border-2 border-dashed border-[#00A896]/40 hover:border-[#00A896] bg-[#00A896]/5 text-[#00A896] text-xs font-bold flex items-center justify-center gap-2 cursor-pointer transition-all">
                          <Plus className="w-4 h-4" /> + Add Point Card
                        </button>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block font-bold text-[#0D2C4A] text-[11px] mb-1">Expert Callout Quote (বিশেষ পরামর্শ — বাংলা)</label>
                          <input type="text" placeholder="যেমন: মুখস্থ নয়, কনসেপ্ট ক্লিয়ার করাই সাফল্যের ভিত্তি।" value={sec.calloutBn} onChange={(e) => updateEditSection(sIdx, "calloutBn", e.target.value)} className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs font-semibold focus:outline-none focus:border-[#00A896]" />
                        </div>
                        <div>
                          <label className="block font-bold text-[#0D2C4A] text-[11px] mb-1">Expert Callout Quote (English)</label>
                          <input type="text" placeholder="e.g. Conceptual clarity always beats shallow memorization." value={sec.calloutEn} onChange={(e) => updateEditSection(sIdx, "calloutEn", e.target.value)} className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs font-semibold focus:outline-none focus:border-[#00A896]" />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                <button type="button" onClick={addEditSection} className="w-full py-3 rounded-xl border-2 border-dashed border-[#00A896]/40 hover:border-[#00A896] bg-[#00A896]/5 hover:bg-[#00A896]/10 text-[#00A896] text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer">
                  <Plus className="w-4 h-4" /><span>+ Add Another Content Section</span>
                </button>
              </div>

              {/* TOP SECTION 6: KEY TAKEAWAYS CHECKLIST BOX */}
              <div className="space-y-4 bg-slate-50 p-4 sm:p-6 rounded-2xl border border-slate-200">
                <div className="flex items-center justify-between border-b border-slate-200/70 pb-2">
                  <h4 className="font-extrabold text-sm text-[#0D2C4A] flex items-center gap-2">
                    <span className="w-6 h-6 rounded-lg bg-[#00A896] text-white flex items-center justify-center text-xs font-mono font-bold">6</span>
                    <span>Key Takeaways Checklist ("নিের মূল শিক্ষা")</span>
                  </h4>
                  <span className="text-[11px] font-mono text-slate-500">Position: Bottom summary checklist</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-[#0D2C4A] mb-1">Key Takeaways in Bengali (১টি ে প্রতি লাইনে)</label>
                    <textarea rows={3} value={editBlogTakeawaysBn} onChange={(e) => setEditBlogTakeawaysBn(e.target.value)} className="w-full p-2.5 rounded-xl border bg-white text-xs" />
                  </div>
                  <div>
                    <label className="block font-bold text-[#0D2C4A] mb-1">Key Takeaways in English (1 point per line)</label>
                    <textarea rows={3} value={editBlogTakeawaysEn} onChange={(e) => setEditBlogTakeawaysEn(e.target.value)} className="w-full p-2.5 rounded-xl border bg-white text-xs" />
                  </div>
                </div>
              </div>

              {/* TOP SECTION 7: TAGS & TOPICS */}
              <div className="space-y-4 bg-slate-50 p-4 sm:p-6 rounded-2xl border border-slate-200">
                <div className="flex items-center justify-between border-b border-slate-200/70 pb-2">
                  <h4 className="font-extrabold text-sm text-[#0D2C4A] flex items-center gap-2">
                    <span className="w-6 h-6 rounded-lg bg-[#00A896] text-white flex items-center justify-center text-xs font-mono font-bold">7</span>
                    <span>Article Tags & Topic Keywords</span>
                  </h4>
                  <span className="text-[11px] font-mono text-slate-500">Position: Article footer tags</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-[#0D2C4A] mb-1">Tags in Bengali (কমা দিয়ে আলাদা করুন)</label>
                    <input type="text" value={editBlogTagsBn} onChange={(e) => setEditBlogTagsBn(e.target.value)} className="w-full p-2.5 rounded-xl border bg-white text-xs" />
                  </div>
                  <div>
                    <label className="block font-bold text-[#0D2C4A] mb-1">Tags in English (Comma separated)</label>
                    <input type="text" value={editBlogTagsEn} onChange={(e) => setEditBlogTagsEn(e.target.value)} className="w-full p-2.5 rounded-xl border bg-white text-xs" />
                  </div>
                </div>
              </div>

              {/* ACTION BUTTONS */}
              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setShowEditBlog(false)}
                  className="px-6 py-3 rounded-xl border border-slate-200 text-slate-600 font-bold hover:bg-slate-100 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-8 py-3 rounded-xl bg-[#00A896] hover:bg-[#008075] text-white font-extrabold shadow-md transition-all cursor-pointer"
                >
                  ✓ Update Article
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 5: ADD FAQ (4 Options) */}
      {showAddFaq && (
        <div className="fixed inset-0 z-50 bg-[#0D2C4A]/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-7 space-y-4 border border-[#0D2C4A]/10 shadow-2xl animate-in zoom-in-95 duration-150 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b pb-3">
              <div>
                <h3 className="font-extrabold text-base text-[#0D2C4A]">Add New FAQ Item (4 Options)</h3>
                <p className="text-xs text-slate-500">Provide bilingual questions and answers for both Bengali and English versions</p>
              </div>
              <button onClick={() => setShowAddFaq(false)} className="p-1 text-slate-400 hover:text-slate-600 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleCreateFaq} className="space-y-4 text-xs">
              {/* Option 1: Bengali Question */}
              <div>
                <label className="block font-bold text-[#0D2C4A] mb-1.5 uppercase font-mono text-[11px]">
                  1. Question in Bengali (বাংলা প্রশ্ন) *
                </label>
                <input
                  required
                  type="text"
                  placeholder="যেমন: ক—ত অনলাইন ক্লাস কীভাবে পরিচালিত হয়?"
                  value={newFaqQBn}
                  onChange={(e) => setNewFaqQBn(e.target.value)}
                  className="w-full p-3 rounded-xl border border-slate-200 focus:outline-none focus:border-[#00A896] bg-slate-50 text-sm font-semibold"
                />
              </div>

              {/* Option 2: English Question */}
              <div>
                <label className="block font-bold text-blue-700 mb-1.5 uppercase font-mono text-[11px]">
                  2. Question in English (ইংরেজি প্রশ্ন) *
                </label>
                <input
                  required
                  type="text"
                  placeholder="e.g. How does the 1-on-1 online class work?"
                  value={newFaqQEn}
                  onChange={(e) => setNewFaqQEn(e.target.value)}
                  className="w-full p-3 rounded-xl border border-slate-200 focus:outline-none focus:border-[#00A896] bg-slate-50 text-sm font-semibold"
                />
              </div>

              {/* Option 3: Bengali Answer */}
              <div>
                <label className="block font-bold text-emerald-700 mb-1.5 uppercase font-mono text-[11px]">
                  3. Answer in Bengali (বাংলা উত্তর) *
                </label>
                <textarea
                  required
                  rows={3}
                  placeholder="যেমন: আপনি আপনার পছন্দের বিষয় ও সময় বেছে নেন। আমরা ৪৮ ঘণ্টার মধ্যে আপনার জন্য উপযুক্ত শিক্ষক খুঁজে দিই..."
                  value={newFaqABn}
                  onChange={(e) => setNewFaqABn(e.target.value)}
                  className="w-full p-3 rounded-xl border border-slate-200 focus:outline-none focus:border-[#00A896] bg-slate-50 text-sm leading-relaxed"
                />
              </div>

              {/* Option 4: English Answer */}
              <div>
                <label className="block font-bold text-slate-700 mb-1.5 uppercase font-mono text-[11px]">
                  4. Answer in English (ইংরেজি উত্তর) *
                </label>
                <textarea
                  required
                  rows={3}
                  placeholder="e.g. You choose your subject and preferred time. Within 48 hours, we match you with a verified teacher..."
                  value={newFaqAEn}
                  onChange={(e) => setNewFaqAEn(e.target.value)}
                  className="w-full p-3 rounded-xl border border-slate-200 focus:outline-none focus:border-[#00A896] bg-slate-50 text-sm leading-relaxed"
                />
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddFaq(false)}
                  className="w-1/2 py-3 rounded-xl border border-slate-200 text-slate-600 font-bold hover:bg-slate-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-1/2 py-3 rounded-xl bg-[#00A896] text-white font-extrabold hover:bg-[#008075] transition-all shadow-md cursor-pointer"
                >
                  ✓ Save FAQ (4 Options)
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 6: EDIT FAQ (4 Options) */}
      {showEditFaq && (
        <div className="fixed inset-0 z-50 bg-[#0D2C4A]/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-7 space-y-4 border border-[#0D2C4A]/10 shadow-2xl animate-in zoom-in-95 duration-150 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b pb-3">
              <div>
                <h3 className="font-extrabold text-base text-[#0D2C4A]">Edit FAQ Item (4 Options)</h3>
                <p className="text-xs text-slate-500">Modify any of the 4 question and answer options</p>
              </div>
              <button onClick={() => setShowEditFaq(false)} className="p-1 text-slate-400 hover:text-slate-600 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleUpdateFaq} className="space-y-4 text-xs">
              {/* Option 1: Bengali Question */}
              <div>
                <label className="block font-bold text-[#0D2C4A] mb-1.5 uppercase font-mono text-[11px]">
                  1. Question in Bengali (বাংলা প্রশ্ন) *
                </label>
                <input
                  required
                  type="text"
                  value={editFaqQBn}
                  onChange={(e) => setEditFaqQBn(e.target.value)}
                  className="w-full p-3 rounded-xl border border-slate-200 focus:outline-none focus:border-[#00A896] bg-slate-50 text-sm font-semibold"
                />
              </div>

              {/* Option 2: English Question */}
              <div>
                <label className="block font-bold text-blue-700 mb-1.5 uppercase font-mono text-[11px]">
                  2. Question in English (ইংরেজি প্রশ্ন) *
                </label>
                <input
                  required
                  type="text"
                  value={editFaqQEn}
                  onChange={(e) => setEditFaqQEn(e.target.value)}
                  className="w-full p-3 rounded-xl border border-slate-200 focus:outline-none focus:border-[#00A896] bg-slate-50 text-sm font-semibold"
                />
              </div>

              {/* Option 3: Bengali Answer */}
              <div>
                <label className="block font-bold text-emerald-700 mb-1.5 uppercase font-mono text-[11px]">
                  3. Answer in Bengali (বাংলা উত্তর) *
                </label>
                <textarea
                  required
                  rows={3}
                  value={editFaqABn}
                  onChange={(e) => setEditFaqABn(e.target.value)}
                  className="w-full p-3 rounded-xl border border-slate-200 focus:outline-none focus:border-[#00A896] bg-slate-50 text-sm leading-relaxed"
                />
              </div>

              {/* Option 4: English Answer */}
              <div>
                <label className="block font-bold text-slate-700 mb-1.5 uppercase font-mono text-[11px]">
                  4. Answer in English (ইংরেজি উত্তর) *
                </label>
                <textarea
                  required
                  rows={3}
                  value={editFaqAEn}
                  onChange={(e) => setEditFaqAEn(e.target.value)}
                  className="w-full p-3 rounded-xl border border-slate-200 focus:outline-none focus:border-[#00A896] bg-slate-50 text-sm leading-relaxed"
                />
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowEditFaq(false)}
                  className="w-1/2 py-3 rounded-xl border border-slate-200 text-slate-600 font-bold hover:bg-slate-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-1/2 py-3 rounded-xl bg-[#00A896] text-white font-extrabold hover:bg-[#008075] transition-all shadow-md cursor-pointer"
                >
                  ✓ Update FAQ (4 Options)
                </button>
              </div>
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


      {/* ============================================================ */}
      {/* MODAL: CREATE / EDIT CUSTOM PAGE & POLICIES */}
      {/* ============================================================ */}
      {showPageModal && editingPage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-4xl w-full p-6 sm:p-8 space-y-6 shadow-2xl border border-slate-200 my-8 max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-[#00A896]/10 text-[#00A896] flex items-center justify-center">
                  <Layers className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-lg text-[#0D2C4A]">
                    {editingPage.titleBn ? `Edit "${editingPage.titleBn}"` : "Create New Custom Page"}
                  </h3>
                  <p className="text-xs text-slate-500 font-mono">
                    URL: {['privacy', 'terms', 'refund-policy'].includes(editingPage.slug) ? `/${editingPage.slug}` : `/pages/${editingPage.slug || "custom-slug"}`}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowPageModal(false)}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Basic Info */}
            <div className="space-y-4">
              <h4 className="font-bold text-sm text-[#0D2C4A] border-b pb-1">১. সাধারণ তথ্য ও হেডার (Basic Information)</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Page Slug (URL Identifier) *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. privacy, terms, refund-policy, about-us"
                    value={editingPage.slug}
                    onChange={(e) => setEditingPage({ ...editingPage, slug: e.target.value.toLowerCase().replace(/[^a-z0-9-_]/g, '-') })}
                    className="w-full p-3 rounded-xl border border-slate-300 font-mono focus:border-[#00A896] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">সর্বশেষ আপডেট (Last Updated Date Text)</label>
                  <input
                    type="text"
                    placeholder="১০ আগস্ট, ২০২৬"
                    value={editingPage.lastUpdatedBn || ""}
                    onChange={(e) => setEditingPage({ ...editingPage, lastUpdatedBn: e.target.value })}
                    className="w-full p-3 rounded-xl border border-slate-300 focus:border-[#00A896] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">পৃষ্ঠার মূল শিরোনাম (Bangla Title) *</label>
                  <input
                    type="text"
                    required
                    placeholder="যেমন: গোপনীয়তা নীতি (Privacy Policy)"
                    value={editingPage.titleBn}
                    onChange={(e) => setEditingPage({ ...editingPage, titleBn: e.target.value })}
                    className="w-full p-3 rounded-xl border border-slate-300 font-bold focus:border-[#00A896] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">English Title *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Privacy Policy"
                    value={editingPage.titleEn}
                    onChange={(e) => setEditingPage({ ...editingPage, titleEn: e.target.value })}
                    className="w-full p-3 rounded-xl border border-slate-300 font-bold focus:border-[#00A896] focus:outline-none"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block font-bold text-slate-700 mb-1">সাবটাইটেল / সারসংক্ষেপ (Bangla Subtitle)</label>
                  <input
                    type="text"
                    placeholder="শিক্ষার্থী ও অভিভাবকদের তথ্যের সর্বোচ্চ সুরক্ষা সুনিশ্চিত করা আমাদের অগ্রাধিকার।"
                    value={editingPage.subtitleBn}
                    onChange={(e) => setEditingPage({ ...editingPage, subtitleBn: e.target.value })}
                    className="w-full p-3 rounded-xl border border-slate-300 focus:border-[#00A896] focus:outline-none"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block font-bold text-slate-700 mb-1">English Subtitle</label>
                  <input
                    type="text"
                    placeholder="Protecting student and parent information is our top priority."
                    value={editingPage.subtitleEn}
                    onChange={(e) => setEditingPage({ ...editingPage, subtitleEn: e.target.value })}
                    className="w-full p-3 rounded-xl border border-slate-300 focus:border-[#00A896] focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* SEO Settings */}
            <div className="space-y-4 pt-4 border-t border-slate-200">
              <h4 className="font-bold text-sm text-[#0D2C4A] border-b pb-1">২. এসইও মেটা সেটিংস (SEO Meta Settings)</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Meta Title (Bangla)</label>
                  <input
                    type="text"
                    placeholder="গোপনীয়তা নীতি | OTOTeachers"
                    value={editingPage.metaTitleBn || ""}
                    onChange={(e) => setEditingPage({ ...editingPage, metaTitleBn: e.target.value })}
                    className="w-full p-3 rounded-xl border border-slate-300 focus:border-[#00A896] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Meta Title (English)</label>
                  <input
                    type="text"
                    placeholder="Privacy Policy | OTOTeachers"
                    value={editingPage.metaTitleEn || ""}
                    onChange={(e) => setEditingPage({ ...editingPage, metaTitleEn: e.target.value })}
                    className="w-full p-3 rounded-xl border border-slate-300 focus:border-[#00A896] focus:outline-none"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block font-bold text-slate-700 mb-1">Meta Description</label>
                  <textarea
                    rows={2}
                    placeholder="OTOTeachers প্ল্যাটফর্মের গোপনীয়তা নীতি — শিক্ষার্থী ও অভিভাবকদের তথ্যের শতভাগ নিরাপত্তা..."
                    value={editingPage.metaDescriptionBn || ""}
                    onChange={(e) => setEditingPage({ ...editingPage, metaDescriptionBn: e.target.value })}
                    className="w-full p-3 rounded-xl border border-slate-300 focus:border-[#00A896] focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Dynamic Sections Manager */}
            <div className="space-y-4 pt-4 border-t border-slate-200">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-sm text-[#0D2C4A]">৩. পৃষ্ঠার সেকশন ও বিষয়বস্তু (Sections &amp; Content)</h4>
                  <p className="text-xs text-slate-500">Add, edit, reorder, or delete policy sections dynamically</p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    const newSecs = [...(editingPage.sections || [])];
                    newSecs.push({
                      id: "sec-" + Date.now(),
                      icon: "ShieldCheck",
                      titleBn: "",
                      titleEn: "",
                      contentBn: "",
                      contentEn: "",
                    });
                    setEditingPage({ ...editingPage, sections: newSecs });
                  }}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#00A896] text-white text-xs font-bold hover:bg-[#008075] cursor-pointer shadow-xs active:scale-95"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Section</span>
                </button>
              </div>

              <div className="space-y-4">
                {editingPage.sections?.map((sec, idx) => (
                  <div key={sec.id || idx} className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                    {/* Section Controls */}
                    <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                      <span className="font-mono text-xs font-bold text-[#00A896]">
                        Section #{idx + 1}
                      </span>
                      <div className="flex items-center gap-1.5">
                        {idx > 0 && (
                          <button
                            type="button"
                            onClick={() => {
                              const newSecs = [...editingPage.sections];
                              const temp = newSecs[idx - 1];
                              newSecs[idx - 1] = newSecs[idx];
                              newSecs[idx] = temp;
                              setEditingPage({ ...editingPage, sections: newSecs });
                            }}
                            className="p-1.5 rounded-lg bg-white text-slate-600 hover:text-[#0D2C4A] border border-slate-200 cursor-pointer shadow-2xs"
                            title="Move Up"
                          >
                            <MoveUp className="w-3.5 h-3.5" />
                          </button>
                        )}
                        {idx < editingPage.sections.length - 1 && (
                          <button
                            type="button"
                            onClick={() => {
                              const newSecs = [...editingPage.sections];
                              const temp = newSecs[idx + 1];
                              newSecs[idx + 1] = newSecs[idx];
                              newSecs[idx] = temp;
                              setEditingPage({ ...editingPage, sections: newSecs });
                            }}
                            className="p-1.5 rounded-lg bg-white text-slate-600 hover:text-[#0D2C4A] border border-slate-200 cursor-pointer shadow-2xs"
                            title="Move Down"
                          >
                            <MoveDown className="w-3.5 h-3.5" />
                          </button>
                        )}
                        <button
                          type="button"
                          onClick={() => {
                            const newSecs = editingPage.sections.filter((_, i) => i !== idx);
                            setEditingPage({ ...editingPage, sections: newSecs });
                          }}
                          className="p-1.5 rounded-lg bg-rose-50 text-rose-600 hover:bg-rose-100 cursor-pointer border border-rose-100"
                          title="Delete Section"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    {/* Section Fields */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                      <div>
                        <label className="block font-bold text-slate-600 mb-1">Icon Type</label>
                        <select
                          value={sec.icon || "ShieldCheck"}
                          onChange={(e) => {
                            const newSecs = [...editingPage.sections];
                            newSecs[idx].icon = e.target.value;
                            setEditingPage({ ...editingPage, sections: newSecs });
                          }}
                          className="w-full p-2.5 rounded-xl border border-slate-300 bg-white font-mono font-bold"
                        >
                          <option value="ShieldCheck">ShieldCheck (নিরাপত্তা)</option>
                          <option value="Database">Database (তথ্যভাণ্ডার)</option>
                          <option value="EyeOff">EyeOff (গোপনীয়তা)</option>
                          <option value="CreditCard">CreditCard (পেমেন্ট)</option>
                          <option value="FileText">FileText (ডকুমেন্ট)</option>
                          <option value="BookOpen">BookOpen (শিক্ষা)</option>
                          <option value="CheckCircle">CheckCircle (শর্তাবলী)</option>
                          <option value="Clock">Clock (সময়/শিডিউলিং)</option>
                          <option value="PhoneCall">PhoneCall (যোগাযোগ)</option>
                          <option value="RefreshCw">RefreshCw (রিফান্ড/পরিবর্তন)</option>
                          <option value="HelpCircle">HelpCircle (সহায়তা)</option>
                          <option value="Lock">Lock (সুরক্ষা)</option>
                          <option value="Scale">Scale (আইন/নীতি)</option>
                        </select>
                      </div>
                      <div>
                        <label className="block font-bold text-slate-600 mb-1">সেকশন শিরোনাম (Bangla) *</label>
                        <input
                          type="text"
                          required
                          placeholder="১. সংগৃহীত তথ্যের বিবরণ"
                          value={sec.titleBn}
                          onChange={(e) => {
                            const newSecs = [...editingPage.sections];
                            newSecs[idx].titleBn = e.target.value;
                            setEditingPage({ ...editingPage, sections: newSecs });
                          }}
                          className="w-full p-2.5 rounded-xl border border-slate-300 font-bold"
                        />
                      </div>
                      <div>
                        <label className="block font-bold text-slate-600 mb-1">Section Title (English)</label>
                        <input
                          type="text"
                          placeholder="1. Information We Collect"
                          value={sec.titleEn}
                          onChange={(e) => {
                            const newSecs = [...editingPage.sections];
                            newSecs[idx].titleEn = e.target.value;
                            setEditingPage({ ...editingPage, sections: newSecs });
                          }}
                          className="w-full p-2.5 rounded-xl border border-slate-300 font-bold"
                        />
                      </div>

                      <div className="sm:col-span-3">
                        <label className="block font-bold text-slate-600 mb-1">বিস্তারিত বিবরণ (Bangla Content) *</label>
                        <textarea
                          rows={3}
                          required
                          placeholder="এখানে সেকশনের বিস্তারিত বর্ণনা ও শর্তাবলী লিখুন..."
                          value={sec.contentBn}
                          onChange={(e) => {
                            const newSecs = [...editingPage.sections];
                            newSecs[idx].contentBn = e.target.value;
                            setEditingPage({ ...editingPage, sections: newSecs });
                          }}
                          className="w-full p-3 rounded-xl border border-slate-300 font-sans leading-relaxed"
                        />
                      </div>

                      <div className="sm:col-span-3">
                        <label className="block font-bold text-slate-600 mb-1">Detailed Content (English)</label>
                        <textarea
                          rows={3}
                          placeholder="Write detailed policy explanation and requirements in English..."
                          value={sec.contentEn}
                          onChange={(e) => {
                            const newSecs = [...editingPage.sections];
                            newSecs[idx].contentEn = e.target.value;
                            setEditingPage({ ...editingPage, sections: newSecs });
                          }}
                          className="w-full p-3 rounded-xl border border-slate-300 font-sans leading-relaxed"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200">
              <button
                type="button"
                onClick={() => setShowPageModal(false)}
                className="px-5 py-2.5 rounded-2xl bg-slate-100 text-slate-700 text-xs font-bold hover:bg-slate-200 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={pageSaving}
                onClick={handleSavePage}
                className="px-6 py-2.5 rounded-2xl bg-[#00A896] hover:bg-[#008075] text-white text-xs font-extrabold cursor-pointer shadow-md active:scale-95 transition-all flex items-center gap-2"
              >
                {pageSaving ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin text-white" />
                    <span>Saving...</span>
                  </>
                ) : (
                  <>
                    <CheckCircle className="w-4 h-4" />
                    <span>Save &amp; Update Page</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}





