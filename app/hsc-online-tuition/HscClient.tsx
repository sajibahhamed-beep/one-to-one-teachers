"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import EnrollModal from "@/components/EnrollModal";
import MentorModal from "@/components/MentorModal";
import { useLanguage } from "@/context/LanguageContext";
import {
  GraduationCap,
  Sparkles,
  CheckCircle2,
  BookOpen,
  ArrowRight,
  ShieldCheck,
  Award,
  Zap,
  ChevronDown,
} from "lucide-react";

export default function HscClient() {
  const { lang } = useLanguage();
  const [enrollModalOpen, setEnrollModalOpen] = useState(false);
  const [mentorModalOpen, setMentorModalOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const hscSubjects = [
    {
      titleBn: "এইচএসসি উচ্চতর গণিত ১ম ও ২য় পত্র",
      titleEn: "HSC Higher Math 1st & 2nd Paper",
      descBn: "ম্যাট্রিক্স, সরলরেখা, বৃত্ত, ত্রিকোণমিতি, ক্যালকুলাস (অন্তরীকরণ ও সমাকলন) এবং কনিক্সের পূর্ণাঙ্গ সমাধান।",
      descEn: "Matrix, straight lines, circles, calculus, differentiation & integration masterclasses.",
      tutorBn: "বুয়েট সিএসই ও মেকানিক্যাল মেন্টর",
      tutorEn: "BUET CSE & ME Mentors",
      tag: "Engineering Base",
    },
    {
      titleBn: "এইচএসসি পদার্থবিজ্ঞান (Physics)",
      titleEn: "HSC Physics 1st & 2nd Paper",
      descBn: "ভেক্টর, গতিবিদ্যা, নিউটনিয়ান বলবিদ্যা, কাজ-শক্তি, মহাকর্ষ, তাপগতিবিদ্যা ও চলতড়িৎ-এর জটিল গাণিতিক সমস্যার সমাধান।",
      descEn: "Vectors, Newtonian mechanics, work-energy, thermodynamics & electricity mathematical problems.",
      tutorBn: "বুয়েট ও ইইই গ্র্যাজুয়েট মেন্টর",
      tutorEn: "BUET & EEE Graduate Mentors",
      tag: "Top Rated",
    },
    {
      titleBn: "এইচএসসি রসায়ন (Chemistry)",
      titleEn: "HSC Chemistry 1st & 2nd Paper",
      descBn: "জৈব রসায়নের (Organic Chemistry) জটিল বিক্রিয়া মেকানিজম, গুণগত রসায়ন ও পরিমাণগত রসায়নের অংক।",
      descEn: "Organic chemistry reaction mechanisms, qualitative and quantitative calculations.",
      tutorBn: "মেডিকেল ও বুয়েট কেমিক্যাল মেন্টর",
      tutorEn: "Medical & BUET Chemical Mentors",
      tag: "Medical Base",
    },
    {
      titleBn: "এইচএসসি জীববিজ্ঞান (Biology)",
      titleEn: "HSC Biology 1st & 2nd Paper",
      descBn: "উদ্ভিদবিজ্ঞান ও প্রাণিবিজ্ঞানের ফিগার ড্রয়িং, জেনেটিক্স, শারীরতত্ত্ব ও বোর্ড পরীক্ষার নির্ভুল উত্তর কৌশল।",
      descEn: "Botany & Zoology diagram mastery, genetics, physiology, and board exam presentation.",
      tutorBn: "ডিএমসি ও সলিমুল্লাহ মেডিকেল মেন্টর",
      tutorEn: "DMC & SSMCH Medical Mentors",
      tag: "Medical Track",
    },
    {
      titleBn: "এইচএসসি আইসিটি (ICT)",
      titleEn: "HSC ICT Complete Syllabus",
      descBn: "সংখ্যা পদ্ধতি, এইচটিএমএল (HTML) ওয়েব ডিজাইন ও সি প্রোগ্রামিং (C Programming) কোডিং সমাধান।",
      descEn: "Number systems, HTML web design, and C programming fundamentals.",
      tutorBn: "বুয়েট ও সাস্ট সিএসই মেন্টর",
      tutorEn: "BUET & SUST CSE Mentors",
      tag: "Compulsory",
    },
    {
      titleBn: "ইংরেজি ও স্পোকেন ইংলিশ",
      titleEn: "HSC English 1st & 2nd Paper",
      descBn: "ফ্রি-হ্যান্ড রাইটিং, মডিফায়ার, প্রিপোজিশন ও রাইট ফর্ম অফ ভার্বসের রুলস ভিত্তিক অনুশীলন।",
      descEn: "Modifiers, prepositions, right form of verbs, and freehand composition mastery.",
      tutorBn: "ঢাবি ইংরেজি বিভাগ মেন্টর",
      tutorEn: "DU English Dept Mentors",
      tag: "Language Track",
    },
  ];

  const faqs = [
    {
      q: "এইচএসসি বিজ্ঞান বিষয়ের জটিল অংক কীভাবে সহজে বোঝা যায়?",
      a: "বুয়েট ও মেডিকেল পড়ুয়া শিক্ষকরা জটিল সূত্র মুখস্থ না করিয়ে মূল ফিজিক্যাল কনসেপ্ট, ফ্রি-বডি ডায়াগ্রাম এবং স্টেপ-বাই-স্টেপ ক্যালকুলেশন শর্টকাটের মাধ্যমে বুঝিয়ে দেন।",
    },
    {
      q: "এইচএসসি ক্লাসের পাশাপাশি কি ভর্তি পরীক্ষার বেসিক কভার হবে?",
      a: "হ্যাঁ, বোর্ড পরীক্ষার সৃজনশীল প্রশ্ন সমাধানের পাশাপাশি বুয়েট, ঢাবি ও মেডিকেল ভর্তি পরীক্ষার কনসেপচুয়াল বেসিক শক্তিশালী করা হয়।",
    },
    {
      q: "কলেজের ব্যস্ত সময়ের সাথে ক্লাসের সময় মিলবে কীভাবে?",
      a: "আমাদের ক্লাস সম্পূর্ণ ফ্লেক্সিবল। শিক্ষার্থী চাইলে সকাল, বিকেল বা রাতে সুবিধাজনক সময়ে শিক্ষকের সাথে ক্লাস শিডিউল করতে পারে।",
    },
  ];

  return (
    <main className="min-h-screen bg-[#F8FAFC] font-sans">
      <Navbar
        onOpenEnroll={() => setEnrollModalOpen(true)}
        onOpenMentor={() => setMentorModalOpen(true)}
      />

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-[#0D2C4A] via-[#16385C] to-[#00A896] text-white py-16 md:py-24">
        <div className="max-w-[1240px] mx-auto px-6 md:px-8 text-center max-w-3xl space-y-5">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-white text-xs font-mono font-bold border border-white/20">
            <Zap className="w-4 h-4 text-[#FFB627]" />
            <span>{lang === "bn" ? "এইচএসসি বোর্ড ও অ্যাডমিশন ফাউন্ডেশন" : "HSC Board & Admission Base"}</span>
          </div>

          <h1 className="font-sans text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-[1.3]">
            {lang === "bn"
              ? "এইচএসসি অনলাইন টিউশন — বুয়েট ও মেডিকেল শিক্ষক ও বোর্ড প্রস্তুতি"
              : "HSC Online Tuition — BUET & Medical Mentors for College Excellence"}
          </h1>

          <p className="text-base sm:text-lg text-white/85 leading-relaxed">
            {lang === "bn"
              ? "একাদশ ও দ্বাদশ শ্রেণির বিজ্ঞান, বাণিজ্য ও মানবিক শিক্ষার্থীদের জন্য শীর্ষ বিশ্ববিদ্যালয়ের ব্যক্তিগত শিক্ষক। জৈব রসায়ন, ক্যালকুলাস ও পদার্থবিজ্ঞানের জটিল অংক বুঝুন ঘরে বসেই।"
              : "1-on-1 personalized tutoring for Class 11 & 12 students. Master Organic Chemistry, Calculus, and Physics from top university graduates."}
          </p>

          <div className="pt-4 flex flex-wrap justify-center gap-4">
            <button
              onClick={() => setEnrollModalOpen(true)}
              className="px-8 py-4 rounded-full bg-[#FFB627] text-[#0D2C4A] font-extrabold text-sm sm:text-base hover:bg-[#F59E0B] shadow-xl hover:-translate-y-0.5 transition-all cursor-pointer flex items-center gap-2"
            >
              <span>{lang === "bn" ? "ফ্রি ট্রায়াল সেশন বুক করুন" : "Book Free Trial Class"}</span>
              <ArrowRight className="w-4.5 h-4.5" />
            </button>
            <button
              onClick={() => setMentorModalOpen(true)}
              className="px-7 py-4 rounded-full bg-white/10 text-white font-bold text-sm hover:bg-white/20 border border-white/25 transition-all cursor-pointer"
            >
              {lang === "bn" ? "এইচএসসি মেন্টর আবেদন" : "Apply as HSC Mentor"}
            </button>
          </div>
        </div>
      </section>

      {/* Subject Cards */}
      <section className="py-20 md:py-24 max-w-[1240px] mx-auto px-6 md:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-mono font-bold uppercase text-[#00A896]">
            {lang === "bn" ? "সিলেবাস অনুযায়ী বিষয়সমূহ" : "HSC Subjects"}
          </span>
          <h2 className="font-sans text-3xl sm:text-4xl font-extrabold text-[#0D2C4A]">
            {lang === "bn" ? "এইচএসসির যেসব বিষয়ে ১-অন-১ ক্লাস নিতে পারবেন" : "Subjects Available for 1-on-1 Mentorship"}
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            {lang === "bn"
              ? "কলেজ পরীক্ষার প্রস্তুতি ও অ্যাডমিশনের ভিত শক্ত করতে আপনার পছন্দের মেন্টর বেছে নিন।"
              : "Strengthen college test prep and admission foundations with tailored 1-on-1 tutoring."}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {hscSubjects.map((sub, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl p-7 border border-slate-200/80 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 bg-[#00A896]/10 text-[#00A896] text-xs font-bold rounded-full font-mono">
                    {sub.tag}
                  </span>
                  <Award className="w-5 h-5 text-[#FFB627]" />
                </div>
                <h3 className="font-sans text-xl font-bold text-[#0D2C4A]">
                  {lang === "bn" ? sub.titleBn : sub.titleEn}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {lang === "bn" ? sub.descBn : sub.descEn}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-100 space-y-3">
                <div className="flex items-center gap-2 text-xs font-semibold text-[#00A896]">
                  <ShieldCheck className="w-4 h-4" />
                  <span>{lang === "bn" ? sub.tutorBn : sub.tutorEn}</span>
                </div>
                <button
                  onClick={() => setEnrollModalOpen(true)}
                  className="w-full py-2.5 rounded-full bg-[#0D2C4A] text-white text-xs font-bold hover:bg-[#00A896] transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <span>{lang === "bn" ? "মেন্টর বুক করুন" : "Book Mentor"}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Concept Mastery Strategy */}
      <section className="py-16 md:py-20 bg-[#0D2C4A] text-white">
        <div className="max-w-[1240px] mx-auto px-6 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <span className="text-xs font-mono font-bold uppercase text-[#FFB627]">
                {lang === "bn" ? "অ্যাডমিশন ও বোর্ড এক সাথে" : "Board & Admission Synergy"}
              </span>
              <h2 className="font-sans text-3xl sm:text-4xl font-extrabold leading-[1.35]">
                {lang === "bn"
                  ? "এইচএসসি সায়েন্সের বিশাল সিলেবাস শেষ করার স্মার্ট ১-অন-১ কৌশল"
                  : "Smart 1-on-1 Strategies to Master the Vast HSC Science Syllabus"}
              </h2>
              <p className="text-white/80 text-sm sm:text-base leading-relaxed">
                {lang === "bn"
                  ? "এইচএসসিতে সময় কম কিন্তু পড়া অনেক বেশি। বুয়েট ও মেডিকেল মেন্টরদের অভিজ্ঞ দিকনির্দেশনায় অপ্রয়োজনীয় মুখস্থ বাদ দিয়ে কনসেপ্ট ভিত্তিক পড়াশোনা করুন।"
                  : "Save hours of commuting. Focus directly on high-yield formulas, reaction mechanisms, and calculus problem-solving with top mentors."}
              </p>

              <div className="space-y-3 pt-2">
                {[
                  "জৈব রসায়নের সকল বিক্রিয়া মেকানিজম ধরে ধরে বোঝা",
                  "পদার্থবিজ্ঞান ও উচ্চতর গণিতের জটিল অংক শর্টকাট পদ্ধতিতে সমাধান",
                  "কলেজের উইকলি ও টার্ম পরীক্ষার বিশেষ প্রস্তুতি",
                  "বুয়েট, ঢাবি ও মেডিকেল ভর্তি পরীক্ষার কনসেপচুয়াল বেসিক গড়ে তোলা",
                ].map((point, i) => (
                  <div key={i} className="flex items-center gap-3 text-sm sm:text-base text-white/90">
                    <CheckCircle2 className="w-5 h-5 text-[#00A896] flex-shrink-0" />
                    <span>{point}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white/10 rounded-3xl p-8 border border-white/20 backdrop-blur-sm space-y-6">
              <h3 className="font-sans text-2xl font-bold text-white">
                {lang === "bn" ? "১ম ক্লাসটি সম্পূর্ণ ফ্রি উপভোগ করুন" : "Experience Your 1st Session Completely Free"}
              </h3>
              <p className="text-sm text-white/80 leading-relaxed">
                {lang === "bn"
                  ? "বুয়েট বা মেডিকেল শিক্ষকের সাথে আপনার কঠিনতম চ্যাপ্টারের ১টি সেশন নিয়ে দেখুন। কোনো কার্ড বা অগ্রিম পেমেন্টের প্রয়োজন নেই।"
                  : "Try a 1-on-1 session on your most challenging chapter. Zero commitment required."}
              </p>
              <button
                onClick={() => setEnrollModalOpen(true)}
                className="w-full py-4 rounded-full bg-[#00A896] text-white font-extrabold text-sm sm:text-base hover:bg-[#008075] transition-all shadow-lg cursor-pointer"
              >
                {lang === "bn" ? "এইচএসসি শিক্ষক খুঁজুন" : "Find HSC Mentor Now"}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Accordion */}
      <section className="py-20 md:py-24 max-w-3xl mx-auto px-6 md:px-8">
        <div className="text-center mb-12 space-y-3">
          <span className="text-xs font-mono font-bold uppercase text-[#00A896]">
            {lang === "bn" ? "সাধারণ জিজ্ঞাসা" : "Frequently Asked Questions"}
          </span>
          <h2 className="font-sans text-3xl font-extrabold text-[#0D2C4A]">
            {lang === "bn" ? "এইচএসসি অনলাইন টিউশন সম্পর্কে প্রশ্নোত্তর" : "HSC Tutoring FAQs"}
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm transition-all"
            >
              <button
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-[#0D2C4A] hover:text-[#00A896] transition-colors"
              >
                <span className="text-base">{faq.q}</span>
                <ChevronDown
                  className={`w-5 h-5 text-slate-400 transition-transform ${
                    openFaq === idx ? "rotate-180 text-[#00A896]" : ""
                  }`}
                />
              </button>
              {openFaq === idx && (
                <div className="px-5 pb-5 text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      <Footer />

      <EnrollModal
        isOpen={enrollModalOpen}
        onClose={() => setEnrollModalOpen(false)}
        initialPlan="Student Request"
        initialFee={0}
      />
      <MentorModal
        isOpen={mentorModalOpen}
        onClose={() => setMentorModalOpen(false)}
      />
    </main>
  );
}
