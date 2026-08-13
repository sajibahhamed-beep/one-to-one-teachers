"use client";

import { useLanguage } from "@/context/LanguageContext";
import {
  GraduationCap,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  BookOpen,
  HelpCircle,
  TrendingUp,
  Clock,
  Briefcase,
  HeartHandshake,
  ShieldCheck,
  Award,
  Wallet,
} from "lucide-react";

interface StudentTeacherSectionProps {
  onOpenEnroll: (plan?: string) => void;
  onOpenMentor: () => void;
}

export default function StudentTeacherSection({
  onOpenEnroll,
  onOpenMentor,
}: StudentTeacherSectionProps) {
  const { lang, t } = useLanguage();

  return (
    <section className="py-20 md:py-28 bg-[#FBF7EF] font-sans border-b border-[#0D2C4A]/10">
      <div className="max-w-[1240px] mx-auto px-6 md:px-8 space-y-20">

        {/* ============================================================ */}
        {/* SECTION 6: FOR STUDENTS (H2) */}
        {/* ============================================================ */}
        <div id="for-students" className="scroll-mt-24 space-y-10">
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#00A896]/10 text-[#00A896] text-xs font-mono font-bold uppercase tracking-wider">
              <GraduationCap className="w-4 h-4" />
              <span>{t.forStudentsH2 || "For Students"}</span>
            </div>

            <h2 className="font-sans text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0D2C4A] leading-[1.35] tracking-tight">
              {t.forStudentsTitle || "শিক্ষার্থীদের জন্য: ব্যক্তিগত মনোযোগ ও নিশ্চিত অগ্রগতি"}
            </h2>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
              {t.forStudentsDesc ||
                "প্রতিটি শিক্ষার্থীর শেখার গতি আলাদা। নিজের শিক্ষকের সাথে ব্যক্তিগতভাবে পড়াশোনা করে পরীক্ষায় সর্বোচ্চ ফলাফল অর্জন করুন।"}
            </p>
          </div>

          {/* 3 Student Benefit Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            <div className="bg-white rounded-3xl p-7 sm:p-8 border border-[#0D2C4A]/10 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between space-y-4">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-[#00A896]/10 text-[#00A896] flex items-center justify-center">
                  <Sparkles className="w-6 h-6" />
                </div>
                <h3 className="font-sans text-xl font-bold text-[#0D2C4A]">
                  {lang === "bn" ? "ভয়হীন প্রশ্ন ও দুর্বলতা দূরীকরণ" : "Ask Questions Without Fear"}
                </h3>
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                  {lang === "bn"
                    ? "কোচিংয়ের বড় ক্লাসে যে প্রশ্ন করতে দ্বিধা বোধ হতো, ব্যক্তিগত ক্লাসে শিক্ষককে সরাসরি যেকোনো প্রশ্ন করে বুঝে নেওয়ার পূর্ণ স্বাধীনতা।"
                    : "Overcome hesitation to ask questions in big classrooms. Get dedicated 1-on-1 explanations until every concept is fully clear."}
                </p>
              </div>
              <ul className="pt-4 border-t border-slate-100 space-y-2 text-xs sm:text-sm font-semibold text-[#0D2C4A]">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#00A896]" />
                  <span>{lang === "bn" ? "ব্যক্তিগত ডায়াগনস্টিক টেস্ট" : "Diagnostic Assessment"}</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#00A896]" />
                  <span>{lang === "bn" ? "সহজ নিয়মে কনসেপ্ট ক্লিয়ার" : "Step-by-Step Problem Solving"}</span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-3xl p-7 sm:p-8 border border-[#0D2C4A]/10 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between space-y-4">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-[#00A896]/10 text-[#00A896] flex items-center justify-center">
                  <Clock className="w-6 h-6" />
                </div>
                <h3 className="font-sans text-xl font-bold text-[#0D2C4A]">
                  {lang === "bn" ? "আপনার সুবিধাজনক সময়সূচি" : "Flexible Online Schedule"}
                </h3>
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                  {lang === "bn"
                    ? "সকাল, বিকেল বা রাতে — আপনার পড়ার রুটিন অনুযায়ী ক্লাস টাইম নির্ধারণ করুন। ঢাকার জ্যাম বা রাস্তায় সময় নষ্টের কোনো ঝামেলা নেই।"
                    : "Choose morning, afternoon, or evening study slots that suit your school routine. Learn safely from the comfort of home."}
                </p>
              </div>
              <ul className="pt-4 border-t border-slate-100 space-y-2 text-xs sm:text-sm font-semibold text-[#0D2C4A]">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#00A896]" />
                  <span>{lang === "bn" ? "সপ্তাহে ২-৬ দিন ক্লাস সুবিধা" : "2 to 6 Classes per Week"}</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#00A896]" />
                  <span>{lang === "bn" ? "যাতায়াত ক্লান্তি থেকে মুক্তি" : "Zero Commute Hassle"}</span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-3xl p-7 sm:p-8 border border-[#0D2C4A]/10 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between space-y-4">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-[#00A896]/10 text-[#00A896] flex items-center justify-center">
                  <TrendingUp className="w-6 h-6" />
                </div>
                <h3 className="font-sans text-xl font-bold text-[#0D2C4A]">
                  {lang === "bn" ? "বোর্ড পরীক্ষার স্পেশাল গাইডলাইন" : "Board Exam Preparation"}
                </h3>
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                  {lang === "bn"
                    ? "এসএসসি ও এইচএসসি পরীক্ষার টেস্ট পেপার সমাধান, সিকিউ ও এমসিকিউ শর্টকাট এবং নিয়মিত মূল্যায়ন পরীক্ষার মাধ্যমে পূর্ণ প্রস্তুতি।"
                    : "Targeted board question practice, CQ/MCQ strategies, and regular mock tests with BUET and DU top mentors."}
                </p>
              </div>
              <ul className="pt-4 border-t border-slate-100 space-y-2 text-xs sm:text-sm font-semibold text-[#0D2C4A]">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#00A896]" />
                  <span>{lang === "bn" ? "অধ্যায়ভিত্তিক মডেল টেস্ট" : "Chapter-wise Model Tests"}</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#00A896]" />
                  <span>{lang === "bn" ? "সাপ্তাহিক অভিভাবক রিপোর্ট" : "Weekly Parent Progress Notes"}</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="text-center sm:text-left">
            <button
              onClick={() => onOpenEnroll("Free Trial")}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#00A896] text-white font-extrabold text-sm sm:text-base hover:bg-[#008075] shadow-lg shadow-[#00A896]/30 hover:-translate-y-0.5 transition-all cursor-pointer"
            >
              <span>{lang === "bn" ? "শিক্ষার্থী হিসেবে ফ্রি ট্রায়াল ক্লাস নিন" : "Start Learning with Free Trial"}</span>
              <ArrowRight className="w-4.5 h-4.5" />
            </button>
          </div>
        </div>

        {/* ============================================================ */}
        {/* SECTION 7: FOR TEACHERS (H2) */}
        {/* ============================================================ */}
        <div id="for-teachers" className="scroll-mt-24 pt-12 border-t border-[#0D2C4A]/10 space-y-10">
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0D2C4A]/10 text-[#0D2C4A] text-xs font-mono font-bold uppercase tracking-wider">
              <Briefcase className="w-4 h-4 text-[#00A896]" />
              <span>{t.forTeachersH2 || "For Teachers"}</span>
            </div>

            <h2 className="font-sans text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0D2C4A] leading-[1.35] tracking-tight">
              {t.forTeachersTitle || "শিক্ষকদের জন্য: সুবিধাজনক অনলাইন টিউশন ও সম্মানজনক আয়"}
            </h2>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
              {t.forTeachersDesc ||
                "বুয়েট, ঢাবি, মেডিকেল বা শীর্ষ বিশ্ববিদ্যালয়ের শিক্ষার্থী হিসেবে বাসা বা হল থেকেই সারা দেশের শিক্ষার্থীদের পাঠদান করুন।"}
            </p>
          </div>

          {/* 3 Teacher Benefit Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            <div className="bg-white rounded-3xl p-7 sm:p-8 border border-[#0D2C4A]/10 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between space-y-4">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-[#0D2C4A]/10 text-[#0D2C4A] flex items-center justify-center">
                  <Clock className="w-6 h-6 text-[#00A896]" />
                </div>
                <h3 className="font-sans text-xl font-bold text-[#0D2C4A]">
                  {lang === "bn" ? "বিশ্ববিদ্যালয় ক্লাসের সাথে মিলিয়ে সময়সূচি" : "Teach on Your Own Schedule"}
                </h3>
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                  {lang === "bn"
                    ? "আপনার নিজের পরীক্ষার সময়সূচি ও ক্লাসের সাথে সামঞ্জস্য রেখে সন্ধ্যার বা ছুটির দিনের ব্যাচ বেছে নিন।"
                    : "Set teaching availability that aligns seamlessly with your university exam schedule and semester routines."}
                </p>
              </div>
              <ul className="pt-4 border-t border-slate-100 space-y-2 text-xs sm:text-sm font-semibold text-[#0D2C4A]">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#00A896]" />
                  <span>{lang === "bn" ? "সম্পূর্ণ অনলাইন ও অডিও মোড" : "100% Remote From Hall/Home"}</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#00A896]" />
                  <span>{lang === "bn" ? "পছন্দের বিষয় বেছে নেওয়ার সুযোগ" : "Select Your Subject of Expertise"}</span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-3xl p-7 sm:p-8 border border-[#0D2C4A]/10 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between space-y-4">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-[#0D2C4A]/10 text-[#0D2C4A] flex items-center justify-center">
                  <Wallet className="w-6 h-6 text-[#00A896]" />
                </div>
                <h3 className="font-sans text-xl font-bold text-[#0D2C4A]">
                  {lang === "bn" ? "নির্ধারিত সময়ে সম্মানজনক পারিশ্রমিক" : "Prompt & Fair Honorarium"}
                </h3>
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                  {lang === "bn"
                    ? "প্রতিটি ক্লাসের যথাযথ মূল্যায়ন ও নিয়মিত মাসিক পারিশ্রমিক সরাসরি আপনার বিকাশ, নগদ বা ব্যাংক অ্যাকাউন্টে প্রদান করা হয়।"
                    : "Transparent payment schedules with direct disbursal to bKash, Nagad, or bank accounts."}
                </p>
              </div>
              <ul className="pt-4 border-t border-slate-100 space-y-2 text-xs sm:text-sm font-semibold text-[#0D2C4A]">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#00A896]" />
                  <span>{lang === "bn" ? "স্বচ্ছ পেমেন্ট সিস্টেম" : "Automated Session Tracking"}</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#00A896]" />
                  <span>{lang === "bn" ? "পেমেন্ট পাওয়ার কোনো ঝামেলা নেই" : "Reliable Monthly Disbursals"}</span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-3xl p-7 sm:p-8 border border-[#0D2C4A]/10 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between space-y-4">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-[#0D2C4A]/10 text-[#0D2C4A] flex items-center justify-center">
                  <HeartHandshake className="w-6 h-6 text-[#00A896]" />
                </div>
                <h3 className="font-sans text-xl font-bold text-[#0D2C4A]">
                  {lang === "bn" ? "সরাসরি শিক্ষাদানে সামাজিক প্রভাব" : "Real Educational Impact"}
                </h3>
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                  {lang === "bn"
                    ? "বাংলাদেশের প্রত্যন্ত অঞ্চলের অসচ্ছল বা পিছিয়ে পড়া শিক্ষার্থীদের সফলতার পথে পথপ্রদর্শক হয়ে অনন্য ভূমিকা রাখুন।"
                    : "Mentor students across all 64 districts who lack quality local tuition and transform their academic trajectory."}
                </p>
              </div>
              <ul className="pt-4 border-t border-slate-100 space-y-2 text-xs sm:text-sm font-semibold text-[#0D2C4A]">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#00A896]" />
                  <span>{lang === "bn" ? "টিচিং এক্সপেরিয়েন্স সার্টিফিকেট" : "Teaching Certificate & Recognition"}</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#00A896]" />
                  <span>{lang === "bn" ? "দেশব্যাপী শিক্ষক কমিউনিটি" : "Join Top University Mentor Network"}</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="text-center sm:text-left">
            <button
              onClick={onOpenMentor}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#0D2C4A] text-white font-extrabold text-sm sm:text-base hover:bg-[#16385C] shadow-lg hover:-translate-y-0.5 transition-all cursor-pointer"
            >
              <Briefcase className="w-4.5 h-4.5 text-[#00A896]" />
              <span>{lang === "bn" ? "শিক্ষক হিসেবে আবেদন করুন" : "Apply as a 1-on-1 Tutor"}</span>
              <ArrowRight className="w-4.5 h-4.5" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
