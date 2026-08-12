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
  Clock,
  HelpCircle,
  ChevronDown,
} from "lucide-react";

export default function SscClient() {
  const { lang } = useLanguage();
  const [enrollModalOpen, setEnrollModalOpen] = useState(false);
  const [mentorModalOpen, setMentorModalOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const sscSubjects = [
    {
      titleBn: "উচ্চতর গণিত ও সাধারণ গণিত",
      titleEn: "Higher Math & General Math",
      descBn: "বীজগণিত, ত্রিকোণমিতি, জ্যামিতি ও ক্যালকুলাসের প্রাথমিক অংক ধরে ধরে সমাধান ও শর্টকাট টেকনিক।",
      descEn: "Algebra, trigonometry, geometry, and calculus concepts explained step-by-step.",
      tutorBn: "বুয়েট ও কুয়েট ইঞ্জিনিয়ারিং মেন্টর",
      tutorEn: "BUET & KUET Engineering Mentors",
      tag: "Math Mastery",
    },
    {
      titleBn: "পদার্থবিজ্ঞান (Physics)",
      titleEn: "SSC Physics",
      descBn: "গতি, বল, কাজ-ক্ষমতা-শক্তি ও বিদ্যুতের জটিল গাণিতিক সমস্যার সহজ ব্যাখ্যা ও সৃজনশীল প্র্যাকটিস।",
      descEn: "Motion, force, work-energy, and electricity formulas with creative question practice.",
      tutorBn: "বুয়েট ও ঢাবি ফিজিক্স মেন্টর",
      tutorEn: "BUET & DU Physics Mentors",
      tag: "Science Core",
    },
    {
      titleBn: "রসায়ন (Chemistry)",
      titleEn: "SSC Chemistry",
      descBn: "রাসায়নিক সমীকরণ, পর্যায় সারণি ও মৌলের পর্যায়বৃত্ত ধর্মের সহজ নিয়ম ও বোর্ড প্রশ্ন সমাধান।",
      descEn: "Chemical reactions, periodic table, and bond equations made intuitive.",
      tutorBn: "মেডিকেল ও বুয়েট মেন্টর",
      tutorEn: "Medical & BUET Mentors",
      tag: "Science Core",
    },
    {
      titleBn: "জীববিজ্ঞান (Biology)",
      titleEn: "SSC Biology",
      descBn: "চিত্র আঁকার সহজ কৌশল, মানবদেহের অঙ্গসংস্থান ও জীবপ্রযুক্তির সৃজনশীল প্রশ্নের পূর্ণাঙ্গ প্রস্তুতি।",
      descEn: "Diagram mastery, human anatomy, and biotechnology board exam preparation.",
      tutorBn: "ডিএমসি ও সরকারি মেডিকেল মেন্টর",
      tutorEn: "DMC & Govt Medical Mentors",
      tag: "Biology Focus",
    },
    {
      titleBn: "ইংরেজি ১ম ও ২য় পত্র",
      titleEn: "English 1st & 2nd Paper",
      descBn: "গ্রামার রুলস মুখস্থ ছাড়া প্রয়োগ, রাইটিং পার্ট (প্যারাগ্রাফ, ইমেইল) এবং প্যাসেজ সমাধান।",
      descEn: "Grammar applications without rote memorization, essay/email writing skills.",
      tutorBn: "ঢাবি ও জবি ইংরেজি বিভাগ মেন্টর",
      tutorEn: "DU & JnU English Dept Mentors",
      tag: "Language Skills",
    },
    {
      titleBn: "আইসিটি ও কম্পিউটার",
      titleEn: "SSC ICT",
      descBn: "তথ্য ও যোগাযোগ প্রযুক্তির সকল অধ্যায়ের সহজ নোট ও সৃজনশীল প্রশ্ন উত্তর গাইডলাইন।",
      descEn: "Complete chapter coverage, notes, and creative question guides.",
      tutorBn: "সাস্ট ও সিএসই গ্র্যাজুয়েট",
      tutorEn: "SUST CSE Graduates",
      tag: "Digital Skills",
    },
  ];

  const faqs = [
    {
      q: "এসএসসি শিক্ষার্থীদের জন্য ১-অন-১ অনলাইন টিউশন কীভাবে সাহায্য করে?",
      a: "বড় কোচিংয়ের ভিড়ে শিক্ষার্থীরা তাদের নির্দিষ্ট গাণিতিক বা ধারণাগত দুর্বলতা বলতে পারে না। ব্যক্তিগত শিক্ষক প্রতিটি দুর্বল অধ্যায় চিহ্নিত করে ধরে ধরে সমাধান করান এবং টেস্ট পেপারের সৃজনশীল প্রশ্ন অনুশীলন করান।",
    },
    {
      q: "এসএসসি বিজ্ঞান, মানবিক ও ব্যবসায় শিক্ষা সব বিভাগের শিক্ষক পাওয়া যাবে?",
      a: "হ্যাঁ, এসএসসি বিজ্ঞান (পদার্থ, রসায়ন, গণিত, জীব), ব্যবসায় শিক্ষা (হিসাববিজ্ঞান, ফিন্যান্স) ও মানবিক বিভাগের জন্য শীর্ষ বিশ্ববিদ্যালয়ের যাচাইকৃত শিক্ষক রয়েছে।",
    },
    {
      q: "ক্লাসের সময়সূচি কীভাবে নির্ধারিত হয়?",
      a: "শিক্ষার্থী ও শিক্ষকের সুবিধাজনক সময়ে ক্লাস নির্ধারিত হয়। স্কুল বা অন্যান্য কাজের সময় এড়িয়ে সকাল, বিকেল বা রাতে ক্লাস নেওয়া যায়।",
    },
    {
      q: "প্রথম ট্রায়াল ক্লাস কি সত্যিই ফ্রি?",
      a: "হ্যাঁ! ফরম পূরণ করার পর প্রথম ১-অন-১ সেশনটি সম্পূর্ণ বিনামূল্যে উপভোগ করতে পারবেন। শিক্ষক ও পাঠদান পদ্ধতি পছন্দ হলে তবেই নিয়মিত ক্লাস শুরু করবেন।",
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
            <GraduationCap className="w-4 h-4 text-[#FFB627]" />
            <span>{lang === "bn" ? "এসএসসি বোর্ড পরীক্ষার ১-অন-১ প্রস্তুতি" : "SSC Board Exam 1-on-1 Prep"}</span>
          </div>

          <h1 className="font-sans text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-[1.3]">
            {lang === "bn"
              ? "এসএসসি অনলাইন টিউশন — অভিজ্ঞ ব্যক্তিগত শিক্ষক ও পূর্ণাঙ্গ বোর্ড প্রস্তুতি"
              : "SSC Online Tuition — Dedicated Personal Mentors for Board Success"}
          </h1>

          <p className="text-base sm:text-lg text-white/85 leading-relaxed">
            {lang === "bn"
              ? "৯ম ও ১০ম শ্রেণির শিক্ষার্থীদের জন্য বুয়েট, ঢাবি ও মেডিকেলের অভিজ্ঞ শিক্ষক। বড় ক্লাসের দ্বিধা নয় — প্রতিটি দুর্বলতায় একক মনোযোগ ও জিপিএ-৫ নিশ্চিত করার সেরা দিকনির্দেশনা।"
              : "Personalized online classes for Class 9 & 10 students with top university tutors. Overcome fear and master board exams."}
          </p>

          <div className="pt-4 flex flex-wrap justify-center gap-4">
            <button
              onClick={() => setEnrollModalOpen(true)}
              className="px-8 py-4 rounded-full bg-[#FFB627] text-[#0D2C4A] font-extrabold text-sm sm:text-base hover:bg-[#F59E0B] shadow-xl hover:-translate-y-0.5 transition-all cursor-pointer flex items-center gap-2"
            >
              <span>{lang === "bn" ? "ফ্রি ট্রায়াল ক্লাস বুক করুন" : "Book Free Trial Class"}</span>
              <ArrowRight className="w-4.5 h-4.5" />
            </button>
            <button
              onClick={() => setMentorModalOpen(true)}
              className="px-7 py-4 rounded-full bg-white/10 text-white font-bold text-sm hover:bg-white/20 border border-white/25 transition-all cursor-pointer"
            >
              {lang === "bn" ? "এসএসসি শিক্ষক হিসেবে আবেদন" : "Apply as SSC Tutor"}
            </button>
          </div>
        </div>
      </section>

      {/* Subject Breakdown */}
      <section className="py-20 md:py-24 max-w-[1240px] mx-auto px-6 md:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-mono font-bold uppercase text-[#00A896]">
            {lang === "bn" ? "বিষয়ভিত্তিক প্রস্তুতি" : "Subject Modules"}
          </span>
          <h2 className="font-sans text-3xl sm:text-4xl font-extrabold text-[#0D2C4A]">
            {lang === "bn" ? "এসএসসির যেসব বিষয়ে ব্যক্তিগত শিক্ষক পাবেন" : "SSC Subjects Available for 1-on-1 Tutoring"}
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            {lang === "bn"
              ? "প্রতিটি বিষয়ে আপনার প্রয়োজন অনুযায়ী বুয়েট, ঢাবি বা মেডিকেল মেন্টর বেছে নিন।"
              : "Choose expert mentors tailored to your syllabus and target grade."}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sscSubjects.map((sub, idx) => (
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
                  <span>{lang === "bn" ? "শিক্ষক সিলেক্ট করুন" : "Select Mentor"}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SSC Preparation Strategy Features */}
      <section className="py-16 md:py-20 bg-[#0D2C4A] text-white">
        <div className="max-w-[1240px] mx-auto px-6 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <span className="text-xs font-mono font-bold uppercase text-[#FFB627]">
                {lang === "bn" ? "পরীক্ষা প্রস্তুতি মেথডোলজি" : "Prep Methodology"}
              </span>
              <h2 className="font-sans text-3xl sm:text-4xl font-extrabold leading-[1.35]">
                {lang === "bn"
                  ? "কোচিংয়ের বড় ব্যাচ নয়: কেন এসএসসি শিক্ষার্থীদের ১-অন-১ শিক্ষক প্রয়োজন?"
                  : "Why SSC Students Excel with Dedicated 1-on-1 Mentors"}
              </h2>
              <p className="text-white/80 text-sm sm:text-base leading-relaxed">
                {lang === "bn"
                  ? "বোর্ড পরীক্ষায় ভালো করতে হলে শুধু বই পড়া যথেষ্ট নয় — প্রয়োজন টেস্ট পেপারের সৃজনশীল প্রশ্নের সঠিক ফরম্যাটে উত্তর লেখা ও নিয়মিত ভুল শুধরে নেওয়া।"
                  : "Board exam excellence requires personalized error correction, timed mock tests, and creative question-solving mastery."}
              </p>

              <div className="space-y-3 pt-2">
                {[
                  "দুর্বল অধ্যায় চিহ্নিত করে স্টেপ-বাই-স্টেপ সমাধান",
                  "বিগত ১০ বছরের বোর্ড প্রশ্ন ও শীর্ষ স্কুলের টেস্ট পেপার সলভ",
                  "সৃজনশীল ক, খ, গ, ঘ অংশের নম্বর পাওয়ার আদর্শ লেখার কৌশল",
                  "নৈর্ব্যক্তিক (MCQ) পরীক্ষায় ২০ মিনিটে নির্ভুল উত্তর দাগানোর টেকনিক",
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
                {lang === "bn" ? "আজই শুরু করুন প্রথম ফ্রি ট্রায়াল ক্লাস" : "Start with a Free First Trial Session"}
              </h3>
              <p className="text-sm text-white/80 leading-relaxed">
                {lang === "bn"
                  ? "আপনার সন্তানকে একজন বুয়েট, ঢাবি বা মেডিকেল শিক্ষকের সাথে সরাসরি পড়ার সুযোগ দিন। কোনো অগ্রিম ফি নেই।"
                  : "Give your child direct access to top university mentors. No advance fee required."}
              </p>
              <button
                onClick={() => setEnrollModalOpen(true)}
                className="w-full py-4 rounded-full bg-[#00A896] text-white font-extrabold text-sm sm:text-base hover:bg-[#008075] transition-all shadow-lg cursor-pointer"
              >
                {lang === "bn" ? "এসএসসি শিক্ষক রিকোয়েস্ট করুন" : "Request SSC Tutor Now"}
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
            {lang === "bn" ? "এসএসসি অনলাইন টিউশন সম্পর্কে প্রশ্নোত্তর" : "SSC Tutoring FAQs"}
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
